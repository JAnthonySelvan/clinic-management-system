import express from "express";
import { login, logout, getMe } from "../controllers/authController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Public Route
router.post("/login", login);

// Protected Routes
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
