import express from "express";
import {changePassword, forgotPassword, loginUser, logoutUser, registerUser , verification, verifyOTP} from "../Controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register" , registerUser);
router.post("/verify" , verification)
router.post("/login" , loginUser)
router.post("/logout" , isAuthenticated , logoutUser)
router.post("/forgot-password" , forgotPassword);
router.post("/verify-otp/:email" , verifyOTP);
router.post("/change-password/:email" , changePassword)

export default router;