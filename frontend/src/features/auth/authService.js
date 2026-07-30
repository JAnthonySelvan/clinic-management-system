import api from "../../services/axios";

// Login (Admin & Doctor)
export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

// Get Current User
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Update Profile (currently logged-in user)
// NOTE: assumes a PATCH /auth/profile endpoint that accepts multipart/form-data
// (for the profile image) — adjust the path to match your actual route.
export const updateProfile = async (profileData) => {
  const response = await api.patch("/auth/profile", profileData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Change Password (currently logged-in user)
export const changePassword = async (passwordData) => {
  const response = await api.post("/auth/change-password", passwordData);
  return response.data;
};
