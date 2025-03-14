import axios from "axios";
import useUserStore from "../stores/userStore";

const baseURL = "http://localhost:8899";

axios.defaults.baseURL = baseURL;

//get token จาก Local storage

const getAccessToken = () => {
  return useUserStore.getState().token;
};

//จังหวะที่อยู่ระหว่าง front กับ back
// ขาเข้า request
axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//ขาออก res

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      useUserStore.getState().actionLogout();
      window.location.assign("/");
    }
    return Promise.reject(error);
  }
);

export default axios;
