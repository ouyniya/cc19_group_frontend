import { axios, getAccessToken } from "../configs/axiosInstance";

const mapApi = {};

mapApi.actionGetMapPost = async () => {
  return axios.get(`api/posts`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};


export default mapApi;
