import { axios, getAccessToken } from "../configs/axiosInstance";

const wishlistExample = {};

wishlistExample.actionGetWishlist = async (userId) => {
  return axios.get(`/api/wishlists/user/${userId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};
wishlistExample.actionDeleteWishlist = async (wishlistId) => {
  return axios.delete(`/api/wishlists/${wishlistId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

export default wishlistExample;
