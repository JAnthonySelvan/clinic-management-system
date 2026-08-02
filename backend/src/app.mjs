import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.mjs";
import doctorRoutes from "./routes/doctorRoutes.mjs";
import appointmentRoutes from "./routes/appointmentRoutes.mjs";
import contactRoutes from "./routes/contactRoutes.mjs";
import dashboardRoutes from "./routes/dashboardRoutes.mjs";
import scheduleRoutes from "./routes/scheduleRoutes.mjs";
import serviceRoutes from "./routes/serviceRoutes.mjs";
import assistantRoutes from "./routes/assistantRoutes.mjs";


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Clinic Management API is running...",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/assistant", assistantRoutes);

export default app;
