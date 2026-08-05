import mongoose from "mongoose";
import Appointment from "../models/Appointment.mjs";
import User from "../models/User.mjs";
import Schedule from "../models/Schedule.mjs";
import PatientProfile from "../models/PatientProfile.mjs";
import { validationResult } from "express-validator";
import { sendAppointmentStatusEmail } from "../config/brevo.mjs";

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

/**
 * Helper to check department capacity at a specific appointment date & time slot.
 * Capacity is full ONLY when all available doctors in the department have Approved (confirmed) bookings.
 */
export const checkDepartmentCapacityAtTime = async (specialization, appointmentDateTime) => {
  const specRegex = getSpecializationRegex(specialization);

  const activeDoctors = await User.find({
    role: "doctor",
    specialization: specRegex,
    isActive: { $ne: false },
  }).select("_id");

  if (!activeDoctors || activeDoctors.length === 0) {
    return {
      isFull: true,
      reason: "No active doctors are available in this medical department.",
      totalDoctors: 0,
      availableDoctors: 0,
    };
  }

  const doctorIds = activeDoctors.map((d) => d._id);
  const totalDeptDoctors = doctorIds.length;

  const dateStr = new Date(appointmentDateTime).toISOString().split("T")[0];

  const schedules = await Schedule.find({ doctor: { $in: doctorIds } });
  const doctorsOnLeave = new Set();

  schedules.forEach((sched) => {
    if (sched.blockedDates && Array.isArray(sched.blockedDates)) {
      const hasApprovedLeave = sched.blockedDates.some((b) => {
        const bStr = new Date(b.date).toISOString().split("T")[0];
        return bStr === dateStr && b.status === "Approved";
      });
      if (hasApprovedLeave) {
        doctorsOnLeave.add(sched.doctor.toString());
      }
    }
  });

  const availableDoctorsCount = totalDeptDoctors - doctorsOnLeave.size;

  if (availableDoctorsCount <= 0) {
    return {
      isFull: true,
      reason: "All specialists in this department are on approved leave for this date.",
      totalDoctors: totalDeptDoctors,
      availableDoctors: 0,
    };
  }

  // Count ONLY CONFIRMED (Approved) appointments at this time slot
  const confirmedAppointmentsCount = await Appointment.countDocuments({
    status: "Approved",
    appointmentDateTime,
    $or: [
      { specialization: specRegex },
      { doctor: { $in: doctorIds } },
    ],
  });

  const isFull = confirmedAppointmentsCount >= availableDoctorsCount;

  return {
    isFull,
    reason: isFull
      ? "All doctors slots are full"
      : null,
    totalDoctors: totalDeptDoctors,
    availableDoctors: availableDoctorsCount,
    committedAppointments: confirmedAppointmentsCount,
  };
};

/**
 * Helper to check if a specific appointment can no longer be fulfilled by any doctor in the department
 * because all available doctors are either on leave, already have Approved bookings at this slot, or have rejected this request.
 */
export const checkIfSlotIsFullyBookedOrRejected = async (appointment, specialization, appointmentDateTime) => {
  const specRegex = getSpecializationRegex(specialization);

  const activeDoctors = await User.find({
    role: "doctor",
    specialization: specRegex,
    isActive: { $ne: false },
  }).select("_id");

  if (!activeDoctors || activeDoctors.length === 0) {
    return true;
  }

  const dateStr = new Date(appointmentDateTime).toISOString().split("T")[0];
  const doctorIds = activeDoctors.map((d) => d._id);
  const schedules = await Schedule.find({ doctor: { $in: doctorIds } });

  const rejectedDoctorIdStrs = (appointment.rejectedByDoctors || []).map((id) => id.toString());

  let availableDoctorCount = 0;

  for (const doc of activeDoctors) {
    const docIdStr = doc._id.toString();

    // 1. Check if this doctor has already rejected this request
    if (rejectedDoctorIdStrs.includes(docIdStr)) {
      continue;
    }

    // 2. Check if this doctor is on approved leave on this date
    const docSched = schedules.find((s) => s.doctor.toString() === docIdStr);
    if (docSched && docSched.blockedDates) {
      const isOnLeave = docSched.blockedDates.some((b) => {
        const bStr = new Date(b.date).toISOString().split("T")[0];
        return bStr === dateStr && b.status === "Approved";
      });
      if (isOnLeave) continue;
    }

    // 3. Check if this doctor already has a confirmed Approved appointment at this exact time slot
    const hasApprovedBooking = await Appointment.findOne({
      doctor: doc._id,
      appointmentDateTime,
      status: "Approved",
      _id: { $ne: appointment._id },
    });

    if (hasApprovedBooking) continue;

    // This doctor is available!
    availableDoctorCount++;
  }

  return availableDoctorCount === 0;
};

