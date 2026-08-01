import dotenv from "dotenv";
dotenv.config();

/**
 * Helper to call Gemini REST API securely on backend using process.env.GEMINI_API_KEY
 * Tries supported models (gemini-3.5-flash, gemini-3-flash-preview, gemini-2.5-flash-lite, gemini-2.0-flash-lite, gemini-flash-latest) in sequence
 */
export const generateGeminiContent = async (systemPrompt, userMessage, conversationHistory = []) => {
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

  // Candidate supported models array in order of preference
  const candidateModels = [
    "gemini-3.5-flash",
    "gemini-3-flash-preview",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-flash-latest",
  ];

  let lastError = null;

  for (const modelName of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 500,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMsg = errorData?.error?.message || `Status ${response.status}`;
        console.warn(`Gemini model ${modelName} returned status ${response.status}:`, errMsg);
        lastError = new Error(errMsg);
        continue; // Try next supported candidate model
      }

      const data = await response.json();
      const candidateText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Please book a consultation so a doctor can properly evaluate your symptoms.";

      return candidateText;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to generate content from available Gemini models.");
};
