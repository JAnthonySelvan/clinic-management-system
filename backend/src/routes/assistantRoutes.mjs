import express from "express";
import rateLimit from "express-rate-limit";
import { chatWithAssistant } from "../controllers/assistantController.mjs";

const router = express.Router();

// 20 messages per hour per IP — this is a paid API call and a public,
// unauthenticated route, so it needs a ceiling.
const assistantLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages sent. Please try again later.",
  },
});

router.post("/chat", assistantLimiter, chatWithAssistant);

export default router;
