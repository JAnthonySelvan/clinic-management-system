import express from "express";
import {
  login,
  logout,
  getMe,
  changePassword,
  updateProfile,
} from "../controllers/authController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";
import upload from "../middleware/uploadMiddleware.mjs"; // memory storage, from step 2

const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.post("/change-password", protect, changePassword);

// Cloudinary upload replaces the old disk-storage multer instance
router.patch("/profile", protect, upload.single("profileImage"), updateProfile);

export default router;
