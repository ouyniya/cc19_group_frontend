import { create } from "zustand";
import wishlistExample from "../api/wishlistExample";

const useWishlistStoresExample = create((set, get) => ({
  wishlists: [],
  isLoading: false,
  //   getProvince: () => get().comments, //  ใช้เป็นฟังก์ชันแทนค่าเริ่มต้น
  actionGetWishlist: async (userId) => {
    set({ isLoading: true });
    try {
      const { data } = await wishlistExample.actionGetWishlist(userId);
      set({ wishlists: data });
    //   console.log(data)
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useWishlistStoresExample;
