import User from "../models/User.mjs";
import generateToken from "../utils/generateToken.mjs";
import {
  uploadImageBuffer,
  DEFAULT_PROFILE_IMAGE,
} from "../utils/uploadToCloudinary.mjs";

// @desc Login (Admin / Doctor)
// @route POST /api/auth/login
// @access Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Set Cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Logout
// @route POST /api/auth/logout
// @access Private
export const logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// @desc Get Logged In User
// @route GET /api/auth/me
// @access Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Change Password (currently logged-in user)
// @route POST /api/auth/change-password
// @access Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Assigning triggers the pre-save hashing hook on the User model
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @route PATCH /api/auth/profile
// @access Private

// @desc Update logged-in user's profile (fullName, phone, specialization, etc.)
// @route PATCH /api/auth/profile
// @access Private
export const updateProfile = async (req, res) => {
  try {
    // Whitelist updatable fields — email/password/role must NOT be
    // editable through this route.
    const allowedFields = [
      "fullName",
      "phone",
      "specialization",
      "qualification",
      "experience",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Only touch profileImage if a new file was actually uploaded.
    // If Cloudinary upload fails, leave the field out entirely so the
    // user's existing image (or the schema default) is left untouched.
    if (req.file) {
      try {
        updates.profileImage = await uploadImageBuffer(
          req.file.buffer,
          "doctors",
        );
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr.message);
        // Don't fail the whole profile update just because the image
        // upload failed — fall back to the static default only if the
        // user currently has no image at all.
        const existingUser = await User.findById(req.user.id);
        if (!existingUser?.profileImage) {
          updates.profileImage = DEFAULT_PROFILE_IMAGE;
        }
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};