/**
 * Helper to clean up / reassign / auto-reject other pending requests at the same time slot
 * after an appointment is approved by a doctor.
 */
export const handleSlotPostApprovalCleanup = async (approvedAppointment, approvingDoctorId) => {
  try {
    const { _id: approvedId, specialization, appointmentDateTime } = approvedAppointment;
    const doctorId = approvingDoctorId || approvedAppointment.doctor;
    const specRegex = getSpecializationRegex(specialization);

    if (doctorId) {
      // 1. Doctor-assigned Pending requests for this doctor at the exact same time slot:
      // "In more than one request for a same time slot doctor approves a one request a removed request should be rejects and reason becomes rejected."
      const otherPendingAssignedToDoctor = await Appointment.find({
        _id: { $ne: approvedId },
        doctor: doctorId,
        appointmentDateTime,
        status: "Pending",
      });

      for (const pendingApp of otherPendingAssignedToDoctor) {
        pendingApp.status = "Rejected";
        pendingApp.rejectionReason = "Rejected";
        pendingApp.rejectedBy = "doctor";
        await pendingApp.save();
      }

      // 2. Department unassigned Pending requests at the exact same time slot:
      // "In department booking in more than one request for a same time slot doctor approves a one request a removed request should be consider as rejected add that doctor in rejectedy"
      const unassignedPendingAtSlot = await Appointment.find({
        _id: { $ne: approvedId },
        status: "Pending",
        appointmentDateTime,
        $or: [{ doctor: null }, { doctor: { $exists: false } }],
        specialization: specRegex,
      });

      for (const unassignedApp of unassignedPendingAtSlot) {
        if (!unassignedApp.rejectedByDoctors) {
          unassignedApp.rejectedByDoctors = [];
        }
        if (!unassignedApp.rejectedByDoctors.some((id) => id.toString() === doctorId.toString())) {
          unassignedApp.rejectedByDoctors.push(doctorId);
        }

        // Check if all doctors slots are full / no remaining available doctors
        const isFullyBooked = await checkIfSlotIsFullyBookedOrRejected(
          unassignedApp,
          specialization,
          appointmentDateTime
        );

        if (isFullyBooked) {
          unassignedApp.status = "Rejected";
          unassignedApp.rejectionReason = "All doctors slots are full";
          unassignedApp.rejectedBy = "doctor";
        }

        await unassignedApp.save();
      }
    }

    // 3. Reject any other pending requests for the SAME PATIENT at this exact same time slot across doctors
    const patientConditions = [];
    if (approvedAppointment.patientProfile) {
      patientConditions.push({ patientProfile: approvedAppointment.patientProfile });
    }
    if (approvedAppointment.patientEmail) {
      patientConditions.push({ patientEmail: approvedAppointment.patientEmail.toLowerCase() });
    }
    if (approvedAppointment.patientPhone) {
      patientConditions.push({ patientPhone: approvedAppointment.patientPhone });
    }

    if (patientConditions.length > 0) {
      const otherPatientPendingAtSlot = await Appointment.find({
        _id: { $ne: approvedId },
        $or: patientConditions,
        appointmentDateTime,
        status: "Pending",
      });

      for (const pendingApp of otherPatientPendingAtSlot) {
        pendingApp.status = "Rejected";
        pendingApp.rejectionReason = "Patient already has an approved appointment at this time slot";
        pendingApp.rejectedBy = "system-auto";
        await pendingApp.save();
      }
    }
  } catch (err) {
    console.error("Error during post-approval slot cleanup:", err);
  }
};

