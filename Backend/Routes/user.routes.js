import express from "express";
import {loginUser, registerUser , verification} from "../Controllers/user.controller.js"

const router = express.Router();

router.post("/register" , registerUser);
router.post("/verify" , verification)
router.post("/login" , loginUser)

export default router;