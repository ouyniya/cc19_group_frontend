import { axios, getAccessToken } from "../configs/axiosInstance";

const postApi = {};

postApi.actionAddPost = async (input) => {
  return axios.post(`/api/posts`, input, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

postApi.actionDeletePost = async (id) => {
  return axios.delete(`/api/posts/${id}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};
postApi.actionUpdatePost = async (input,id) => {
  return axios.put(`/api/posts/${id}`, input, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

postApi.actionGetEachPost = async (id) => {
  return axios.get(`/api/posts/each-posts/${id}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};


export default postApi;
