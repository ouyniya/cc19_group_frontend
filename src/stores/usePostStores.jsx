import { create } from "zustand";
import postApi from "../api/postApi";
import { createAlert } from "../utils/createAlert";

const usePostStores = create((set, get) => ({
  newPost: [],
  isLoading: false,

  actionAddPost: async (input) => {
    set({ isLoading: true });
    try {
      const res = await postApi.actionAddPost(input);
      set({ newPost: res.data.newPost });
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      createAlert("info", errorMsg);
    } finally {
      set({ isLoading: false });
    }
  },
  actionDeleteNewPost: () => set({ newPost: [] })
}));

export default usePostStores;
