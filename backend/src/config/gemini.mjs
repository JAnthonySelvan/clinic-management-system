import dotenv from "dotenv";
dotenv.config();

// Ordered by preference: fast/cheap first, then a stronger fallback.
// Update this list here (in one place) whenever Google retires a model —
// avoids the "works today, 404s in 6 months" trap.
const CANDIDATE_MODELS = [
  "gemini-flash-lite-latest",
  "gemini-flash-latest",
  "gemini-3-flash-preview",
];

/**
 * Helper to call Gemini REST API securely on backend using process.env.GEMINI_API_KEY
 */
export const generateGeminiContent = async (
  systemPrompt,
  userMessage,
  conversationHistory = [],
  { jsonMode = false } = {},
) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY_MISSING");
  }

  // Format conversation history for Gemini REST API contents array
  const contents = [];

  // Add system prompt context as first user turn if present
  if (systemPrompt) {
    contents.push({
      role: "user",
      parts: [{ text: `SYSTEM INSTRUCTIONS:\n${systemPrompt}` }],
    });
    contents.push({
      role: "model",
      parts: [{ text: "Understood. I will strictly follow these system instructions." }],
    });
  }

  // Append conversation history
  if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
    // Limit to last 6 turns for context efficiency
    const recentHistory = conversationHistory.slice(-6);
    recentHistory.forEach((msg) => {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    });
  }

  // Append current user message
  contents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  const generationConfig = {
    temperature: 0.2, // Low temperature for strict adherence to system instructions
    maxOutputTokens: 500,
  };

  // Forces Gemini to return valid JSON matching our contract instead of
  // free-form prose we'd otherwise have to regex/guess our way through.
  if (jsonMode) {
    generationConfig.responseMimeType = "application/json";
  }

  const requestBody = JSON.stringify({ contents, generationConfig });

  let lastError = null;

  // Try each candidate model in order; only fall through to the next
  // on a 404 (model not found/retired) — real errors (bad key, quota,
  // malformed request) should surface immediately rather than retry-loop.
  for (const modelName of CANDIDATE_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (response.ok) {
      const data = await response.json();
      const candidateText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Please book a consultation so a doctor can properly evaluate your symptoms.";

      return candidateText;
    }

    const errorData = await response.json().catch(() => ({}));
    lastError = new Error(
      errorData.error?.message || `Gemini API returned status ${response.status}`,
    );

    // 404 = model not found/retired for this project — try the next candidate.
    // Anything else (401/403/429/500) — stop and surface it, retrying won't help.
    if (response.status !== 404) {
      console.error(`Gemini API Error (${modelName}):`, errorData);
      throw lastError;
    }

    console.warn(`Gemini model "${modelName}" unavailable (404), trying next candidate...`);
  }

  // All candidates exhausted
  console.error("All Gemini model candidates failed:", lastError?.message);
  throw lastError || new Error("No Gemini model candidates succeeded");
};
