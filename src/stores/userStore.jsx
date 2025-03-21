import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import userApi from "../api/authApi";
import postApi from "../api/postApi";
import profileApi from "../api/profileApi";
import axios from "axios";
import { createAlert } from "../utils/createAlert";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      isLoading: false,
      googleLoginSuccessful: false, // Flag to track Google login success
      currentUser: null,
      posts: [],
      userPublicInfo: [],
      // Get the current user
      getCurrentUser: () => get().user,

      // Login action
      actionLogin: async (input) => {
        set({ isLoading: true });

        try {
          const { data } = await userApi.actionLogin(input);
          set({ token: data.token, user: data.user });
          return { token: data.token, user: data.user };
        } catch (error) {
          // console.error("Login Error:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Register action
      actionRegister: async (input) => {
        try {
          await userApi.actionRegister(input);
        } catch (error) {
          console.error("Registration Error:", error);
          throw error;
        }
      },

      // Fetch current user data
      actionGetMe: async () => {
        set({ isLoading: true });

        try {
          const { data } = await userApi.actionCurrentUser();
          set({ user: data.user });
          return { user: data.user };
        } catch (error) {
          console.error("Fetch User Error:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      actionGetMeOrGoogleLogin: async () => {
        set({ isLoading: true });

        try {
          // Try to get the current user
          const { data } = await userApi.actionCurrentUser();
          set({ user: data.user });
          return { user: data.user };
        } catch (error) {
          console.warn("Fetching user failed, trying Google login...");
          try {
            const url = `http://localhost:8899/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });

            if (data.user) {
              set({ user: data.user, googleLoginSuccessful: true });
              return { user: data.user };
            }
          } catch (googleError) {
            console.error("Google Login Error:", googleError);
            throw googleError;
          }
        } finally {
          set({ isLoading: false });
        }
      },

      // Logout action
      actionLogout: async () => {
        try {
          await axios.get("http://localhost:8899/auth/logout", {
            withCredentials: true,
          });
          set({ token: "", user: null, googleLoginSuccessful: false });
          localStorage.removeItem("state");
        } catch (error) {
          console.error("Logout Error:", error);
        }
      },

      // Update profile photo
      actionUpdateProfileImage: async (input) => {
        set({ isLoading: true });
        try {
          const { data } = await profileApi.actionUpdateProfileImage(input);
          // console.log("***", input)
          set({ user: data });
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
      // Update profile information
      actionUpdateProfileInfo: async (input) => {
        set({ isLoading: true });
        try {
          const { data } = await profileApi.actionUpdateProfileInfo(input);
          // console.log(data)
          set({ user: data });
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
      actionGetUserPosts: async (userId) => {
        set({ isLoading: true });
        try {
          const { data } = await profileApi.actionGetUserPosts(userId);
          set({ posts: data.post })
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
      actionDeletePost: async (id) => {
        set({ isLoading: true });
        try {
          const res = await postApi.actionDeletePost(id);
          set((state) => ({
            posts: Array.isArray(state.posts)
              ? state.posts.filter((el) => el.id !== id)
              : [],
          }));
        } catch (error) {
          const errorMsg = error?.response?.data?.message;
          createAlert("info", errorMsg);
        } finally {
          set({ isLoading: false });
        }
      },
      actionGetUserInfoForDashboard: async (userId) => {
        set({ isLoading: true });
        try {
          const { data } = await profileApi.actionGetUserInfoForDashboard(userId);
          set({ userPublicInfo: data })
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }), // Persist only token
    }
  )
);

export default useUserStore;
