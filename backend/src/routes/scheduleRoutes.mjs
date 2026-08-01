import express from "express";
import {
  getMySchedule,
  updateWeeklyAvailability,
  addBlockedDate,
  removeBlockedDate,
  getDoctorAvailability,
  getAdminLeaves,
  updateLeaveStatus,
} from "../controllers/scheduleController.mjs";
import { protect, authorize } from "../middleware/authMiddleware.mjs";
import validate from "../middleware/validationMiddleware.mjs";
import {
  weeklyAvailabilityValidation,
  blockedDateValidation,
} from "../validators/scheduleValidator.mjs";

const router = express.Router();

// Public route for booking flow
router.get("/doctor/:doctorId", getDoctorAvailability);

// Admin protected routes
router.get("/admin/leaves", protect, authorize("admin"), getAdminLeaves);
router.patch(
  "/admin/leaves/:scheduleId/:dateId",
  protect,
  authorize("admin"),
  updateLeaveStatus,
);

// Doctor protected routes
router.get("/my-schedule", protect, authorize("doctor"), getMySchedule);
router.patch(
  "/weekly-availability",
  protect,
  authorize("doctor"),
  weeklyAvailabilityValidation,
  validate,
  updateWeeklyAvailability,
);
router.post(
  "/blocked-dates",
  protect,
  authorize("doctor"),
  blockedDateValidation,
  validate,
  addBlockedDate,
);
router.delete(
  "/blocked-dates/:dateId",
  protect,
  authorize("doctor"),
  removeBlockedDate,
);

export default router;
