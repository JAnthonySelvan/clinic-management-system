import mongoose from "mongoose";

const chatLogSchema = new mongoose.Schema(
  {
    userMessage: {
      type: String,
      required: true,
      trim: true,
    },
    isEmergency: {
      type: Boolean,
      default: false,
    },
    recommendedSpecialty: {
      type: String,
      default: null,
    },
    urgencyLevel: {
      type: String,
      enum: ["emergency", "urgent", "soon", "routine", "unknown"],
      default: "routine",
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const ChatLog = mongoose.model("ChatLog", chatLogSchema);

export default ChatLog;
