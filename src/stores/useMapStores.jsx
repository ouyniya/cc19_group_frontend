import { create } from "zustand";
import mapApi from "../api/mapApi";

const useMapStores = create((set, get) => ({
  posts: [],
  isLoading: false,
  actionGetMapPost: async () => {
    set({ isLoading: true });
    try {
      const res = await mapApi.actionGetMapPost();
      set({ posts: res.data.posts });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useMapStores;
