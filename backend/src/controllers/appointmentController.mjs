import mongoose from "mongoose";
import Appointment from "../models/Appointment.mjs";
import User from "../models/User.mjs";
import Schedule from "../models/Schedule.mjs";
import { validationResult } from "express-validator";

const getSpecializationRegex = (spec) => {
  if (!spec) return /.*/i;
  const s = spec.toLowerCase().trim();
  if (s.includes("cardio")) return /cardio/i;
  if (s.includes("neuro")) return /neuro/i;
  if (s.includes("derma") || s.includes("skin")) return /derma|skin/i;
  if (s.includes("pedia") || s.includes("child")) return /pedia|child/i;
  if (s.includes("ortho") || s.includes("bone")) return /ortho|bone/i;
  if (s.includes("physician") || s.includes("medicine") || s.includes("general")) return /physician|medicine|general/i;
  if (s.includes("dent")) return /dent/i;
  if (s.includes("eye") || s.includes("ophthalm")) return /eye|ophthalm/i;
  if (s.includes("pulmo") || s.includes("chest") || s.includes("lung")) return /pulmo|lung|chest/i;
  return new RegExp(spec, "i");
};


export const bookAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      gender,
      doctor,
      specialization,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    let assignedSpecialization = specialization;
    let assignedDoctorId = doctor;

    if (doctor) {
      const doctorExists = await User.findOne({
        _id: doctor,
        role: "doctor",
      });
      if (doctorExists) {
        assignedSpecialization = assignedSpecialization || doctorExists.specialization;
        assignedDoctorId = doctorExists._id;
      }
    }

    if (!assignedSpecialization) {
      return res.status(400).json({
        success: false,
        message: "Please select a medical specialization or doctor",
      });
    }

    // Helper to parse 12-hour AM/PM or 24-hour time + date into a valid Date object
    const parseAppointmentDateTime = (dateStr, timeStr) => {
      if (!dateStr || !timeStr) return new Date(NaN);

      const match12 = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (match12) {
        let [, hoursStr, minutesStr, period] = match12;
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        period = period.toUpperCase();

        if (period === "PM" && hours < 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        const [year, month, day] = dateStr.split("-").map((n) => parseInt(n, 10));
        return new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
      }

      const match24 = timeStr.trim().match(/^(\d{1,2}):(\d{2})$/);
      if (match24) {
        const [, hoursStr, minutesStr] = match24;
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        const [year, month, day] = dateStr.split("-").map((n) => parseInt(n, 10));
        return new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
      }

      return new Date(`${dateStr}T${timeStr}`);
    };

    const appointmentDateTime = parseAppointmentDateTime(
      appointmentDate,
      appointmentTime
    );

    if (isNaN(appointmentDateTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment date or time",
      });
    }

    // Ensure appointment date/time is not in the past
    if (appointmentDateTime.getTime() < Date.now() - 60000) {
      return res.status(400).json({
        success: false,
        message: "Appointment date/time cannot be in the past",
      });
    }

    // If no specific doctor was selected, auto-assign an available doctor in the department who is free at this slot
    if (!assignedDoctorId && assignedSpecialization) {
      const deptDoctors = await User.find({
        role: "doctor",
        specialization: getSpecializationRegex(assignedSpecialization),
        isActive: { $ne: false },
      });

      for (const doc of deptDoctors) {
        const isBooked = await Appointment.findOne({
          doctor: doc._id,
          appointmentDateTime,
          status: { $ne: "Rejected" },
        });
        if (!isBooked) {
          assignedDoctorId = doc._id;
          break;
        }
      }

      // If all doctors in department have bookings at this slot, assign the first doctor
      if (!assignedDoctorId && deptDoctors.length > 0) {
        assignedDoctorId = deptDoctors[0]._id;
      }
    }

    // Double-booking check: If a doctor is assigned, verify that doctor is free at the requested time
    if (assignedDoctorId) {
      const existingBooking = await Appointment.findOne({
        doctor: assignedDoctorId,
        appointmentDateTime,
        status: { $ne: "Rejected" },
      });

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: "The selected doctor is already booked for this time slot. Please choose another time slot or another doctor.",
        });
      }
    }

    const appointment = await Appointment.create({
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      gender,
      specialization: assignedSpecialization,
      doctor: assignedDoctorId,
      appointmentDateTime,
      reason,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Appointment request submitted successfully",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all booked time slots for a specific doctor or specialization on a date
 * @route   GET /api/appointments/booked-slots?specialization={specialization}&doctorId={doctorId}&date={YYYY-MM-DD}
 * @access  Public
 */
export const getBookedSlots = async (req, res) => {
  try {
    const { doctorId, specialization, date } = req.query;

    if ((!doctorId && !specialization) || !date) {
      return res.status(400).json({
        success: false,
        message: "specialization or doctorId and date query parameters are required",
      });
    }

    // Validate date format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Expected YYYY-MM-DD",
      });
    }

    // Define start and end of specified date in UTC
    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    if (isNaN(startOfDay.getTime()) || isNaN(endOfDay.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date provided",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: "Booked slots fetched (DB offline mode)",
        data: [],
      });
    }

    const queryConditions = [
      { status: { $ne: "Rejected" } },
      { appointmentDateTime: { $gte: startOfDay, $lte: endOfDay } },
    ];

    let totalDeptDoctors = 1;
    if (doctorId) {
      queryConditions.push({ doctor: doctorId });
    } else if (specialization) {
      const specRegex = getSpecializationRegex(specialization);
      const doctorsInSpec = await User.find({
        role: "doctor",
        specialization: specRegex,
        isActive: { $ne: false },
      }).select("_id");

      const doctorIds = doctorsInSpec.map((d) => d._id);
      totalDeptDoctors = doctorIds.length || 1;

      queryConditions.push({
        $or: [
          { specialization: specRegex },
          { doctor: { $in: doctorIds } },
        ],
      });
    }

    // Query appointments for doctor/specialization on date where status is NOT Rejected
    const appointments = await Appointment.find({
      $and: queryConditions,
    });

    // Helper to format Date into 12-hour "hh:mm AM/PM" format (e.g. "09:30 AM")
    const formatSlotTime = (dateObj) => {
      let hours = dateObj.getUTCHours();
      const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = hours.toString().padStart(2, "0");
      return `${formattedHours}:${minutes} ${ampm}`;
    };

    let bookedSlots = [];

    if (doctorId) {
      // Specific doctor: all non-rejected booked slots for that doctor
      bookedSlots = appointments.map((app) =>
        formatSlotTime(new Date(app.appointmentDateTime))
      );
    } else {
      // Department level: A slot is ONLY FULL if EVERY doctor in the department is booked at that slot time
      const slotDoctorMap = {};
      appointments.forEach((app) => {
        const slotStr = formatSlotTime(new Date(app.appointmentDateTime));
        if (!slotDoctorMap[slotStr]) {
          slotDoctorMap[slotStr] = new Set();
        }
        if (app.doctor) {
          slotDoctorMap[slotStr].add(app.doctor.toString());
        }
      });

      bookedSlots = Object.keys(slotDoctorMap).filter(
        (slotStr) => slotDoctorMap[slotStr].size >= totalDeptDoctors
      );
    }

    // Determine Doctor Schedule details if doctorId or specialization available
    let targetDoctorId = doctorId;
    if (!targetDoctorId && specialization) {
      const doc = await User.findOne({
        role: "doctor",
        specialization: new RegExp(specialization, "i"),
      });
      if (doc) targetDoctorId = doc._id;
    }

    let isBlocked = false;
    let blockedReason = "";
    let isAvailable = true;
    let startTime = "09:00";
    let endTime = "18:00";

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayIndex = startOfDay.getUTCDay();
    const dayName = daysOfWeek[dayIndex];

    if (targetDoctorId) {
      const docSchedule = await Schedule.findOne({ doctor: targetDoctorId });
      if (docSchedule) {
        // Check blocked dates (only Approved leaves block booking)
        const dateStr = startOfDay.toISOString().split("T")[0];
        const blockedMatch = docSchedule.blockedDates.find((b) => {
          const bStr = new Date(b.date).toISOString().split("T")[0];
          return bStr === dateStr && b.status === "Approved";
        });

        if (blockedMatch) {
          isBlocked = true;
          blockedReason = blockedMatch.reason || "Leave / Holiday";
        }

        // Check weekly availability
        if (
          docSchedule.weeklyAvailability &&
          docSchedule.weeklyAvailability[dayName]
        ) {
          const dayConfig = docSchedule.weeklyAvailability[dayName];
          isAvailable = dayConfig.isAvailable !== false;
          startTime = dayConfig.startTime || "09:00";
          endTime = dayConfig.endTime || "18:00";
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Booked time slots retrieved successfully",
      data: bookedSlots,
      schedule: {
        isBlocked,
        blockedReason,
        isAvailable,
        startTime,
        endTime,
        dayName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching booked slots",
    });
  }
};


