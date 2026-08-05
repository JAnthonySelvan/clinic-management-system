import { body } from "express-validator";

export const upsertProfileValidation = [
  body("relationship")
    .optional()
    .isIn(["self", "father", "mother", "wife", "child"])
    .withMessage("Invalid relationship type"),

  body("childLabel")
    .optional({ checkFalsy: true })
    .trim(),

  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 0, max: 120 })
    .withMessage("Age must be a number between 0 and 120"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender choice"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("Phone number must be between 5 and 20 characters"),

  body("bloodGroup").optional({ checkFalsy: true }).trim(),
  body("dob").optional({ checkFalsy: true }).isISO8601().withMessage("Invalid date of birth"),
  body("address").optional({ checkFalsy: true }).trim(),
  body("city").optional({ checkFalsy: true }).trim(),
  body("state").optional({ checkFalsy: true }).trim(),
  body("pincode").optional({ checkFalsy: true }).trim(),
];
