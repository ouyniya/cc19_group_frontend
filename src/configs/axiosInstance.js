// import axios from "axios";
// import useUserStore from "../stores/userStore";

// const baseURL = "http://localhost:8899";

// axios.defaults.baseURL = baseURL;

// //get token จาก Local storage

// const getAccessToken = () => {
//   return useUserStore.getState().token;
// };

// //จังหวะที่อยู่ระหว่าง front กับ back
// // ขาเข้า request
// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// //ขาออก res

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       useUserStore.getState().actionLogout();
//       window.location.assign("/");
//     }
//     return Promise.reject(error);
//   }
// );

/////

// Request interceptor: Automatically attaches the token to requests
import axios from "axios";
import useUserStore from "../stores/userStore";

const baseURL = "http://localhost:8899";
axios.defaults.baseURL = baseURL;

// Function to get access token from Zustand store
const getAccessToken = () => {
  return useUserStore.getState().token;
};

// Request interceptor: Automatically attaches the token to every request
axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handles 401 Unauthorized errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useUserStore.getState().actionLogout(); // Logout user on 401 error
      window.location.assign("/"); // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export { axios, getAccessToken };
