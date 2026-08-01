import { generateGeminiContent } from "../config/gemini.mjs";
import User from "../models/User.mjs";
import ChatLog from "../models/ChatLog.mjs";

// Red-flag emergency keyword patterns
const RED_FLAG_KEYWORDS = [
  "chest pain",
  "can't breathe",
  "cannot breathe",
  "difficulty breathing",
  "shortness of breath",
  "stroke",
  "numbness on one side",
  "slurred speech",
  "face drooping",
  "severe bleeding",
  "uncontrolled bleeding",
  "suicidal",
  "suicide",
  "end my life",
  "want to die",
  "severe allergic reaction",
  "anaphylaxis",
  "unconscious",
  "fainted and not waking",
  "head trauma",
  "coughing blood",
  "poisoning",
  "overdose",
];

const checkRedFlagSymptoms = (message = "") => {
  const normalized = message.toLowerCase();
  return RED_FLAG_KEYWORDS.some((keyword) => normalized.includes(keyword));
};

// Fallback symptom-to-specialty rules if Gemini API key is not configured or offline
const FALLBACK_SYMPTOM_MAP = [
  {
    keywords: ["tooth", "teeth", "gum", "dental", "cavity", "molar", "dentist"],
    specialty: "Dental Care",
    reply: "Based on your dental symptoms, we recommend consulting our Dental Care department. Please book a consultation so a doctor can properly evaluate this.",
  },
  {
    keywords: ["heart", "chest", "cardio", "bp", "blood pressure", "palpitation", "pulse"],
    specialty: "Cardiology",
    reply: "Your symptoms indicate heart or cardiovascular concerns. We recommend consulting our Cardiology department. Please book a consultation so a doctor can properly evaluate this.",
  },
  {
    keywords: ["headache", "migraine", "brain", "nerve", "seizure", "dizz", "vertigo", "memory"],
    specialty: "Neurology",
    reply: "For neurological or head discomfort, we recommend consulting our Neurology department. Please book a consultation so a doctor can properly evaluate this.",
  },
  {
    keywords: ["child", "baby", "infant", "pediatr", "toddler", "kid"],
    specialty: "Pediatrics",
    reply: "For pediatric or child health concerns, we recommend consulting our Pediatrics department. Please book a consultation so a doctor can properly evaluate this.",
  },
  {
    keywords: ["bone", "joint", "knee", "fracture", "spine", "back pain", "ortho", "muscle"],
    specialty: "Orthopedics",
    reply: "For joint, bone, or musculoskeletal pain, we recommend consulting our Orthopedics department. Please book a consultation so a doctor can properly evaluate this.",
  },
  {
    keywords: ["skin", "rash", "acne", "itch", "eczema", "derma"],
    specialty: "Dermatology",
    reply: "For skin or dermatological conditions, we recommend consulting our Dermatology department. Please book a consultation so a doctor can properly evaluate this.",
  },
  {
    keywords: ["fever", "cough", "cold", "flu", "stomach", "fatigue", "vomit", "weak", "throat"],
    specialty: "General Medicine",
    reply: "For general symptoms or wellness concerns, we recommend consulting our General Medicine department. Please book a consultation so a doctor can properly evaluate this.",
  },
];

const getFallbackRecommendation = (message = "") => {
  const normalized = message.toLowerCase();
  for (const rule of FALLBACK_SYMPTOM_MAP) {
    if (rule.keywords.some((k) => normalized.includes(k))) {
      return {
        specialty: rule.specialty,
        reply: rule.reply,
      };
    }
  }
  return {
    specialty: "General Medicine",
    reply: "Thank you for describing your symptoms. We recommend consulting our General Medicine department for an initial evaluation. Please book a consultation so a doctor can properly evaluate this.",
  };
};

