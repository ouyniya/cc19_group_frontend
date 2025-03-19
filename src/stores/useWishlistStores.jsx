import { create } from "zustand";
import wishlistApi from "../api/wishlistApi";

const useWishlistStores = create((set, get) => ({
  wishlists: [],
  isLoading: false,
  getCurrentWishlists: () => get().wishlists,
  //   getProvince: () => get().comments, //  ใช้เป็นฟังก์ชันแทนค่าเริ่มต้น
  actionGetWishlist: async (userId) => {
    set({ isLoading: true });
    try {
      const { data } = await wishlistApi.actionGetWishlist(userId);
      set({ wishlists: data });
      //   console.log(data)
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  actionDeleteWishlist: async (wishlistId) => {
    set({ isLoading: true });
    try {
      // Call the API to delete the wishlist
      const { data } = await wishlistApi.actionDeleteWishlist(wishlistId);
  
      set((state) => ({
        // Check if `state.wishlists` is an array before filtering
        wishlists: Array.isArray(state.wishlists)
          ? state.wishlists.filter((wishlist) => wishlist.id !== wishlistId)
          : [], // If `wishlists` is not an array, reset it to an empty array
      }));
  
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useWishlistStores;
