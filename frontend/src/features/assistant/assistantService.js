import api from "../../services/axios";

export const sendAssistantMessage = async (message, conversationHistory) => {
  const response = await api.post("/assistant/chat", {
    message,
    conversationHistory,
  });
  return response.data;
};