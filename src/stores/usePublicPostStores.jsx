import { create } from "zustand";
import publicPostApi from "../api/publicPostApi";

const useLocationStores = create((set, get) => ({
  publicPost: [],
  postImage: [],
  isLoading: false,
  //   getProvince: () => get().comments, //  ใช้เป็นฟังก์ชันแทนค่าเริ่มต้น
  actionGetPostByPostId: async (postId) => {
    set({ isLoading: true });
    try {
      const { data } = await publicPostApi.actionGetPostByPostId(postId);
      set({ publicPost: data, postImage: data.postImage });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useLocationStores;
