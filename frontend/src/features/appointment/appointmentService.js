import api from "../../services/axios";

export const bookAppointment = async (appointmentData) => {
  const response = await api.post("/appointments", appointmentData);
  return response.data;
};

export const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

export const updateAppointmentStatus = async (id, status, rejectionReason) => {
  const payload = { status };
  if (rejectionReason) payload.rejectionReason = rejectionReason;
  const response = await api.patch(`/appointments/${id}/status`, payload);

  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};

export const getDoctorAppointments = async () => {
  const response = await api.get("/appointments/doctor");
  return response.data;
};

export const trackAppointmentByPhone = async (phone) => {
  const response = await api.get("/appointments/track", {
    params: { phone },
  });
  return response.data;
};

