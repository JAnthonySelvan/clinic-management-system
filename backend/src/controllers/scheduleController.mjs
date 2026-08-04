import Schedule from "../models/Schedule.mjs";
import User from "../models/User.mjs";
import Appointment from "../models/Appointment.mjs";

/**
 * Helper to get or create schedule for a doctor
 */
const getOrCreateSchedule = async (doctorId) => {
  let schedule = await Schedule.findOne({ doctor: doctorId });
  if (!schedule) {
    schedule = await Schedule.create({ doctor: doctorId });
  }
  return schedule;
};

/**
 * @desc    Get current doctor's schedule
 * @route   GET /api/schedule/my-schedule
 * @access  Private (Doctor)
 */
export const getMySchedule = async (req, res) => {
  try {
    const schedule = await getOrCreateSchedule(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Schedule fetched successfully",
      data: schedule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching schedule",
    });
  }
};

/**
 * @desc    Update doctor's weekly availability
 * @route   PATCH /api/schedule/weekly-availability
 * @access  Private (Doctor)
 */
export const updateWeeklyAvailability = async (req, res) => {
  try {
    const { weeklyAvailability } = req.body;

    if (!weeklyAvailability || typeof weeklyAvailability !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid weeklyAvailability payload",
      });
    }

    const schedule = await getOrCreateSchedule(req.user._id);

    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    days.forEach((day) => {
      if (weeklyAvailability[day]) {
        schedule.weeklyAvailability[day] = {
          ...schedule.weeklyAvailability[day],
          ...weeklyAvailability[day],
        };
      }
    });

    await schedule.save();

    return res.status(200).json({
      success: true,
      message: "Weekly availability updated successfully",
      data: schedule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while updating availability",
    });
  }
};

/**
 * @desc    Add a blocked date (leave/holiday)
 * @route   POST /api/schedule/blocked-dates
 * @access  Private (Doctor)
 */
export const addBlockedDate = async (req, res) => {
  try {
    const { date, reason } = req.body;

    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date provided",
      });
    }

    const schedule = await getOrCreateSchedule(req.user._id);

    const targetString = targetDate.toISOString().split("T")[0];

    const duplicate = schedule.blockedDates.some((b) => {
      const bString = new Date(b.date).toISOString().split("T")[0];
      return bString === targetString;
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "This date is already blocked in your schedule",
      });
    }

    schedule.blockedDates.push({
      date: targetDate,
      reason: reason ? reason.trim() : "Leave / Holiday",
    });

    // Sort blocked dates by date ascending
    schedule.blockedDates.sort((a, b) => new Date(a.date) - new Date(b.date));

    await schedule.save();

    return res.status(201).json({
      success: true,
      message: "Blocked date added successfully",
      data: schedule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while adding blocked date",
    });
  }
};

/**
 * @desc    Remove a blocked date
 * @route   DELETE /api/schedule/blocked-dates/:dateId
 * @access  Private (Doctor)
 */
export const removeBlockedDate = async (req, res) => {
  try {
    const { dateId } = req.params;

    const schedule = await getOrCreateSchedule(req.user._id);

    const initialLength = schedule.blockedDates.length;

    schedule.blockedDates = schedule.blockedDates.filter(
      (b) => b._id.toString() !== dateId,
    );

    if (schedule.blockedDates.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Blocked date entry not found",
      });
    }

    await schedule.save();

    return res.status(200).json({
      success: true,
      message: "Blocked date removed successfully",
      data: schedule,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while removing blocked date",
    });
  }
};

/**
 * @desc    Get doctor availability (public endpoint for booking flow)
 * @route   GET /api/schedule/doctor/:doctorId
 * @access  Public
 */
export const getDoctorAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctorExists = await User.findOne({
      _id: doctorId,
      role: "doctor",
    });

    if (!doctorExists) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const schedule = await getOrCreateSchedule(doctorId);

    return res.status(200).json({
      success: true,
      message: "Doctor availability retrieved successfully",
      data: {
        doctor: doctorId,
        weeklyAvailability: schedule.weeklyAvailability,
        blockedDates: schedule.blockedDates,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching doctor availability",
    });
  }
};

/**
 * @desc    Get all doctor leave requests for Admin review
 * @route   GET /api/schedule/admin/leaves
 * @access  Private (Admin)
 */
