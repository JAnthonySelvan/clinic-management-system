import User from "../models/User.mjs";
import ChatLog from "../models/ChatLog.mjs";
import { generateGeminiContent } from "../config/gemini.mjs";

// ---------------------------------------------------------------------------
// Red-flag detection — this NEVER depends on the LLM. It runs first, always,
// on every message, and short-circuits straight to an emergency response.
// ---------------------------------------------------------------------------
const RED_FLAG_PATTERNS = [
  /chest pain/i,
  /can'?t breathe|difficulty breathing|shortness of breath/i,
  /severe bleeding|won'?t stop bleeding/i,
  /stroke|face drooping|slurred speech|numb(ness)? (on )?one side/i,
  /suicid|kill myself|end my life|want to die/i,
  /unconscious|unresponsive|passed out/i,
  /severe allergic reaction|anaphylaxis|throat closing/i,
  /overdose|poison(ed|ing)/i,
  /seizure/i,
  /heavy bleeding during pregnancy|water broke/i,
];

const isRedFlag = (message) => RED_FLAG_PATTERNS.some((re) => re.test(message));

const EMERGENCY_RESPONSE = {
  reply:
    "This sounds like it could be a medical emergency. Please call emergency services or go to the nearest emergency room immediately — don't wait for an appointment.",
  readyToRecommend: false,
  redFlag: true,
  specialty: null,
  urgency: "emergency",
  doctors: [],
};

// ---------------------------------------------------------------------------
// Build the system prompt dynamically from real specialties in the DB, so
// Gemini can only ever recommend departments the clinic actually has.
// ---------------------------------------------------------------------------
const buildSystemPrompt = (availableSpecialties) => `
You are a triage assistant for Saviours Clinic. Your ONLY job is to have a short,
friendly conversation (2-4 turns) asking clarifying questions about the patient's
symptoms, then recommend which department they should book with.

STRICT RULES:
- NEVER name a specific diagnosis or condition.
- NEVER suggest medications, dosages, or treatment steps.
- NEVER claim certainty about what is wrong.
- Ask at most 1-2 clarifying questions before making a recommendation — don't
  drag the conversation out.
- Only recommend from this exact list of available specialties: ${availableSpecialties.join(", ")}.
- If the symptoms genuinely don't need a specialist, recommend "General Physician".

RESPONSE FORMAT — you must respond with ONLY valid JSON, no markdown, no
commentary outside the JSON, matching exactly this shape:
{
  "reply": "<the conversational message to show the patient>",
  "readyToRecommend": <true if you have enough info to recommend a specialty, false if you still need to ask a clarifying question>,
  "specialty": "<one of the exact specialty names above, or null if not ready yet>",
  "urgency": "<one of: routine, soon, urgent>"
}

Examples:
- If the user just says "I have a headache", you likely need one more clarifying
  question (how long, any other symptoms) before readyToRecommend is true.
- Once you have enough info, set readyToRecommend true, fill in specialty and
  urgency, and make "reply" a short warm summary + recommendation, always ending
  with a version of: "I'd recommend booking with our ${""}[specialty] team — a doctor can properly evaluate this during your visit."
`.trim();

const SPECIALTY_ALIASES = {
  cardiology: "Cardiologist",
  cardiologist: "Cardiologist",
  heart: "Cardiologist",
  cardiac: "Cardiologist",

  dermatology: "Dermatologist",
  dermatologist: "Dermatologist",
  skin: "Dermatologist",

  neurology: "Neurologist",
  neurologist: "Neurologist",
  brain: "Neurologist",
  nerve: "Neurologist",
  nerves: "Neurologist",

  orthopedics: "Orthopedic",
  orthopedic: "Orthopedic",
  orthopedist: "Orthopedic",
  bone: "Orthopedic",
  bones: "Orthopedic",
  joint: "Orthopedic",
  joints: "Orthopedic",

  pediatrics: "Pediatrician",
  pediatrician: "Pediatrician",
  pediatric: "Pediatrician",
  child: "Pediatrician",
  children: "Pediatrician",

  "general physician": "General Physician",
  general: "General Physician",
  "general medicine": "General Physician",
  gp: "General Physician",

  ophthalmology: "Ophthalmologist",
  ophthalmologist: "Ophthalmologist",
  "eye care": "Ophthalmologist",
  eye: "Ophthalmologist",
  eyes: "Ophthalmologist",

  ent: "ENT Specialist",
  "ent specialist": "ENT Specialist",
  "ear nose throat": "ENT Specialist",

  dentist: "Dentist",
  dentistry: "Dentist",
  dental: "Dentist",
};

