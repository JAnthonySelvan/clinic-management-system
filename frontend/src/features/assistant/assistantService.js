import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Send symptom message to health assistant triage endpoint
 * @param {string} message - User symptom input
 * @param {Array} conversationHistory - Previous chat turns
 */
export const sendAssistantMessage = async (message, conversationHistory = []) => {
  const response = await axios.post(
    `${API_URL}/assistant/chat`,
    {
      message,
      conversationHistory,
    },
    {
      withCredentials: true,
    },
  );
  return response.data;
};
