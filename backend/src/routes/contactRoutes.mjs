import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contactController.mjs";

import { protect, authorize } from "../middleware/authMiddleware.mjs";
import validate from "../middleware/validationMiddleware.mjs";
import { createContactValidation } from "../validators/contactValidator.mjs";

const router = express.Router();

// Public
router.post("/", createContactValidation, validate, createContact);

// Admin
router.get("/", protect, authorize("admin"), getAllContacts);

// Admin
router.delete("/:id", protect, authorize("admin"), deleteContact);

export default router;
