import  User  from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../Utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../Utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../MailTrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateVerificationCode();

    const user = new User({
      email,
      password : hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email , verificationToken);

    res.status(201).json({
      success:true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};
