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

      // OTP related state
      otpVerificationRequired: false,
      otpUserId: null,
      otpUserEmail: null,
      
      // Get the current user
      getCurrentUser: () => get().user,

      // Login action (updated to handle OTP)
      actionLogin: async (input) => {
        set({ isLoading: true });

        try {
          const { data } = await userApi.actionLogin(input);

          // console.log(data)
          
          // Check if OTP verification is required
          if (data.requiresOTP) {
            set({ 
              otpVerificationRequired: true,
              otpUserId: data.userId,
              otpUserEmail: data.email
            });
            return { requiresOTP: true, userId: data.userId, email: data.email };
          } else {
            // Regular login (no OTP required)
            set({ token: data.token, user: data.user });
            return { token: data.token, user: data.user };
          }
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      // Verify OTP action
      verifyOTP: async (otp) => {
        set({ isLoading: true });
        
        try {
          const { data } = await userApi.verifyOTP({
            userId: get().otpUserId,
            otp
          });
          
          // Store user and token after successful verification
          set({ 
            token: data.token, 
            user: data.user,
            otpVerificationRequired: false,
            otpUserId: null,
            otpUserEmail: null
          });
          
          return { token: data.token, user: data.user };
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      // Resend OTP action
      resendOTP: async () => {
        set({ isLoading: true });
        
        try {
          await userApi.resendOTP({
            userId: get().otpUserId
          });
          return true;
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      // Reset OTP state (e.g., when user cancels OTP verification)
      resetOTPState: () => {
        set({
          otpVerificationRequired: false,
          otpUserId: null,
          otpUserEmail: null
        });
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
        // set({ isLoading: true });

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
          // createAlert("success", "You have successfully logged out!");
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
          set({ posts: data.post });
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
          const { data } = await profileApi.actionGetUserInfoForDashboard(
            userId
          );
          set({ userPublicInfo: data });
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
