import api from "../../services/axios";

export const submitContactMessage = async (contactData) => {
  const response = await api.post("/contact", contactData);
  return response.data;
};

// Admin: fetch all contact messages
export const getContactMessages = async () => {
  const response = await api.get("/contact");
  return response.data;
};

// Admin: delete a contact message
export const deleteContactMessage = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};
