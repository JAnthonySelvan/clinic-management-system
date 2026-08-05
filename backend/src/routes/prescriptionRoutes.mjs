import express from "express";
import {
  createOrUpdatePrescription,
  getPrescriptionByAppointment,
  getPrescriptionPdf,
} from "../controllers/prescriptionController.mjs";
import { protect, authorize } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Doctor / Admin issue digital prescription
router.post("/", protect, authorize("doctor", "admin"), createOrUpdatePrescription);

// Get prescription details for an appointment
router.get("/appointment/:appointmentId", getPrescriptionByAppointment);

// Direct PDF viewer redirect
router.get("/:id/pdf", getPrescriptionPdf);

export default router;
