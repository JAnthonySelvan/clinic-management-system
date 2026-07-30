import express from "express";
import {
  createDoctor,
  getAllDoctors,
  getPublicDoctors,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.mjs";
import validate from "../middleware/validationMiddleware.mjs";
import upload from "../middleware/uploadMiddleware.mjs";

import { protect, authorize } from "../middleware/authMiddleware.mjs";

import { createDoctorValidation } from "../validators/doctorValidator.mjs";

const router = express.Router();

// Public — anyone can view active doctors (website, appointment booking).
// Must be declared BEFORE router.use(protect) below, otherwise it
// inherits the auth requirement.
router.get("/public", getPublicDoctors);

// Everything from this point on requires an authenticated admin
router.use(protect);
router.use(authorize("admin"));

// Create Doctor (with optional profile image)
router.post(
  "/",
  upload.single("profileImage"),
  createDoctorValidation,
  validate,
  createDoctor,
);

// Get All Doctors (admin dashboard — includes inactive doctors)
router.get("/", getAllDoctors);

// Update Doctor (with optional profile image)
router.put("/:id", upload.single("profileImage"), updateDoctor);

// Delete Doctor
router.delete("/:id", deleteDoctor);

export default router;
