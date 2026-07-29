import User from "../models/User.mjs";
import Appointment from "../models/Appointment.mjs";
import Contact from "../models/Contact.mjs";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalDoctors,
      totalAppointments,
      totalContacts,
      pendingAppointments,
      approvedAppointments,
      rejectedAppointments,
      completedAppointments,
    ] = await Promise.all([
      User.countDocuments({ role: "doctor" }),

      Appointment.countDocuments(),

      Contact.countDocuments(),

      Appointment.countDocuments({
        status: "Pending",
      }),

      Appointment.countDocuments({
        status: "Approved",
      }),

      Appointment.countDocuments({
        status: "Rejected",
      }),

      Appointment.countDocuments({
        status: "Completed",
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: {
        totalDoctors,
        totalAppointments,
        totalContacts,
        pendingAppointments,
        approvedAppointments,
        rejectedAppointments,
        completedAppointments,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
