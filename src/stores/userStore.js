import axios from "axios";
import { createJSONStorage, persist } from "zustand/middleware";
import userApi from "../api/useApi";
import { create } from "zustand";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: "",
      actionLogin: async (input) => {
        // const result = await axios.post("http://localhost:5173/Login", input); // port หลังบ้านนะ
        const result = await userApi.login(input);
        set({ token: result.data.accessToken });
        return { token: result.data.accessToken };
      },

      actionRegister: async (input) => {
        // await axios.post("http://localhost:5173/Register", input); // port หลังบ้าน
        await userApi.register(input);
      },
      actionGetMe: async () => {
        // const result = await axios.get("http://", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        const result = await userApi.getMe();
        set({ user: result.data.user }); // .user ต้องตรงกับหลังบ้านนะ  อยู่ใน respond.json
        return { user: result.data.user };
      },
      actionLogout: () => {
        set({ token: "", user: null });
        localStorage.removeItem("state");
      },

      //  update profile photo
      actionUpdateProfile: async (input) => {
        // await axios.patch("http://", body);
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
