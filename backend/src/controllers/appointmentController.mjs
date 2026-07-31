import mongoose from "mongoose";
import Appointment from "../models/Appointment.mjs";
import User from "../models/User.mjs";
import { validationResult } from "express-validator";


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

    if (!assignedDoctorId && assignedSpecialization) {
      const matchedDoctor = await User.findOne({
        role: "doctor",
        specialization: new RegExp(assignedSpecialization, "i"),
      });
      if (matchedDoctor) {
        assignedDoctorId = matchedDoctor._id;
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

    if (doctorId) {
      queryConditions.push({ doctor: doctorId });
    } else if (specialization) {
      const doctorsInSpec = await User.find({
        role: "doctor",
        specialization: new RegExp(specialization, "i"),
      }).select("_id");
      const doctorIds = doctorsInSpec.map((d) => d._id);

      queryConditions.push({
        $or: [
          { specialization: new RegExp(specialization, "i") },
          { doctor: { $in: doctorIds } },
        ],
      });
    }

    // Query appointments for doctor on date where status is NOT Rejected
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

    // Extract formatted time string array
    const bookedSlots = appointments.map((app) =>
      formatSlotTime(new Date(app.appointmentDateTime))
    );

    return res.status(200).json({
      success: true,
      message: "Booked time slots retrieved successfully",
      data: bookedSlots,
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
    const doctorSpec = req.user.specialization;

    const appointments = await Appointment.find({
      $or: [
        { doctor: doctorId },
        {
          specialization: new RegExp(doctorSpec, "i"),
          status: "Pending",
        },
      ],
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
      if (status === "Approved") {
        appointment.doctor = req.user._id;
      } else if (
        appointment.doctor &&
        appointment.doctor.toString() !== req.user._id.toString() &&
        appointment.status !== "Pending"
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }
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
