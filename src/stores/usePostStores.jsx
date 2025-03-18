import { create } from "zustand";
import postApi from "../api/postApi";

const usePostStores = create((set, get) => ({
  newPost: [],
  isLoading: false,
 
  actionAddPost: async (input) => {
    set({ isLoading: true });
    try {
      const res = await postApi.actionAddPost(input);
      set({ newPost: res.data.newPost });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
 
  
}));

export default usePostStores;