/**
 * Helper to auto-reject past or unfulfillable dangling appointments
 */
export const cleanupDanglingAppointments = async () => {
  try {
    const now = new Date();

    // 1. Expired Pending appointments whose date/time has passed
    const expiredResult = await Appointment.updateMany(
      {
        status: "Pending",
        appointmentDateTime: { $lt: now },
      },
      {
        $set: {
          status: "Rejected",
          rejectionReason: "Appointment date and time has passed",
          rejectedBy: "system-auto",
        },
      }
    );

    // 2. All future Pending appointments where the department capacity is 100% full with confirmed Approved bookings
    const futurePending = await Appointment.find({
      status: "Pending",
      appointmentDateTime: { $gte: now },
    });

    let autoRejectedDanglingCount = 0;

    for (const app of futurePending) {
      const isFullyBooked = await checkIfSlotIsFullyBookedOrRejected(
        app,
        app.specialization,
        app.appointmentDateTime
      );

      if (isFullyBooked) {
        app.status = "Rejected";
        app.rejectionReason = "All doctors slots are full";
        app.rejectedBy = "system-auto";
        await app.save();
        autoRejectedDanglingCount++;
      }
    }

    return {
      expiredCount: expiredResult.modifiedCount || 0,
      danglingCount: autoRejectedDanglingCount,
    };
  } catch (err) {
    console.error("Error during dangling appointments cleanup:", err);
    return { expiredCount: 0, danglingCount: 0 };
  }
};

/**
 * Admin controller action for triggering explicit dangling appointments cleanup
 */
