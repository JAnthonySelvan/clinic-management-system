import mongoose from "mongoose";

const keyTreatmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "stethoscope" },
  },
  { _id: false },
);

const diagnosticPricingSchema = new mongoose.Schema(
  {
    testName: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, default: "30-45 mins" },
  },
  { _id: false },
);

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    heroImage: { type: String, required: true },
    overviewImage: { type: String },
    galleryImages: [{ type: String }],
    keyTreatments: [keyTreatmentSchema],
    diagnosticPricing: [diagnosticPricingSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
