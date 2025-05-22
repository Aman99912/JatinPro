import express from "express";
import { finalizeRegister, GetUserByEmail, loginUser, logoutUser,  sendOtp, verifyOtp } from "../controller/user.controller.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", finalizeRegister);


// ✅ Routes that need authentication
router.get('/email', GetUserByEmail);






export default router;
