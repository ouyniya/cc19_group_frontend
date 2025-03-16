import { axios, getAccessToken } from "../configs/axiosInstance";

const adminApi = {};

adminApi.actionAllUsers = async () => {
  return axios.get("/api/admin/users", {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

adminApi.actionAllViews = async () => {
  return axios.get("/api/track-view", {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

adminApi.actionTopDestination = async () => {
  return axios.get("/api/track-view/places", {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

export default adminApi;
