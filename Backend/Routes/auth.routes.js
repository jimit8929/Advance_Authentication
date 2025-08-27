import express from "express";
import { login, logout, signup , verifyEmail} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" , logout);

router.post("/verify_email" , verifyEmail);

export default router;