import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointmentController.mjs";

import { protect, authorize } from "../middleware/authMiddleware.mjs";
import validate from "../middleware/validationMiddleware.mjs";
import { createAppointmentValidation } from "../validators/appointmentValidator.mjs";

const router = express.Router();

// Public
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
