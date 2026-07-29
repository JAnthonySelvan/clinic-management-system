import express from "express";
import {
  createDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.mjs";
import validate from "../middleware/validationMiddleware.mjs";

import { protect, authorize } from "../middleware/authMiddleware.mjs";

import { createDoctorValidation } from "../validators/doctorValidator.mjs";

const router = express.Router();

// All doctor routes are accessible only by Admin
router.use(protect);
router.use(authorize("admin"));

// Create Doctor
router.post("/", createDoctorValidation, validate, createDoctor);

// Get All Doctors
router.get("/", getAllDoctors);

// Update Doctor
router.put("/:id", updateDoctor);

// Delete Doctor
router.delete("/:id", deleteDoctor);

export default router;
