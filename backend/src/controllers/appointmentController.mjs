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
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;

    const doctorExists = await User.findOne({
      _id: doctor,
      role: "doctor",
    });

    if (!doctorExists) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Combine separate date + time inputs into the single Date field the schema expects
    const appointmentDateTime = new Date(
      `${appointmentDate}T${appointmentTime}`,
    );

    if (isNaN(appointmentDateTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment date or time",
      });
    }

    if (appointmentDateTime.getTime() < Date.now()) {
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
      doctor,
      appointmentDateTime,
      reason,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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
    const appointments = await Appointment.find({
      doctor: req.user._id,
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

    if (
      req.user.role === "doctor" &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
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
