import jwt from "jsonwebtoken";

/**
 * Middleware to require a valid, verified OTP JWT token (otpToken)
 * Attaches req.verifiedEmail on success.
 */
export const requireOtpVerified = (req, res, next) => {
  try {
    let token = req.headers["x-otp-token"] || req.body?.otpToken;

    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "OTP verification required. Please verify your email first.",
      });
    }

    const secret = process.env.JWT_SECRET || "fallback_jwt_secret";
    const decoded = jwt.verify(token, secret);

    if (!decoded || decoded.purpose !== "booking" || !decoded.email) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP session.",
      });
    }

    req.verifiedEmail = decoded.email.toLowerCase().trim();
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "OTP session expired or invalid. Please verify again.",
      error: error.message,
    });
  }
};

/**
 * Optional OTP middleware — attaches req.verifiedEmail if a valid token is provided,
 * but does not reject request if no token is present.
 */
export const optionalOtpAuth = (req, res, next) => {
  try {
    let token = req.headers["x-otp-token"] || req.body?.otpToken;

    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (token) {
      const secret = process.env.JWT_SECRET || "fallback_jwt_secret";
      const decoded = jwt.verify(token, secret);
      if (decoded && decoded.purpose === "booking" && decoded.email) {
        req.verifiedEmail = decoded.email.toLowerCase().trim();
      }
    }
  } catch (error) {
    // Silently continue for optional auth
  }
  next();
};

