import { create } from "zustand";
import filterApi from "../api/filterApi";

const useFilterStores = create((set, get) => ({
  filterPosts: [],
  getFilterPosts: () => get().filterPosts,
  isLoading: false,
  //   getProvince: () => get().comments, //  ใช้เป็นฟังก์ชันแทนค่าเริ่มต้น
  actionGetFilterPosts: async (queryParams) => {
    set({ isLoading: true });
    try {
      const { data } = await filterApi.actionGetFilterPosts(queryParams);
      set({ filterPosts: data });
      // console.log(data)
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useFilterStores;
