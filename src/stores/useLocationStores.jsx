import { create } from "zustand";
import locationApi from "../api/locationApi";

const useLocationStores = create((set, get) => ({
  provinces: [],
  districts: [],
  topLocation: [],
  isLoading: false,
  getProvince: () => get().comments, //  ใช้เป็นฟังก์ชันแทนค่าเริ่มต้น
  actionGetProvince: async () => {
    set({ isLoading: true });
    try {
      const res = await locationApi.actionGetProvince();
      set({ provinces: res.data.province });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  actionGetDistrict: async (provinceId) => {
    set({ isLoading: true });
    try {
      const res = await locationApi.actionGetDistrict(provinceId);
      set({ districts: res.data.districts });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  actionGetTopProvinces: async () => {
    set({ isLoading: true });
    try {
      const res = await locationApi.actionGetTopProvinces();
      set({ topLocation: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  
}));

export default useLocationStores;
