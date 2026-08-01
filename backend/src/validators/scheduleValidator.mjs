import { body } from "express-validator";

export const weeklyAvailabilityValidation = [
  body("weeklyAvailability")
    .isObject()
    .withMessage("weeklyAvailability must be an object"),
];

export const blockedDateValidation = [
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ max: 200 })
    .withMessage("Reason cannot exceed 200 characters"),
];
