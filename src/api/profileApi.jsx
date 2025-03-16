import { axios, getAccessToken } from "../configs/axiosInstance";

const profileApi = {};

profileApi.actionUpdateProfileInfo = async (input) => {
  return axios.put("/api/profile/profile-info", input, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

profileApi.actionUpdateProfileImage = async (input) => {
  return axios.put("/api/profile/profile-image", input, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

export default profileApi;
