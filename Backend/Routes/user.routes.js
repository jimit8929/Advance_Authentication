import express from "express";
import {forgotPassword, loginUser, logoutUser, registerUser , verification} from "../Controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register" , registerUser);
router.post("/verify" , verification)
router.post("/login" , loginUser)
router.post("/logout" , isAuthenticated , logoutUser)
router.post("/forgot-password" , forgotPassword);

export default router;