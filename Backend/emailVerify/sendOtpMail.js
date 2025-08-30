import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: ` <body style="font-family: Arial, sans-serif; background-color:#f4f4f4; margin:0; padding:0;">
    <div style="max-width:600px; margin:20px auto; background:#ffffff; padding:20px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      
      <h2 style="color:#333; text-align:center;">Password Reset OTP</h2>
      
      <p style="font-size:16px; color:#555;">
        Hello,
      </p>
      <p style="font-size:16px; color:#555;">
        You requested to reset your password. Please use the following One-Time Password (OTP) to proceed:
      </p>
      
      <div style="text-align:center; margin:20px 0;">
        <span style="display:inline-block; font-size:24px; font-weight:bold; color:#ffffff; background:#007bff; padding:12px 24px; border-radius:6px; letter-spacing:3px;">
          ${otp}
        </span>
      </div>
      
      <p style="font-size:14px; color:#777;">
        ⚠️ This OTP is valid for <b>10 minutes</b> only. Please do not share it with anyone.
      </p>
      
      <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
      
      <p style="font-size:12px; color:#aaa; text-align:center;">
        If you did not request this, you can safely ignore this email.
      </p>
    </div>
  </body>`,
  };

  await transporter.sendMail(mailOptions);
};
