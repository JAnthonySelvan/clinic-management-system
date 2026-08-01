import api from "../../services/axios";

export const getMySchedule = async () => {
  const response = await api.get("/schedule/my-schedule");
  return response.data;
};

export const updateWeeklyAvailability = async (weeklyAvailability) => {
  const response = await api.patch("/schedule/weekly-availability", {
    weeklyAvailability,
  });
  return response.data;
};

export const addBlockedDate = async (blockedDateData) => {
  const response = await api.post("/schedule/blocked-dates", blockedDateData);
  return response.data;
};

export const removeBlockedDate = async (dateId) => {
  const response = await api.delete(`/schedule/blocked-dates/${dateId}`);
  return response.data;
};

export const getDoctorAvailability = async (doctorId) => {
  const response = await api.get(`/schedule/doctor/${doctorId}`);
  return response.data;
};

export const getAdminLeaves = async () => {
  const response = await api.get("/schedule/admin/leaves");
  return response.data;
};

export const updateLeaveStatus = async (scheduleId, dateId, status) => {
  const response = await api.patch(
    `/schedule/admin/leaves/${scheduleId}/${dateId}`,
    { status },
  );
  return response.data;
};
