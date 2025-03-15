import { createJSONStorage, persist } from "zustand/middleware";
import userApi from "../api/authApi";
import { create } from "zustand";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      getCurrentUser: () => get().user,
      actionLogin: async (input) => {
        const result = await userApi.actionLogin(input);
        set({ token: result.data.token });
        return { token: result.data.token };
      },
      actionRegister: async (input) => {
        await userApi.actionRegister(input);
      },
      actionGoogleLogin: async (input) => {
        const result = await userApi.actionGoogleLogin(input);
        set({ user: result.data.user }); 
        return { user: result.data.user };
      },
      actionGetMe: async () => {
        const result = await userApi.actionCurrentUser();
        // console.log(result.data)
        set({ user: result.data.user }); 
        return { user: result.data.user };
      },
      actionLogout: () => {
        set({ token: "", user: null });
        localStorage.removeItem("state");
      },

      //  update profile photo
      actionUpdateProfile: async (input) => {
        const result = await userApi.updateProfile(input);

        set({ user: result.data.updateUser });
      },
      // update profile information
      actionUpdateProfileInfomation: async (input) => {
        const result = await userApi.updateProfileInformation(input);
        set({ user: result.data.updateUser });
      },
    }),
    {
      name: "state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useUserStore;
