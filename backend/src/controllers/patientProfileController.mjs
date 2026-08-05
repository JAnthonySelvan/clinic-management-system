import PatientProfile from "../models/PatientProfile.mjs";
import Appointment from "../models/Appointment.mjs";

/**
 * @desc    Get all family profiles for verified email
 * @route   GET /api/patient-profile/family
 * @access  Private (requireOtpVerified)
 */
export const getFamilyProfiles = async (req, res) => {
  try {
    const email = req.verifiedEmail;
    const familyProfiles = await PatientProfile.findFamilyByEmail(email);

    return res.status(200).json({
      success: true,
      data: familyProfiles,
    });
  } catch (error) {
    console.error("getFamilyProfiles error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch family profiles",
      error: error.message,
    });
  }
};

/**
 * @desc    Create or update a patient profile for verified email
 * @route   POST /api/patient-profile
 * @access  Private (requireOtpVerified)
 */
export const upsertPatientProfile = async (req, res) => {
  try {
    const email = req.verifiedEmail;
    const {
      relationship = "self",
      childLabel,
      fullName,
      age,
      gender,
      phone,
      bloodGroup,
      dob,
      address,
      city,
      state,
      pincode,
    } = req.body;

    if (!fullName || !age || !gender || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name, age, gender, and phone are required fields.",
      });
    }

    let profile;

    if (relationship === "child") {
      const cleanChildLabel = childLabel ? childLabel.trim() : null;
      if (cleanChildLabel) {
        profile = await PatientProfile.findOne({
          email,
          relationship: "child",
          childLabel: cleanChildLabel,
        });
      }

      if (profile) {
        // Update existing child profile
        profile.fullName = fullName.trim();
        profile.age = Number(age);
        profile.gender = gender;
        profile.phone = phone.trim();
        profile.bloodGroup = bloodGroup ? bloodGroup.trim() : profile.bloodGroup;
        profile.dob = dob ? new Date(dob) : profile.dob;
        profile.address = address ? address.trim() : profile.address;
        profile.city = city ? city.trim() : profile.city;
        profile.state = state ? state.trim() : profile.state;
        profile.pincode = pincode ? pincode.trim() : profile.pincode;

        await profile.save();
      } else {
        // Create new child profile
        profile = await PatientProfile.create({
          email,
          relationship: "child",
          childLabel: cleanChildLabel || `Child ${Date.now().toString().slice(-4)}`,
          fullName: fullName.trim(),
          age: Number(age),
          gender,
          phone: phone.trim(),
          bloodGroup: bloodGroup ? bloodGroup.trim() : null,
          dob: dob ? new Date(dob) : null,
          address: address ? address.trim() : null,
          city: city ? city.trim() : null,
          state: state ? state.trim() : null,
          pincode: pincode ? pincode.trim() : null,
        });
      }
    } else {
      // Non-child relationships: unique per relationship (self, father, mother, wife)
      profile = await PatientProfile.findOne({ email, relationship });

      if (profile) {
        profile.fullName = fullName.trim();
        profile.age = Number(age);
        profile.gender = gender;
        profile.phone = phone.trim();
        profile.bloodGroup = bloodGroup ? bloodGroup.trim() : profile.bloodGroup;
        profile.dob = dob ? new Date(dob) : profile.dob;
        profile.address = address ? address.trim() : profile.address;
        profile.city = city ? city.trim() : profile.city;
        profile.state = state ? state.trim() : profile.state;
        profile.pincode = pincode ? pincode.trim() : profile.pincode;

        await profile.save();
      } else {
        profile = await PatientProfile.create({
          email,
          relationship,
          fullName: fullName.trim(),
          age: Number(age),
          gender,
          phone: phone.trim(),
          bloodGroup: bloodGroup ? bloodGroup.trim() : null,
          dob: dob ? new Date(dob) : null,
          address: address ? address.trim() : null,
          city: city ? city.trim() : null,
          state: state ? state.trim() : null,
          pincode: pincode ? pincode.trim() : null,
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Patient profile saved successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("upsertPatientProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save profile.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all appointment history for family profiles under verified email
 * @route   GET /api/patient-profile/history
 * @access  Private (requireOtpVerified)
 */
export const getPatientAppointmentHistory = async (req, res) => {
  try {
    const email = req.verifiedEmail;

    // Get all profile IDs for this email
    const familyDocs = await PatientProfile.find({ email });
    const profileIds = familyDocs.map((doc) => doc._id);

    // Find appointments matching any of these profiles OR the patientEmail
    const appointments = await Appointment.find({
      $or: [
        { patientProfile: { $in: profileIds } },
        { patientEmail: email },
      ],
    })
      .populate("doctor", "name specialization avatar email phone")
      .populate("patientProfile")
      .sort({ appointmentDateTime: -1 });

    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("getPatientAppointmentHistory error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointment history.",
      error: error.message,
    });
  }
};
