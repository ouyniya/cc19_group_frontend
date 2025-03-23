import { axios, getAccessToken } from "../configs/axiosInstance";

const locationApi = {};

locationApi.actionGetProvince = async () => {
  return axios.get(`/api/location/province`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

locationApi.actionGetDistrict = async (provinceId) => {
  return axios.get(`/api/location/district?provinceId=${provinceId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

locationApi.actionGetTopProvinces = async () => {
  return axios.get(`/api/track-view/place/top/provinces`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
};

export default locationApi;
