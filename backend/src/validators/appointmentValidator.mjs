import { body } from "express-validator";

export const createAppointmentValidation = [
  body("patientName").trim().notEmpty().withMessage("Patient name is required"),

  body("patientEmail")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("patientPhone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("doctor")
    .notEmpty()
    .withMessage("Doctor is required")
    .isMongoId()
    .withMessage("Invalid doctor id"),

  body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Invalid appointment date"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 10 })
    .withMessage("Reason must be at least 10 characters"),
];
