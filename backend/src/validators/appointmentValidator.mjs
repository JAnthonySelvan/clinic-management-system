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

  body("patientAge")
    .notEmpty()
    .withMessage("Patient age is required")
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be between 0 and 120"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),

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

  body("appointmentTime")
    .notEmpty()
    .withMessage("Appointment time is required"),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Reason must be between 10 and 500 characters"),
];
