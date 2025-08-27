import express from "express";
import { login, logout, signup , verifyEmail , forgotPassword , resetPassword, checkAuth} from "../Controllers/auth.controller.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

router.get("/check-auth" , verifyAuth , checkAuth);

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" , logout);

router.post("/verify_email" , verifyEmail);
router.post("/forgot_password" , forgotPassword);
router.post("/reset-password/:token" , resetPassword);


export default router;