import express from "express";
import {
  bookAppointment,
  getBookedSlots,
  trackAppointment,
  getAllAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointmentController.mjs";

import { protect, authorize } from "../middleware/authMiddleware.mjs";
import validate from "../middleware/validationMiddleware.mjs";
import { trackLimiter } from "../middleware/rateLimitMiddleware.mjs";
import {
  createAppointmentValidation,
  trackAppointmentValidation,
} from "../validators/appointmentValidator.mjs";

const router = express.Router();

// Public
router.get("/track", trackLimiter, trackAppointmentValidation, validate, trackAppointment);
router.get("/booked-slots", getBookedSlots);
router.post("/", createAppointmentValidation, validate, bookAppointment);


// Admin
router.get("/", protect, authorize("admin"), getAllAppointments);

// Doctor
router.get("/doctor", protect, authorize("doctor"), getDoctorAppointments);

// Doctor
router.patch(
  "/:id/status",
  protect,
  authorize("doctor"),
  updateAppointmentStatus,
);

// Admin
router.delete("/:id", protect, authorize("admin"), deleteAppointment);

export default router;
