import express from "express";
import rateLimit from "express-rate-limit";
import { handleChatAssistant } from "../controllers/assistantController.mjs";

const router = express.Router();

// Public rate limiter: 20 queries per hour per IP to prevent API abuse
const assistantLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: {
    success: false,
    message: "Rate limit exceeded (maximum 20 health queries per hour). Please call our clinic directly for immediate assistance.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/chat", assistantLimiter, handleChatAssistant);

export default router;
