import { axios, getAccessToken } from "../configs/axiosInstance";
const aiPlanningApi = {};

aiPlanningApi.generateAITripPlan = async (tripData) => {
  try {
    const response = await axios.post(
      "/api/ai/chat", // Ensure this matches your backend route
      tripData,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensures session/cookie data is sent
      }
    );

    return response.data.msg; // AI-generated HTML response
  } catch (error) {
    console.error("AI Trip Plan API Error:", error.response?.data || error);
    throw new Error(error.response?.data?.error || "Failed to fetch AI response");
  }
};

export default aiPlanningApi;