// ---------------------------------------------------------------------------
// Cross-reference the recommended specialty against REAL active doctors.
// Handles alias lookup, case/whitespace normalization, direct/stem matching,
// and logs a warning when falling back to General Physician.
// ---------------------------------------------------------------------------
const findMatchingDoctors = (parsedSpecialty, activeDoctors) => {
  if (!parsedSpecialty || typeof parsedSpecialty !== "string") return [];

  const rawSpecialty = parsedSpecialty.toLowerCase().trim();
  const mappedAlias = SPECIALTY_ALIASES[rawSpecialty];
  const targetSpec = mappedAlias || parsedSpecialty.trim();
  const normalizedTarget = targetSpec.toLowerCase().trim();

  // 1. Direct normalized match against mapped alias or raw specialty
  let matched = activeDoctors.filter((d) => {
    const docSpec = d.specialization?.toLowerCase().trim() || "";
    return docSpec === normalizedTarget || docSpec === rawSpecialty;
  });

  // 2. Substring / stem match if direct match found no active doctors
  if (matched.length === 0) {
    matched = activeDoctors.filter((d) => {
      const docSpec = d.specialization?.toLowerCase().trim() || "";
      return (
        docSpec.includes(normalizedTarget) ||
        normalizedTarget.includes(docSpec)
      );
    });
  }

  // Map to clean client objects
  let result = matched.map((d) => ({
    id: d._id,
    fullName: d.fullName,
    specialization: d.specialization,
    qualification: d.qualification,
    experience: d.experience,
    profileImage: d.profileImage,
  }));

  // 3. Fallback to General Physician if no active specialist found
  if (result.length === 0) {
    console.warn(
      `[Assistant Triage Warning] Specialty matching failed for "${parsedSpecialty}" (raw: "${rawSpecialty}", target: "${normalizedTarget}"). Falling back to General Physician.`,
    );

    result = activeDoctors
      .filter((d) => d.specialization?.toLowerCase().includes("general"))
      .map((d) => ({
        id: d._id,
        fullName: d.fullName,
        specialization: d.specialization,
        qualification: d.qualification,
        experience: d.experience,
        profileImage: d.profileImage,
      }));
  }

  return result;
};

// ---------------------------------------------------------------------------
// POST /api/assistant/chat
// ---------------------------------------------------------------------------
export const chatWithAssistant = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // 1. Red-flag check ALWAYS runs first, regardless of Gemini's availability.
    if (isRedFlag(message)) {
      try {
        await ChatLog.create({
          userMessage: message,
          isEmergency: true,
          urgencyLevel: "emergency",
          ipAddress: req.ip || req.headers["x-forwarded-for"] || null,
        });
      } catch (logErr) {
        console.error("Failed to persist ChatLog:", logErr.message);
      }

      return res.status(200).json({
        success: true,
        data: EMERGENCY_RESPONSE,
      });
    }

    // 2. Pull the real, currently-active specialties from the DB so Gemini's
    //    recommendations are always bookable, never hallucinated.
    const activeDoctors = await User.find({
      role: "doctor",
      isActive: true,
    }).select("fullName specialization qualification experience profileImage");

    const availableSpecialties = [
      ...new Set(activeDoctors.map((d) => d.specialization).filter(Boolean)),
    ];

    if (availableSpecialties.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          reply:
            "I'm unable to check doctor availability right now. Please call the clinic directly or use the appointment form.",
          readyToRecommend: false,
          redFlag: false,
          specialty: null,
          urgency: "routine",
          doctors: [],
        },
      });
    }

    const systemPrompt = buildSystemPrompt(availableSpecialties);

    // 3. Call Gemini in strict JSON mode.
    let raw;
    try {
      raw = await generateGeminiContent(systemPrompt, message, conversationHistory, {
        jsonMode: true,
      });
    } catch (geminiError) {
      console.error("Gemini call failed:", geminiError.message);
      return res.status(200).json({
        success: true,
        data: {
          reply:
            "I'm having trouble processing that right now. You're welcome to browse our doctors directly, or try again in a moment.",
          readyToRecommend: false,
          redFlag: false,
          specialty: null,
          urgency: "routine",
          doctors: [],
        },
      });
    }

    // 4. Parse Gemini's JSON response defensively
    let parsed;
    try {
      const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```$/, "");
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON:", raw);
      return res.status(200).json({
        success: true,
        data: {
          reply:
            "Could you rephrase that? I want to make sure I understand your symptoms correctly.",
          readyToRecommend: false,
          redFlag: false,
          specialty: null,
          urgency: "routine",
          doctors: [],
        },
      });
    }

    // 5. Cross-reference the recommended specialty against REAL doctors.
    let matchedDoctors = [];
    if (parsed.readyToRecommend && parsed.specialty) {
      matchedDoctors = findMatchingDoctors(parsed.specialty, activeDoctors);
    }

    // Persist ChatLog for analytics and review
    try {
      await ChatLog.create({
        userMessage: message,
        isEmergency: false,
        recommendedSpecialty: parsed.specialty || null,
        urgencyLevel: ["emergency", "urgent", "soon", "routine"].includes(parsed.urgency)
          ? parsed.urgency
          : "routine",
        ipAddress: req.ip || req.headers["x-forwarded-for"] || null,
      });
    } catch (logErr) {
      console.error("Failed to persist ChatLog:", logErr.message);
    }

    return res.status(200).json({
      success: true,
      data: {
        reply: parsed.reply || "Could you tell me more about your symptoms?",
        readyToRecommend: Boolean(parsed.readyToRecommend),
        redFlag: false,
        specialty: parsed.specialty || null,
        urgency: parsed.urgency || "routine",
        doctors: matchedDoctors,
      },
    });
  } catch (error) {
    console.error("Assistant controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong with the health assistant",
    });
  }
};
