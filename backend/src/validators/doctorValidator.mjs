import { body } from "express-validator";

export const createDoctorValidation = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phone").notEmpty().withMessage("Phone number is required"),

  body("specialization").notEmpty().withMessage("Specialization is required"),

  body("qualification").notEmpty().withMessage("Qualification is required"),

  body("experience")
    .isInt({ min: 0 })
    .withMessage("Experience must be a positive number"),
];
