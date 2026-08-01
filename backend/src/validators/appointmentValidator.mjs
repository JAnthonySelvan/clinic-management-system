import { body, query } from "express-validator";

export const trackAppointmentValidation = [
  query("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("Phone number must be between 5 and 20 characters"),
];

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

  body("specialization")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Specialization is required"),

  body("doctor")
    .optional()
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
    .isLength({ min: 0, max: 500 })
    .withMessage("Reason must be between 10 and 500 characters"),
];
