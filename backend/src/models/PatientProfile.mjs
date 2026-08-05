import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    relationship: {
      type: String,
      required: true,
      enum: ["self", "father", "mother", "wife", "child"],
    },
    childLabel: {
      type: String,
      trim: true,
      default: null,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      trim: true,
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      trim: true,
      default: null,
    },
    city: {
      type: String,
      trim: true,
      default: null,
    },
    state: {
      type: String,
      trim: true,
      default: null,
    },
    pincode: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

patientProfileSchema.index(
  { email: 1, relationship: 1, childLabel: 1 },
  { unique: false }
);

/**
 * Helper to get family profiles grouped by relationship for a given email
 */
patientProfileSchema.statics.findFamilyByEmail = async function (email) {
  const normalizedEmail = email.toLowerCase().trim();
  const profiles = await this.find({ email: normalizedEmail }).sort({ createdAt: 1 });

  const grouped = {
    self: null,
    father: null,
    mother: null,
    wife: null,
    children: [],
  };

  profiles.forEach((profile) => {
    if (profile.relationship === "child") {
      grouped.children.push(profile);
    } else {
      grouped[profile.relationship] = profile;
    }
  });

  return grouped;
};

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);

export default PatientProfile;
