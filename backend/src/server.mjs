import dotenv from "dotenv";
import app from "./app.mjs";
import connectDB from "./config/db.mjs";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Connect Database
connectDB();


// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);

  server.close(() => {
    process.exit(1);
  });
});

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);

  process.exit(1);
});