import { axios, getAccessToken } from "../configs/axiosInstance";

const filterApi = {};

filterApi.actionGetFilterPosts = async (queryParams) => {
  return axios.get(`/api/filter?${queryParams.toString()}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

export default filterApi;
