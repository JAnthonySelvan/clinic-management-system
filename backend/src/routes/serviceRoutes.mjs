import express from "express";
import {
  getAllServices,
  getServiceBySlug,
} from "../controllers/serviceController.mjs";

const router = express.Router();

// Public routes for clinic services
router.get("/", getAllServices);
router.get("/:slug", getServiceBySlug);

export default router;
