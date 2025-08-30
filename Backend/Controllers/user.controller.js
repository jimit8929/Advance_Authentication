import { verifyMail } from "../emailVerify/verifyMail.js";
import Session from "../Models/sessionModel.js";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    verifyMail(token, email);

    newUser.token = token;
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verification = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "The registration token has expired",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    (user.token = null), (user.isVerified = true), await user.save();

    return res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized access" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res
        .status(402)
        .json({ success: false, message: "Incorrect Password" });
    }

    //check if user is verified or not
    if (user.isVerified !== true) {
      return res
        .status(403)
        .json({ success: false, message: "Verify your account then login" });
    }

    //check for existing seession and delete it
    const existingSession = await Session.findOne({ userId: user._id });

    if (existingSession) {
      await Session.deleteOne({ userId: user._id });
    }

    //create a new session
    await Session.create({ userId: user._id });

    //generate tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.isLoggedIn = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
