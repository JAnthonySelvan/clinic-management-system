import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach Bearer token from localStorage and x-otp-token from sessionStorage if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const otpToken = sessionStorage.getItem("otpToken");
    if (otpToken) {
      config.headers["x-otp-token"] = otpToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
