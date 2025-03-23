import { create } from "zustand";
import postApi from "../api/postApi";
import { createAlert } from "../utils/createAlert";

const usePostStores = create((set, get) => ({
  newPost: [],
  curentPost:[],
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
  actionDeleteNewPost: () => set({ newPost: [] }),
  actionUpdatePost: async (input, id) => {
    set({ isLoading: true });
    try {
      const res = await postApi.actionUpdatePost(input, id);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      createAlert("info", errorMsg);
      console.log(error)
    } finally {
      set({ isLoading: false });
    }
  },
  actionGetEachPost: async (id) => {
    set({ isLoading: true });
    try {

      const res = await postApi.actionGetEachPost(id);
      set({ curentPost: res.data.post });
      return res.data
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      createAlert("info", errorMsg);
      console.log(error)
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePostStores;
