import mongoose from "mongoose";

const dayAvailabilitySchema = new mongoose.Schema(
  {
    isAvailable: {
      type: Boolean,
      default: true,
    },
    startTime: {
      type: String,
      default: "09:00",
    },
    endTime: {
      type: String,
      default: "18:00",
    },
  },
  { _id: false },
);

const scheduleSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    weeklyAvailability: {
      Monday: {
        type: dayAvailabilitySchema,
        default: () => ({ isAvailable: true, startTime: "09:00", endTime: "18:00" }),
      },
      Tuesday: {
        type: dayAvailabilitySchema,
        default: () => ({ isAvailable: true, startTime: "09:00", endTime: "18:00" }),
      },
      Wednesday: {
        type: dayAvailabilitySchema,
        default: () => ({ isAvailable: true, startTime: "09:00", endTime: "18:00" }),
      },
      Thursday: {
        type: dayAvailabilitySchema,
        default: () => ({ isAvailable: true, startTime: "09:00", endTime: "18:00" }),
      },
      Friday: {
        type: dayAvailabilitySchema,
        default: () => ({ isAvailable: true, startTime: "09:00", endTime: "18:00" }),
      },
      Saturday: {
        type: dayAvailabilitySchema,
        default: () => ({ isAvailable: true, startTime: "09:00", endTime: "18:00" }),
      },
      Sunday: {
        type: dayAvailabilitySchema,
        default: () => ({ isAvailable: false, startTime: "09:00", endTime: "18:00" }),
      },
    },

    blockedDates: [
      {
        date: {
          type: Date,
          required: true,
        },
        reason: {
          type: String,
          default: "Leave / Holiday",
          trim: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
