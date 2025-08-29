import express from "express";
import {registerUser , verification} from "../Controllers/user.controller.js"

const router = express.Router();

router.post("/register" , registerUser);
router.post("/verify" , verification)

export default router;