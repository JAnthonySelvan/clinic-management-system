import api from "../../services/axios";

export const getAllServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

export const getServiceBySlug = async (slug) => {
  const response = await api.get(`/services/${slug}`);
  return response.data;
};
