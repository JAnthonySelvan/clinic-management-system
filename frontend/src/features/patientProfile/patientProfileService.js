import api from "../../services/axios";

export const getFamilyProfiles = async () => {
  const response = await api.get("/patient-profile/family");
  return response.data;
};

export const upsertProfile = async (profileData) => {
  const response = await api.post("/patient-profile", profileData);
  return response.data;
};

export const getPatientHistory = async () => {
  const response = await api.get("/patient-profile/history");
  return response.data;
};

const patientProfileService = {
  getFamilyProfiles,
  upsertProfile,
  getPatientHistory,
};

export default patientProfileService;
