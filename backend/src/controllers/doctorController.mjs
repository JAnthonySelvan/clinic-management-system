import { validationResult } from "express-validator";
import User from "../models/User.mjs";
import {
  uploadImageBuffer,
  DEFAULT_PROFILE_IMAGE,
} from "../utils/uploadToCloudinary.mjs";

// @desc Create Doctor
// @route POST /api/doctors
// @access Admin
export const createDoctor = async (req, res) => {
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
      fullName,
      email,
      password,
      phone,
      specialization,
      qualification,
      experience,
    } = req.body;

    const existingDoctor = await User.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists",
      });
    }

    // Try to upload image if provided, otherwise fall back to static image
    let profileImage = DEFAULT_PROFILE_IMAGE;

    if (req.file) {
      try {
        profileImage = await uploadImageBuffer(req.file.buffer, "doctors");
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr.message);
        // Keep default image instead of failing the whole request
        profileImage = DEFAULT_PROFILE_IMAGE;
      }
    }

    const doctor = await User.create({
      fullName,
      email,
      password,
      phone,
      specialization,
      qualification,
      experience,
      profileImage,
      role: "doctor",
    });

    doctor.password = undefined;

    return res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get All Doctors
// @route GET /api/doctors
// @access Admin
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });

    return res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update Doctor
// @route PUT /api/doctors/:id
// @access Admin
export const updateDoctor = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      try {
        updateData.profileImage = await uploadImageBuffer(
          req.file.buffer,
          "doctors",
        );
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr.message);
        // Don't overwrite existing image if upload fails
        delete updateData.profileImage;
      }
    }

    const doctor = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "doctor",
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Delete Doctor
// @route DELETE /api/doctors/:id
// @access Admin
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await User.findOneAndDelete({
      _id: req.params.id,
      role: "doctor",
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
