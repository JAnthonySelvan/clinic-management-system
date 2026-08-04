import dotenv from "dotenv";
dotenv.config();

import app from "./app.mjs";
import connectDB from "./config/db.mjs";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT} (Environment: ${process.env.NODE_ENV || "development"})`);
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

// Handle Graceful Shutdown Signals (Docker / Kubernetes / Render / Railway)
const shutdownGracefully = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down server gracefully...`);
  server.close(() => {
    console.log("Http server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdownGracefully("SIGTERM"));
process.on("SIGINT", () => shutdownGracefully("SIGINT"));