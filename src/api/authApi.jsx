import { axios, getAccessToken } from "../configs/axiosInstance";
const userApi = {};

// Register a new user
userApi.actionRegister = async (value) => {
  return axios.post("/api/auth/register", value);
};

// Login user and receive token
userApi.actionLogin = async (value) => {
  return axios.post("/api/auth/login", value);
};

// Google Login user and receive token
userApi.actionGoogleLogin = async (value) => {
  return axios.post("/api/auth/google", value);
};

// Fetch the current authenticated user
userApi.actionCurrentUser = async () => {
  return axios.get("/api/auth/current-user", {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

// New OTP endpoints
const API_URL = "http://localhost:8899/api";

userApi.verifyOTP = async (data) => {
  return axios.post(`${API_URL}/auth/verify-otp`, data);
};

userApi.resendOTP = async (data) => {
  return axios.post(`${API_URL}/auth/resend-otp`, data);
};

export default userApi;
