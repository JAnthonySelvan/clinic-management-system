import Prescription from "../models/Prescription.mjs";
import Appointment from "../models/Appointment.mjs";
import User from "../models/User.mjs";
import { generatePrescriptionPdf } from "../utils/generatePrescriptionPdf.mjs";
import { uploadPdfBuffer } from "../utils/uploadToCloudinary.mjs";
import { sendPrescriptionEmail } from "../config/brevo.mjs";

/**
 * Create or Update a Digital Prescription for an Appointment
 * POST /api/prescriptions
 */
export const createOrUpdatePrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      diagnosis,
      medicines = [],
      medicalAdvice = "",
      followUpDate = null,
      additionalNotes = "",
    } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required.",
      });
    }

    if (!diagnosis || !diagnosis.trim()) {
      return res.status(400).json({
        success: false,
        message: "Diagnosis description is required.",
      });
    }

    // 1. Fetch Appointment details
    const appointment = await Appointment.findById(appointmentId).populate("doctor");
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    // Determine Doctor Info
    let doctorUser = appointment.doctor;
    if (!doctorUser && req.user?.role === "doctor") {
      doctorUser = await User.findById(req.user._id);
      // Link appointment to this doctor if unassigned
      appointment.doctor = doctorUser._id;
    } else if (!doctorUser && req.user?.id) {
      doctorUser = await User.findById(req.user.id);
    }

    if (!doctorUser) {
      // Fallback query for assigned doctor
      doctorUser = {
        name: req.user?.name || "Attending Doctor",
        specialization: appointment.specialization || "General Medicine",
        email: req.user?.email || "doctor@savioursclinic.com",
      };
    }

    // 2. Mark Appointment as Completed
    if (appointment.status !== "Completed") {
      appointment.status = "Completed";
      await appointment.save();
    }

    // 3. Generate PDF Buffer
    const pdfBuffer = await generatePrescriptionPdf({
      appointment,
      doctor: doctorUser,
      diagnosis: diagnosis.trim(),
      medicines,
      medicalAdvice,
      followUpDate,
      additionalNotes,
    });

    // 4. Upload PDF to Cloudinary
    const filename = `prescription_${appointment._id}_${Date.now()}`;
    const { pdfUrl, cloudinaryPublicId } = await uploadPdfBuffer(pdfBuffer, filename);

    // 5. Idempotent DB Record Creation / Update
    let prescription = await Prescription.findOne({ appointment: appointment._id });

    const payload = {
      appointment: appointment._id,
      patientProfile: appointment.patientProfile || null,
      doctor: doctorUser._id || req.user?._id,
      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,
      patientPhone: appointment.patientPhone || "",
      patientAge: appointment.patientAge || null,
      gender: appointment.gender || "Other",
      diagnosis: diagnosis.trim(),
      medicines: Array.isArray(medicines) ? medicines : [],
      medicalAdvice: medicalAdvice.trim(),
      followUpDate: followUpDate ? new Date(followUpDate) : null,
      additionalNotes: additionalNotes.trim(),
      pdfUrl,
      cloudinaryPublicId,
    };

    if (prescription) {
      Object.assign(prescription, payload);
      await prescription.save();
    } else {
      prescription = await Prescription.create(payload);
    }

    // 6. Trigger Brevo Email Notification to Patient (Async non-blocking)
    sendPrescriptionEmail({
      toEmail: appointment.patientEmail,
      patientName: appointment.patientName,
      doctorName: doctorUser.name || "Saviours Doctor",
      appointmentDate: appointment.appointmentDateTime,
      pdfUrl,
      followUpDate,
    }).catch((emailErr) => {
      console.error("Prescription email notification error:", emailErr);
    });

    return res.status(200).json({
      success: true,
      message: "Digital Prescription generated & issued successfully.",
      prescription,
    });
  } catch (error) {
    console.error("Error creating prescription:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate prescription.",
    });
  }
};

/**
 * Get Prescription details for an Appointment
 * GET /api/prescriptions/appointment/:appointmentId
 */
export const getPrescriptionByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const prescription = await Prescription.findOne({ appointment: appointmentId })
      .populate("doctor", "name specialization email phone")
      .populate("appointment");

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "No prescription found for this appointment.",
      });
    }

    return res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.error("Error fetching prescription:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while retrieving prescription.",
    });
  }
};

/**
 * Get Direct PDF Redirect
 * GET /api/prescriptions/:id/pdf
 */
export const getPrescriptionPdf = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await Prescription.findById(id);
    if (!prescription || !prescription.pdfUrl) {
      return res.status(404).json({
        success: false,
        message: "Prescription PDF not found.",
      });
    }

    return res.redirect(prescription.pdfUrl);
  } catch (error) {
    console.error("Error fetching prescription PDF:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load prescription PDF.",
    });
  }
};
