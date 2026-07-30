import express from "express";
import {
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
} from "../controllers/authController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";
import upload from "../middleware/uploadMiddleware.mjs";

const router = express.Router();

// Public Route
router.post("/login", login);

// Protected Routes
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.patch("/profile", protect, upload.single("profileImage"), updateProfile);
router.post("/change-password", protect, changePassword);

export default router;
