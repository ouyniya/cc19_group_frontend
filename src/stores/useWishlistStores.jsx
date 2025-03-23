import { create } from "zustand";
import wishlistApi from "../api/wishlistApi";
import { createAlert } from "../utils/createAlert";

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
  actionDeleteWishlistByPostId: async (postId) => {
    set({ isLoading: true });
    try {
      // Call the API to delete the wishlist
      const { data } = await wishlistApi.actionDeleteWishlistByPostId(postId);

      set((state) => ({
        // Check if `state.wishlists` is an array before filtering
        wishlists: Array.isArray(state.wishlists)
          ? state.wishlists.filter((wishlist) => wishlist.postId !== postId)
          : [], // If `wishlists` is not an array, reset it to an empty array
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  actionAddWishlist: async (input) => {
    set({ isLoading: true });
    try {
      // Call the API to delete the wishlist
      const { data } = await wishlistApi.actionAddWishlist(input);

      set((state) => ({
        wishlists: Array.isArray(state.wishlists)
          ? [...state.wishlists, data] // Append the new item
          : [data], // Initialize if empty
      }));

      createAlert("success", "Added the post to your wishlist");
    } catch (error) {
      console.log(error?.response?.data?.message);
      createAlert("info", error?.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useWishlistStores;