export const cleanupDanglingAppointmentsHandler = async (req, res) => {
  try {
    const result = await cleanupDanglingAppointments();
    return res.status(200).json({
      success: true,
      message: "Dangling and expired appointments cleaned up successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while cleaning up appointments",
    });
  }
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
      patientProfileId,
    } = req.body;

    let finalPatientName = patientName;
    let finalPatientEmail = patientEmail;
    let finalPatientPhone = patientPhone;
    let finalPatientAge = patientAge;
    let finalGender = gender;
    let resolvedProfileId = null;

    if (patientProfileId) {
      const profile = await PatientProfile.findById(patientProfileId);
      if (profile) {
        // If requireOtpVerified attached verifiedEmail, ensure profile belongs to verifiedEmail
        if (req.verifiedEmail && profile.email.toLowerCase() !== req.verifiedEmail.toLowerCase()) {
          return res.status(403).json({
            success: false,
            message: "Unauthorized profile usage.",
          });
        }
        finalPatientName = profile.fullName;
        finalPatientEmail = profile.email;
        finalPatientPhone = profile.phone;
        finalPatientAge = profile.age;
        finalGender = profile.gender;
        resolvedProfileId = profile._id;
      }
    }

    let assignedSpecialization = specialization;
    let assignedDoctorId = doctor;

    if (doctor && String(doctor).trim() !== "") {
      const doctorExists = await User.findOne({
        _id: doctor,
        role: "doctor",
      });
      if (doctorExists) {
        assignedSpecialization = assignedSpecialization || doctorExists.specialization;
        assignedDoctorId = doctorExists._id;
      }
    } else {
      assignedDoctorId = undefined;
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

    // Check if THIS patient already has an Approved appointment at this exact date and time slot with ANY doctor
    const patientConds = [];
    if (resolvedProfileId) {
      patientConds.push({ patientProfile: resolvedProfileId });
    }
    if (finalPatientEmail) {
      patientConds.push({ patientEmail: finalPatientEmail.toLowerCase() });
    }
    if (finalPatientPhone) {
      patientConds.push({ patientPhone: finalPatientPhone });
    }

    if (patientConds.length > 0) {
      const existingPatientApproved = await Appointment.findOne({
        $or: patientConds,
        appointmentDateTime,
        status: "Approved",
      });

      if (existingPatientApproved) {
        return res.status(400).json({
          success: false,
          message: "You already have an approved appointment with a doctor at this date and time slot.",
        });
      }
    }

    // If a specific doctor was requested, check if that doctor is free at the requested time
    if (assignedDoctorId) {
      const existingBooking = await Appointment.findOne({
        doctor: assignedDoctorId,
        appointmentDateTime,
        status: "Approved",
      });

      if (existingBooking) {
        return res.status(400).json({
          success: false,
          message: "The selected doctor is already booked for this time slot. Please choose another time slot or another doctor.",
        });
      }
    } else {
      // Unassigned booking capacity check
      const capacity = await checkDepartmentCapacityAtTime(
        assignedSpecialization,
        appointmentDateTime
      );

      if (capacity.isFull) {
        return res.status(400).json({
          success: false,
          message:
            capacity.reason ||
            "All doctors slots are full",
        });
      }
    }

    const appointment = await Appointment.create({
      patientName: finalPatientName,
      patientEmail: finalPatientEmail,
      patientPhone: finalPatientPhone,
      patientAge: finalPatientAge,
      gender: finalGender,
      specialization: assignedSpecialization,
      doctor: assignedDoctorId || null,
      patientProfile: resolvedProfileId || null,
      appointmentDate: appointmentDate ? appointmentDate.trim() : undefined,
      appointmentTime: appointmentTime ? appointmentTime.trim() : undefined,
      appointmentDateTime,
      reason,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: assignedDoctorId
        ? "Appointment request submitted to selected doctor successfully"
        : "Appointment request submitted to specialization department. Available doctors will review and confirm your slot.",
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

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Expected YYYY-MM-DD",
      });
    }

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
      { status: "Approved" },
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

    const appointments = await Appointment.find({
      $and: queryConditions,
    });

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
      bookedSlots = appointments.map((app) =>
        formatSlotTime(new Date(app.appointmentDateTime))
      );
    } else {
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

    if (doctorId && mongoose.Types.ObjectId.isValid(doctorId)) {
      const docSchedule = await Schedule.findOne({ doctor: doctorId });
      if (docSchedule) {
        const dateStr = startOfDay.toISOString().split("T")[0];
        const blockedMatch = docSchedule.blockedDates.find((b) => {
          const bStr = new Date(b.date).toISOString().split("T")[0];
          return bStr === dateStr && b.status === "Approved";
        });

        if (blockedMatch) {
          isBlocked = true;
          blockedReason = blockedMatch.reason || "Leave / Holiday";
        }

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
    } else if (specialization) {
      const specRegex = getSpecializationRegex(specialization);
      const deptDoctors = await User.find({
        role: "doctor",
        specialization: specRegex,
        isActive: { $ne: false },
      }).select("_id");

      if (deptDoctors && deptDoctors.length > 0) {
        const docIds = deptDoctors.map((d) => d._id);
        const schedules = await Schedule.find({ doctor: { $in: docIds } });
        const dateStr = startOfDay.toISOString().split("T")[0];

        let blockedCount = 0;
        let reasons = [];

        for (const doc of deptDoctors) {
          const docSched = schedules.find(
            (s) => s.doctor.toString() === doc._id.toString()
          );
          if (docSched) {
            const bMatch = docSched.blockedDates.find((b) => {
              const bStr = new Date(b.date).toISOString().split("T")[0];
              return bStr === dateStr && b.status === "Approved";
            });
            if (bMatch) {
              blockedCount++;
              if (bMatch.reason && !reasons.includes(bMatch.reason)) {
                reasons.push(bMatch.reason);
              }
            }
          }
        }

        if (blockedCount > 0 && blockedCount === deptDoctors.length) {
          isBlocked = true;
          blockedReason =
            reasons.join(", ") ||
            "All specialists in this department are on leave on this date";
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
    await cleanupDanglingAppointments();

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
    await cleanupDanglingAppointments();

    const doctorId = req.user._id;
    const doctorSpec = req.user.specialization || "";

    const specRegex = getSpecializationRegex(doctorSpec);

    // Find all time slots where this doctor ALREADY has a confirmed (Approved) appointment
    const myApprovedAppointments = await Appointment.find({
      doctor: doctorId,
      status: "Approved",
    }).select("appointmentDateTime");

    const myBookedTimeSlots = myApprovedAppointments.map((app) => app.appointmentDateTime);

    // Doctor sees:
    // 1. Appointments explicitly assigned to this doctor
    // 2. Unassigned pending requests matching the doctor's specialization, EXCLUDING:
    //    - requests rejected by this doctor
    //    - time slots where this doctor is already booked/approved
    const queryConditions = [
      { doctor: doctorId },
    ];

    if (doctorSpec && typeof doctorSpec === "string" && doctorSpec.trim()) {
      const unassignedCondition = {
        $or: [{ doctor: null }, { doctor: { $exists: false } }],
        status: "Pending",
        specialization: specRegex,
        rejectedByDoctors: { $ne: doctorId },
      };

      if (myBookedTimeSlots.length > 0) {
        unassignedCondition.appointmentDateTime = { $nin: myBookedTimeSlots };
      }

      queryConditions.push(unassignedCondition);
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
    const { status, rejectionReason } = req.body;

    const allowedStatus = ["Approved", "Rejected", "Completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment status",
      });
    }

    const appointmentId = req.params.id;
    const existingAppointment = await Appointment.findById(appointmentId);

    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (req.user.role === "doctor") {
      const isUnassigned = !existingAppointment.doctor;
      const isAssignedToMe =
        existingAppointment.doctor &&
        existingAppointment.doctor.toString() === req.user._id.toString();

      if (!isUnassigned && !isAssignedToMe) {
        return res.status(400).json({
          success: false,
          message:
            "This appointment request has already been accepted or claimed by another doctor.",
        });
      }

      if (status === "Approved") {
        if (isUnassigned) {
          // Atomic claim for unassigned pending request
          const claimedAppointment = await Appointment.findOneAndUpdate(
            {
              _id: appointmentId,
              $or: [{ doctor: null }, { doctor: { $exists: false } }],
              status: "Pending",
            },
            {
              $set: {
                doctor: req.user._id,
                status: "Approved",
              },
            },
            { new: true }
          );

          if (!claimedAppointment) {
            return res.status(400).json({
              success: false,
              message:
                "This appointment was already accepted by another doctor.",
            });
          }

          // Post-claim doctor conflict check
          const doctorConflict = await Appointment.findOne({
            doctor: req.user._id,
            appointmentDateTime: claimedAppointment.appointmentDateTime,
            status: "Approved",
            _id: { $ne: claimedAppointment._id },
          });

          if (doctorConflict) {
            // Roll back atomic claim
            await Appointment.findByIdAndUpdate(claimedAppointment._id, {
              $set: { doctor: null, status: "Pending" },
            });

            return res.status(400).json({
              success: false,
              message:
                "You already have another confirmed appointment at this exact time slot.",
            });
          }

          // Clean up / reassign / remove other pending requests at this same time slot
          await handleSlotPostApprovalCleanup(claimedAppointment, req.user._id);

          const updatedAppointment = await Appointment.findById(
            claimedAppointment._id
          ).populate("doctor", "fullName name specialization");

          if (updatedAppointment && updatedAppointment.patientEmail) {
            sendAppointmentStatusEmail({
              toEmail: updatedAppointment.patientEmail,
              patientName: updatedAppointment.patientName,
              doctorName: updatedAppointment.doctor?.name || updatedAppointment.doctor?.fullName || "Attending Specialist",
              specialization: updatedAppointment.specialization,
              appointmentDate: updatedAppointment.appointmentDateTime,
              appointmentTime: updatedAppointment.appointmentTime,
              status: updatedAppointment.status,
              rejectionReason: updatedAppointment.rejectionReason,
            }).catch((e) => console.error("Error sending status email:", e));
          }

          return res.status(200).json({
            success: true,
            message: "Appointment accepted and assigned to you successfully!",
            data: updatedAppointment,
          });
        } else {
          // Doctor-specific / assigned to me
          const doctorConflict = await Appointment.findOne({
            doctor: req.user._id,
            appointmentDateTime: existingAppointment.appointmentDateTime,
            status: "Approved",
            _id: { $ne: existingAppointment._id },
          });

          if (doctorConflict) {
            return res.status(400).json({
              success: false,
              message:
                "You already have another confirmed appointment at this exact time slot.",
            });
          }

          existingAppointment.status = "Approved";
          await existingAppointment.save();

          // Clean up / reassign / remove other pending requests at this same time slot
          await handleSlotPostApprovalCleanup(existingAppointment, req.user._id);
        }
      } else if (status === "Rejected") {
        if (isUnassigned) {
          // Department-level unassigned appointment rejection by doctor
          if (!existingAppointment.rejectedByDoctors) {
            existingAppointment.rejectedByDoctors = [];
          }
          if (!existingAppointment.rejectedByDoctors.some((id) => id.toString() === req.user._id.toString())) {
            existingAppointment.rejectedByDoctors.push(req.user._id);
          }

          // Check if ALL active available doctors in this specialization have rejected this request or are full
          const isFullyBooked = await checkIfSlotIsFullyBookedOrRejected(
            existingAppointment,
            existingAppointment.specialization,
            existingAppointment.appointmentDateTime
          );

          if (isFullyBooked) {
            existingAppointment.status = "Rejected";
            existingAppointment.rejectionReason = rejectionReason || "All doctors slots are full";
            existingAppointment.rejectedBy = "doctor";
          } else {
            // Keep status as Pending so other available doctors in department can still see and approve it
            existingAppointment.status = "Pending";
          }
          await existingAppointment.save();
        } else {
          // Doctor-assigned request rejected by assigned doctor
          existingAppointment.status = "Rejected";
          existingAppointment.rejectionReason = rejectionReason || "Rejected";
          existingAppointment.rejectedBy = "doctor";
          await existingAppointment.save();
        }
      } else {
        existingAppointment.status = status;
        await existingAppointment.save();
      }
    } else {
      // Admin update
      existingAppointment.status = status;
      if (status === "Rejected") {
        existingAppointment.rejectionReason =
          rejectionReason || "Rejected by admin";
        existingAppointment.rejectedBy = "admin";
      } else if (status === "Approved") {
        await handleSlotPostApprovalCleanup(existingAppointment, existingAppointment.doctor);
      }
      await existingAppointment.save();
    }

    const updatedAppointment = await Appointment.findById(
      existingAppointment._id
    ).populate("doctor", "fullName name specialization");

    if (updatedAppointment && updatedAppointment.patientEmail) {
      sendAppointmentStatusEmail({
        toEmail: updatedAppointment.patientEmail,
        patientName: updatedAppointment.patientName,
        doctorName: updatedAppointment.doctor?.name || updatedAppointment.doctor?.fullName || "Attending Specialist",
        specialization: updatedAppointment.specialization,
        appointmentDate: updatedAppointment.appointmentDateTime,
        appointmentTime: updatedAppointment.appointmentTime,
        status: updatedAppointment.status,
        rejectionReason: updatedAppointment.rejectionReason,
      }).catch((e) => console.error("Error sending status email:", e));
    }

    return res.status(200).json({
      success: true,
      message:
        status === "Approved"
          ? "Appointment accepted and assigned to you successfully!"
          : `Appointment status updated to ${status}`,
      data: updatedAppointment,
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
      rejectionReason: app.rejectionReason || null,
      rejectedBy: app.rejectedBy || null,
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
