import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dosage: {
      type: String,
      default: "",
      trim: true,
    },
    frequency: {
      type: String,
      default: "",
      trim: true,
    },
    duration: {
      type: String,
      default: "",
      trim: true,
    },
    instructions: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false },
);

const prescriptionSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },

    patientProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientProfile",
      required: false,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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
      default: "",
      trim: true,
    },

    patientAge: {
      type: Number,
      required: false,
    },

    gender: {
      type: String,
      default: "Other",
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    medicines: [medicineSchema],

    medicalAdvice: {
      type: String,
      default: "",
      trim: true,
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    additionalNotes: {
      type: String,
      default: "",
      trim: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
