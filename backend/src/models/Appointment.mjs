import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    patientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    patientPhone: {
      type: String,
      required: true,
      trim: true,
    },

    patientAge: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    patientProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientProfile",
      required: false,
    },

    appointmentDate: {
      type: String,
      trim: true,
      required: false,
    },

    appointmentTime: {
      type: String,
      trim: true,
      required: false,
    },

    appointmentDateTime: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },

    rejectionReason: {
      type: String,
      trim: true,
      default: null,
    },

    rejectedBy: {
      type: String,
      enum: ["doctor", "admin", "system-leave", "system-auto"],
      default: null,
    },

    rejectedByDoctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
