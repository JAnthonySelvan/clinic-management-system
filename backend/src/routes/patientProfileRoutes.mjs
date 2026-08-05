import express from "express";
import {
  getFamilyProfiles,
  upsertPatientProfile,
  getPatientAppointmentHistory,
} from "../controllers/patientProfileController.mjs";
import { requireOtpVerified } from "../middleware/otpAuthMiddleware.mjs";
import validate from "../middleware/validationMiddleware.mjs";
import { upsertProfileValidation } from "../validators/patientProfileValidator.mjs";

const router = express.Router();

router.get("/family", requireOtpVerified, getFamilyProfiles);
router.post("/", requireOtpVerified, upsertProfileValidation, validate, upsertPatientProfile);
router.get("/history", requireOtpVerified, getPatientAppointmentHistory);

export default router;
