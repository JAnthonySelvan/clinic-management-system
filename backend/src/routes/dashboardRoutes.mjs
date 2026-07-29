import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.mjs";
import { protect, authorize } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/stats", protect, authorize("admin"), getDashboardStats);

export default router;
