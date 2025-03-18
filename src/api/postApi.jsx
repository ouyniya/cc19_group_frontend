import { axios, getAccessToken } from "../configs/axiosInstance";

const postApi = {};

postApi.actionAddPost = async (input) => {
  return axios.post(`/api/posts`, input, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};


export default postApi;
