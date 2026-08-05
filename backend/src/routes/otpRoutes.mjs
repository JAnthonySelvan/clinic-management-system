import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otpController.mjs";
import { otpLimiter } from "../middleware/rateLimitMiddleware.mjs";
import validate from "../middleware/validationMiddleware.mjs";
import { sendOtpValidation, verifyOtpValidation } from "../validators/otpValidator.mjs";

const router = express.Router();

router.post("/send", otpLimiter, sendOtpValidation, validate, sendOtp);
router.post("/verify", otpLimiter, verifyOtpValidation, validate, verifyOtp);

export default router;
