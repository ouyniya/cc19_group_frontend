import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import userApi from "../api/authApi";
import axios from "axios";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      isLoading: false,

      // Get the current user
      getCurrentUser: () => get().user,

      // Login action
      actionLogin: async (input) => {
        set({ isLoading: true });

        try {
          const { data } = await userApi.actionLogin(input);
          set({ token: data.token });
          return { token: data.token };
        } catch (error) {
          // console.error("Login Error:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Google Login
      actionGoogleLogin: async () => {
        try {
          const url = `http://localhost:8899/auth/login/success`;
          const { data } = await axios.get(url, { withCredentials: true });

          if (data.user) {
            set({ user: data.user });
          }
        } catch (error) {
          console.error("Google Login Error:", error);
          throw error;
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

      // Logout action
      actionLogout: async () => {
        try {
          await axios.get("http://localhost:8899/auth/logout", { withCredentials: true });
          set({ token: "", user: null });
          localStorage.removeItem("state");
        } catch (error) {
          console.error("Logout Error:", error);
        }
      },

      // Update profile photo
      actionUpdateProfile: async (input) => {
        try {
          const { data } = await userApi.updateProfile(input);
          set({ user: data.updateUser });
        } catch (error) {
          console.error("Profile Update Error:", error);
          throw error;
        }
      },

      // Update profile information
      actionUpdateProfileInformation: async (input) => {
        try {
          const { data } = await userApi.updateProfileInformation(input);
          set({ user: data.updateUser });
        } catch (error) {
          console.error("Profile Information Update Error:", error);
          throw error;
        }
      },
    }),
    {
      name: "state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }), // Persist only token
    }
  )
);

export default useUserStore;
