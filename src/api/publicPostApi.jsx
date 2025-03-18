import { axios, getAccessToken } from "../configs/axiosInstance";

const publicPostApi = {};

publicPostApi.actionGetPostByPostId = async (postId) => {
  return axios.get(`/api/posts/each-posts/${postId}`);
};

export default publicPostApi;
