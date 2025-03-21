import { useState } from "react";
import aiPlanningApi from "../api/aiPlanningApi";
import { create } from "zustand";



// export default function useAIPlanning() {
//   const [budget, setBudget] = useState("");
//   const [period, setPeriod] = useState("");
//   const [province, setProvince] = useState("");
//   const [region, setRegion] = useState("");
//   const [transportation, setTransportation] = useState("");
//   const [numberOfTravellers, setNumberOfTravellers] = useState("");
//   const [tripType, setTripType] = useState([]);
//   const [moodAndTone, setMoodAndTone] = useState("");
//   const [responseHtml, setResponseHtml] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleTripTypeChange = (type) => {
//     setTripType((prev) => 
//       prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
//     );
//   };

//   const handleSubmit = async () => {
//     if (!budget || !period || !province || !region || !transportation || !numberOfTravellers || tripType.length === 0 || !moodAndTone) {
//       alert("Please fill in all fields before generating the trip plan.");
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const response = await generateAITripPlan({
//         budget,
//         period,
//         province,
//         region,
//         transportation,
//         numberOfTravellers,
//         tripType,
//         moodAndTone,
//       });
//       setResponseHtml(response);
//     } catch (error) {
//       setResponseHtml("<p>Error generating trip plan. Please try again.</p>");
//     }

//     setLoading(false);
//   };

//   return {
//     budget, setBudget,
//     period, setPeriod,
//     province, setProvince,
//     region, setRegion,
//     transportation, setTransportation,
//     numberOfTravellers, setNumberOfTravellers,
//     tripType, setTripType, handleTripTypeChange,
//     moodAndTone, setMoodAndTone,
//     responseHtml, loading,
//     handleSubmit,
//   };
// }



const useAiplanningStores = create((set, get) => ({
  
  resultPlanning: [],
  generatePlan: async (body) => {
    const res = await aiPlanningApi.generateAITripPlan(body);
    set({ resultPlanning: res});
    console.log(res);
    
  },
  
}));

export default useAiplanningStores;