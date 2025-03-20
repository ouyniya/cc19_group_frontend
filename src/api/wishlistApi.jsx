import { axios, getAccessToken } from "../configs/axiosInstance";

const wishlistApi = {};

wishlistApi.actionGetWishlist = async (userId) => {
  return axios.get(`/api/wishlists/user/${userId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};
wishlistApi.actionDeleteWishlist = async (wishlistId) => {
  return axios.delete(`/api/wishlists/${wishlistId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};
wishlistApi.actionAddWishlist = async (input) => {
  return axios.post(`/api/wishlists/`, input, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

export default wishlistApi;