export const handleChatAssistant = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || "unknown";

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const trimmedMessage = message.trim();

    // 1. HARD-CODED RED-FLAG CHECK (Bypasses LLM completely for safety)
    if (checkRedFlagSymptoms(trimmedMessage)) {
      await ChatLog.create({
        userMessage: trimmedMessage,
        isEmergency: true,
        urgencyLevel: "emergency",
        ipAddress,
      });

      return res.status(200).json({
        success: true,
        isEmergency: true,
        message:
          "CRITICAL SAFETY ALERT: The symptoms you described may indicate a life-threatening medical emergency requiring immediate, urgent care.",
        emergencyContact: "+91 98765 43210",
        action:
          "Please call emergency services immediately (+91 98765 43210 or local emergency 112) or visit the nearest hospital emergency room without delay.",
      });
    }

    // 2. Fetch active doctors and available specializations from database
    const activeDoctors = await User.find({ role: "doctor", isActive: { $ne: false } }).select(
      "_id fullName specialization experience consultationFee",
    );

    const availableSpecialties = [
      ...new Set(activeDoctors.map((doc) => doc.specialization)),
    ];

    const specialtyListString =
      availableSpecialties.length > 0
        ? availableSpecialties.join(", ")
        : "Cardiology, Neurology, Pediatrics, Dental Care, General Medicine, Orthopedics";

    let geminiReply = null;
    let matchedSpecialty = null;
    let matchedDoctor = null;
    let urgencyLevel = "routine";

    // 3. Try Gemini API first if configured
    try {
      const systemPrompt = `You are a friendly, expert medical triage assistant for Saviours Clinic.

Your role is to interact with the patient, analyze their symptoms, and recommend the right clinic department or doctor (Available specialties: ${specialtyListString}).

CONVERSATION GUIDELINES:
- If the patient's initial message is brief or lacks detail (e.g., "I have a fever" or "headache"), interact naturally: acknowledge their symptoms empathetically and ask 1-2 brief clarifying questions to analyze the situation deeper before making your recommendation.
- When you have enough symptom context or when the patient provides detailed symptoms, give a clear recommendation on which clinic specialty (Dental Care, Cardiology, Neurology, Pediatrics, Orthopedics, Dermatology, General Medicine) they should consult.
- When giving a recommendation, explicitly use the phrase: "We recommend consulting our [Specialty] department" or "You should book a consultation with our [Specialty] department".
- NEVER state a specific medical disease/diagnosis, NEVER prescribe medications or dosages, and NEVER describe self-treatment procedures.
- Always end recommendations with: "Please book a consultation so a doctor can properly evaluate this."
- If symptoms sound severe or emergency-related, direct them to call emergency services (+91 98765 43210) immediately.`;

      geminiReply = await generateGeminiContent(
        systemPrompt,
        trimmedMessage,
        conversationHistory,
      );

      const lowerReply = geminiReply.toLowerCase();

      // Check if Gemini is giving an explicit recommendation or just asking clarifying questions
      const isGivingRecommendation =
        lowerReply.includes("recommend") ||
        lowerReply.includes("consult") ||
        lowerReply.includes("specialist") ||
        lowerReply.includes("department") ||
        lowerReply.includes("book");

      if (isGivingRecommendation) {
        for (const spec of availableSpecialties) {
          if (lowerReply.includes(spec.toLowerCase())) {
            matchedSpecialty = spec;
            matchedDoctor = activeDoctors.find((d) => d.specialization === spec);
            break;
          }
        }

        // If Gemini recommended a department but used a generic term, map from symptom keywords
        if (!matchedSpecialty) {
          const fallback = getFallbackRecommendation(trimmedMessage);
          matchedSpecialty = fallback.specialty;
          matchedDoctor = activeDoctors.find((d) => d.specialization === matchedSpecialty);
        }
      }

      if (lowerReply.includes("urgent") || lowerReply.includes("prompt") || lowerReply.includes("immediately")) {
        urgencyLevel = "urgent";
      } else if (lowerReply.includes("soon") || lowerReply.includes("few days")) {
        urgencyLevel = "soon";
      }
    } catch (apiError) {
      console.warn("⚠️ Gemini API call skipped or failed, using smart triage fallback:", apiError.message);

      // Fallback rule engine
      const fallbackResult = getFallbackRecommendation(trimmedMessage);
      geminiReply = fallbackResult.reply;
      matchedSpecialty = fallbackResult.specialty;
      matchedDoctor = activeDoctors.find((d) => d.specialization === matchedSpecialty) || activeDoctors[0];
    }

    // 4. Log conversation (privacy compliant)
    await ChatLog.create({
      userMessage: trimmedMessage,
      isEmergency: false,
      recommendedSpecialty: matchedSpecialty,
      urgencyLevel,
      ipAddress,
    });

    // 5. Format structured recommendation card ONLY if Gemini gives a doctor/specialty suggestion
    let recommendation = null;
    if (matchedSpecialty) {
      const docObj = matchedDoctor || activeDoctors.find((d) => d.specialization === matchedSpecialty);
      let formattedDocName = `${matchedSpecialty} Specialist`;
      if (docObj && docObj.fullName) {
        const cleanName = docObj.fullName.replace(/^Dr\.\s*/i, "").trim();
        formattedDocName = `Dr. ${cleanName}`;
      }

      recommendation = {
        specialty: matchedSpecialty,
        doctorName: formattedDocName,
        doctorId: docObj ? docObj._id : null,
        rawDoctorObj: docObj || null,
        urgency: urgencyLevel,
        description: `Recommended department for ${matchedSpecialty.toLowerCase()} evaluation.`,
      };
    }

    return res.status(200).json({
      success: true,
      isEmergency: false,
      reply: geminiReply,
      recommendation,
    });
  } catch (error) {
    console.error("Error in handleChatAssistant:", error);
    return res.status(500).json({
      success: false,
      message: "Our health assistant is temporarily unavailable. Please try again or call our clinic directly.",
    });
  }
};
