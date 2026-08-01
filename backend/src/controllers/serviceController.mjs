import Service from "../models/Service.mjs";
import User from "../models/User.mjs";
import { ensureServicesSeeded } from "../config/serviceSeeder.mjs";

/**
 * @desc    Get all active clinic services
 * @route   GET /api/services
 * @access  Public
 */
export const getAllServices = async (req, res) => {
  try {
    await ensureServicesSeeded();

    const services = await Service.find({ isActive: true }).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Clinic services retrieved successfully",
      count: services.length,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching services",
    });
  }
};

/**
 * @desc    Get single service detail by slug + matched doctor specialists
 * @route   GET /api/services/:slug
 * @access  Public
 */
export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    await ensureServicesSeeded();

    const service = await Service.findOne({
      slug: slug.toLowerCase(),
      isActive: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: `Medical department for '${slug}' was not found or is currently inactive.`,
      });
    }

    // Extract stem for matching doctors (e.g., "Cardiology" -> "Cardi")
    const specStem = service.name.replace(
      /(ologist|ology|ist|y|ics|ian|al|care|medicine)$/i,
      "",
    );

    // Find active doctors matching department
    const doctors = await User.find({
      role: "doctor",
      isActive: true,
      specialization: new RegExp(specStem, "i"),
    }).select(
      "fullName specialization email phone profileImage experience bio consultationFee",
    );

    return res.status(200).json({
      success: true,
      message: "Service details fetched successfully",
      data: {
        ...service.toObject(),
        doctors: doctors || [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching service detail",
    });
  }
};
