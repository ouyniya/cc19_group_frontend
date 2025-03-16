import { Colors } from "chart.js";
import adminApi from "../api/adminApi";
import { create } from "zustand";

const useAdminStores = create((set, get) => ({
  allUsers: null,
  totalViews: null,
  topDestination: [],
  isLoading: false,
  actionAllUsers: async () => {
    set({ isLoading: true });
    try {
      const result = await adminApi.actionAllUsers();
      set({ allUsers: result.data.result.length });
      return result.data.result.length;
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  actionAllViews: async () => {
    set({ isLoading: true });
    try {
      const result = await adminApi.actionAllViews();
      set({ totalViews: result.data.totalViews });
      return result.data.totalViews;
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  actionTopDestination: async () => {
    set({ isLoading: true });
    try {
      const result = await adminApi.actionTopDestination();
      set({ topDestination: result.data });
      return result.data;
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAdminStores;
