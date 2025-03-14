// import { create } from "zustand";
// import axios from "axios";
// import { actionLogin } from "../api/authApi";
// import { persist } from "zustand/middleware";

// // step 1 create store
// const authStore = (set, get) => ({
//   user: [],
//   token: null,
//   actionLoginWithZustand: async (value) => {
//     // login code
//     try {
//       const res = await actionLogin(value);
//       const { payload, token } = res.data;

//       set({ user: payload, token: token });

//       return {
//         success: true,
//         role: payload.role,
//         username: payload.username,
//       };
//     } catch (error) {
//       // console.log(error)
//       return { success: false, error: error.response.data.message };
//     }
//   },
//   actionLogout: () => {
//     set({ user: [], token: null });
//   },
//   handleGoogleSuccess: async (response) => {
//     try {
//       // console.log(response)
//       // If using a Google Sign-In package, you will get an ID token as response
//       const googleAPIUrl = "?access_token=";
//       const googleToken = response.credential;
//       // const res = await axios.post('http://localhost:8899/api/auth/google/callback', {
//       //   token: response.credential,
//       //   withCredentials: true  // Make sure cookies are included
//       // });

//       // const data = res.data;
//       // useAuthStores.getState().login(data.user, data.token); // Call login to store data
//     } catch (err) {
//       console.error("Login failed", err);
//     }
//   },
// });

// // step 2 export store
// const useAuthStores = create(persist(authStore, { name: "auth-store" }));

// export default useAuthStores;
