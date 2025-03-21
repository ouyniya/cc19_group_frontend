import { useState } from "react";
import aiPlanningApi from "../api/aiPlanningApi";
import { create } from "zustand";


const useAiplanningStores = create((set, get) => ({
  
  resultPlanning: [],
  generatePlan: async (body) => {
    const res = await aiPlanningApi.generateAITripPlan(body);
    set({ resultPlanning: res});
    console.log(res);
    
  },
  
}));

export default useAiplanningStores;