export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "fullName specialization email")
      .sort({ appointmentDateTime: 1 });

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const doctorSpec = req.user.specialization || "";

    const queryConditions = [{ doctor: doctorId }];

    if (doctorSpec && typeof doctorSpec === "string" && doctorSpec.trim()) {
      const cleanSpec = doctorSpec.trim();
      const specStem = cleanSpec
        .replace(/(ologist|ology|ist|y|ics|ian|al|care)$/i, "")
        .trim();

      queryConditions.push({
        specialization: new RegExp(cleanSpec, "i"),
      });

      if (specStem && specStem.length >= 3) {
        queryConditions.push({
          specialization: new RegExp(specStem, "i"),
        });
      }
    }

    const appointments = await Appointment.find({
      $or: queryConditions,
    })
      .populate("doctor", "fullName specialization")
      .sort({ appointmentDateTime: 1 });

    return res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["Approved", "Rejected", "Completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (req.user.role === "doctor") {
      if (
        appointment.doctor &&
        appointment.doctor.toString() !== req.user._id.toString() &&
        appointment.status !== "Pending"
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }
      appointment.doctor = req.user._id;
    }

    appointment.status = status;

    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Track appointments by patient phone number (public)
 * @route   GET /api/appointments/track?phone={phone}
 * @access  Public
 */
export const trackAppointment = async (req, res) => {
  try {
    const { phone } = req.query;

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    const cleanPhone = phone.trim();

    const appointments = await Appointment.find({ patientPhone: cleanPhone })
      .populate("doctor", "fullName specialization")
      .sort({ appointmentDateTime: -1 });

    const safeAppointments = appointments.map((app) => ({
      _id: app._id,
      specialization: app.specialization,
      doctor: app.doctor
        ? {
            fullName: app.doctor.fullName,
            specialization: app.doctor.specialization,
          }
        : null,
      appointmentDateTime: app.appointmentDateTime,
      reason: app.reason,
      status: app.status,
    }));

    if (safeAppointments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No appointments found for this phone number",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: safeAppointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while tracking appointments",
    });
  }
};
