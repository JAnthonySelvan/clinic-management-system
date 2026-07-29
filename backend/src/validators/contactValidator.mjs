import { body } from "express-validator";

export const createContactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone").optional().trim(),

  body("subject").trim().notEmpty().withMessage("Subject is required"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters"),
];
