import OtpVerification from "../models/OtpVerification.mjs";
import { sendOtpEmail } from "../config/brevo.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * @desc    Generate and send 6-digit OTP to patient email
 * @route   POST /api/otp/send
 * @access  Public
 */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Generate code, hash, and store in database
    const otpCode = await OtpVerification.generateAndStore(normalizedEmail);

    // Attempt to send email via Brevo
    try {
      await sendOtpEmail(normalizedEmail, otpCode);
    } catch (emailError) {
      console.warn("OTP Email dispatch note:", emailError.message);
      // In dev mode without API key, sendOtpEmail logs code to console.
      // We continue successfully so developers can test without live Brevo key.
    }

    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (error) {
    console.error("sendOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send verification code. Please try again.",
      error: error.message,
    });
  }
};

/**
 * @desc    Verify OTP code and issue a short-lived 15-min otpToken
 * @route   POST /api/otp/verify
 * @access  Public
 */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP code are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find latest unverified OTP record
    const otpDoc = await OtpVerification.findOne({
      email: normalizedEmail,
      verified: false,
    }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: "No pending OTP verification found. Please request a new code.",
      });
    }

    // Check expiration (5 mins)
    if (new Date() > new Date(otpDoc.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new code.",
      });
    }

    // Check attempt limit
    if (otpDoc.attempts >= 5) {
      return res.status(400).json({
        success: false,
        message: "Too many failed attempts. Please request a new verification code.",
      });
    }

    // Verify bcrypt hash
    const isMatch = await bcrypt.compare(otp.toString().trim(), otpDoc.otpHash);

    if (!isMatch) {
      otpDoc.attempts += 1;
      await otpDoc.save();

      const remaining = 5 - otpDoc.attempts;
      return res.status(400).json({
        success: false,
        message: remaining > 0 
          ? `Invalid verification code. ${remaining} attempt(s) remaining.` 
          : "Too many failed attempts. Please request a new code.",
      });
    }

    // Mark as verified
    otpDoc.verified = true;
    await otpDoc.save();

    // Issue short-lived 15-minute JWT
    const secret = process.env.JWT_SECRET || "fallback_jwt_secret";
    const otpToken = jwt.sign(
      { email: normalizedEmail, purpose: "booking" },
      secret,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      data: {
        otpToken,
        email: normalizedEmail,
      },
    });
  } catch (error) {
    console.error("verifyOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify code. Please try again.",
      error: error.message,
    });
  }
};
