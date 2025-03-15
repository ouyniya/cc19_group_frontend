import { axios, getAccessToken } from "../configs/axiosInstance";

const commentApi = {};

commentApi.actionGetComments = async (postId) => {
  return axios.get(`/api/comments/${postId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

commentApi.actionAddComment = async (body) => {
  return axios.post(`/api/comments/`, body, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

commentApi.actionUpdateComment = async (commentId, body) => {
  return axios.put(`/api/comments/${commentId}`, body, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

commentApi.actionDeleteComment = async (commentId, body) => {
  return axios.delete(`/api/comments/${commentId}`, body, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

commentApi.actionAddReply = async (body) => {
    return axios.post(`/api/comments/`, body, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

export default commentApi;