export const getAdminLeaves = async (req, res) => {
  try {
    const schedules = await Schedule.find({
      "blockedDates.0": { $exists: true },
    }).populate("doctor", "fullName specialization profileImage email");

    const leaves = [];

    schedules.forEach((sched) => {
      if (sched.doctor && sched.blockedDates) {
        sched.blockedDates.forEach((b) => {
          leaves.push({
            scheduleId: sched._id,
            dateId: b._id,
            date: b.date,
            reason: b.reason,
            status: b.status || "Pending",
            doctor: {
              _id: sched.doctor._id,
              fullName: sched.doctor.fullName,
              specialization: sched.doctor.specialization,
              profileImage: sched.doctor.profileImage,
              email: sched.doctor.email,
            },
          });
        });
      }
    });

    leaves.sort((a, b) => new Date(a.date) - new Date(b.date));

    return res.status(200).json({
      success: true,
      message: "Doctor leaves fetched successfully",
      data: leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching doctor leaves",
    });
  }
};

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
 * @desc    Update a doctor leave request status (Approve / Reject)
 * @route   PATCH /api/schedule/admin/leaves/:scheduleId/:dateId
 * @access  Private (Admin)
 */
export const updateLeaveStatus = async (req, res) => {
  try {
    const { scheduleId, dateId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const schedule = await Schedule.findById(scheduleId).populate(
      "doctor",
      "fullName specialization profileImage email",
    );

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule entry not found",
      });
    }

    const leave = schedule.blockedDates.id(dateId);
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave entry not found",
      });
    }

    leave.status = status;
    await schedule.save();

    let autoRejectedCount = 0;
    let autoReassignedCount = 0;

    // If leave is Approved, automatically reassign or reject existing Pending/Approved appointments on that leave date for this doctor
    if (status === "Approved" && leave.date && schedule.doctor) {
      const leaveDate = new Date(leave.date);
      const doctorId = schedule.doctor._id || schedule.doctor;

      const dateStr = leaveDate.toISOString().split("T")[0];
      const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
      const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);

      const doctorUser = await User.findById(doctorId);
      const doctorSpec = doctorUser ? doctorUser.specialization : schedule.doctor.specialization;
      const specRegex = getSpecializationRegex(doctorSpec);

      // Find affected appointments for this doctor on that date
      const affectedAppointments = await Appointment.find({
        doctor: doctorId,
        appointmentDateTime: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ["Pending", "Approved"] },
      });

      if (affectedAppointments.length > 0) {
        const candidateDoctors = await User.find({
          _id: { $ne: doctorId },
          role: "doctor",
          specialization: specRegex,
          isActive: { $ne: false },
        });

        const candidateSchedules = await Schedule.find({
          doctor: { $in: candidateDoctors.map((d) => d._id) },
        });

        const availableCandidateIds = candidateDoctors
          .filter((doc) => {
            const docSched = candidateSchedules.find(
              (s) => s.doctor.toString() === doc._id.toString()
            );
            if (docSched && docSched.blockedDates) {
              const isDocOnLeave = docSched.blockedDates.some((b) => {
                const bStr = new Date(b.date).toISOString().split("T")[0];
                return bStr === dateStr && b.status === "Approved";
              });
              if (isDocOnLeave) return false;
            }
            return true;
          })
          .map((doc) => doc._id);

        for (const app of affectedAppointments) {
          let reassigned = false;

          if (availableCandidateIds.length > 0) {
            for (const candId of availableCandidateIds) {
              const conflict = await Appointment.findOne({
                doctor: candId,
                appointmentDateTime: app.appointmentDateTime,
                status: { $in: ["Pending", "Approved"] },
              });

              if (!conflict) {
                app.doctor = candId;
                await app.save();
                reassigned = true;
                autoReassignedCount++;
                break;
              }
            }
          }

          if (!reassigned) {
            app.status = "Rejected";
            app.rejectionReason = "Doctor on approved leave";
            app.rejectedBy = "system-leave";
            await app.save();
            autoRejectedCount++;
          }
        }
      }
    }

    let message = `Leave request ${status.toLowerCase()} successfully`;
    if (status === "Approved") {
      if (autoReassignedCount > 0 && autoRejectedCount > 0) {
        message = `Leave approved. ${autoReassignedCount} appointment(s) reassigned, ${autoRejectedCount} appointment(s) automatically rejected.`;
      } else if (autoReassignedCount > 0) {
        message = `Leave approved. ${autoReassignedCount} appointment(s) automatically reassigned to available specialists.`;
      } else if (autoRejectedCount > 0) {
        message = `Leave approved. ${autoRejectedCount} appointment(s) on this date were automatically rejected.`;
      }
    }

    return res.status(200).json({
      success: true,
      message,
      data: {
        scheduleId: schedule._id,
        dateId: leave._id,
        date: leave.date,
        reason: leave.reason,
        status: leave.status,
        doctor: schedule.doctor,
        autoRejectedAppointmentsCount: autoRejectedCount,
        autoReassignedCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while updating leave status",
    });
  }
};
