import mongoose from "mongoose";
import bcrypt from "bcrypt";

const otpVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Mongo TTL index: Automatically remove expired OTP documents
otpVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpVerificationSchema.index({ email: 1 });

/**
 * Invalidates prior unverified OTPs for email, generates a 6-digit code,
 * hashes it, stores it, and returns the plaintext OTP code.
 */
otpVerificationSchema.statics.generateAndStore = async function (email) {
  const normalizedEmail = email.toLowerCase().trim();

  // Invalidate previous unverified OTPs for this email
  await this.deleteMany({ email: normalizedEmail, verified: false });

  // Generate 6-digit OTP code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash code using bcrypt
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(code, salt);

  // Set 5 minute expiration
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await this.create({
    email: normalizedEmail,
    otpHash,
    expiresAt,
    verified: false,
    attempts: 0,
  });

  return code;
};

const OtpVerification = mongoose.model("OtpVerification", otpVerificationSchema);

export default OtpVerification;
