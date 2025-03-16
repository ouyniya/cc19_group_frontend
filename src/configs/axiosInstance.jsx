// Request interceptor: Automatically attaches the token to requests
import axios from "axios";
import useUserStore from "../stores/userStore";

const baseURL = "http://localhost:8899";
axios.defaults.baseURL = baseURL;

// Function to get access token from Zustand store
const getAccessToken = () => {
  return useUserStore.getState().token;
};

// Request interceptor: Automatically attaches the token to every request
axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handles 401 Unauthorized errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useUserStore.getState().actionLogout(); 
      // window.location.assign("/"); 
    }
    return Promise.reject(error);
  }
);

export { axios, getAccessToken };
