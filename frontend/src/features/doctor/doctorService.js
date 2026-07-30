import api from "../../services/axios";

export const getDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

export const createDoctor = async (doctorData) => {
  const response = await api.post("/doctors", doctorData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await api.put(`/doctors/${id}`, doctorData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await api.delete(`/doctors/${id}`);
  return response.data;
};
