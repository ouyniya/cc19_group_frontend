import { useState } from "react";
import axios from "axios";

export default function AIPlanning() {
  const [budget, setBudget] = useState("");
  const [period, setPeriod] = useState("");
  const [beginningPoint, setBeginningPoint] = useState("");
  const [region, setRegion] = useState("");
  const [transportation, setTransportation] = useState("");
  const [numberOfTravellers, setNumberOfTravellers] = useState("");
  const [tripType, setTripType] = useState([]);
  const [moodAndTone, setMoodAndTone] = useState("");
  const [responseHtml, setResponseHtml] = useState("");
  const [loading, setLoading] = useState(false);

  // ตัวเลือกสำหรับ Trip Type และ Mood
  const tripOptions = ["Adventure", "Nature", "Cultural", "Luxury", "Beach", "City Exploration", "Foodie"];
  const moodOptions = ["Relaxed", "Excited", "Romantic", "Adventurous", "Spiritual", "Social"];

  // ฟังก์ชันเลือกประเภททริป
  const handleTripTypeChange = (type) => {
    setTripType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async () => {
    if (!budget || !period || !beginningPoint || !region || !transportation || !numberOfTravellers || tripType.length === 0 || !moodAndTone) {
      alert("Please fill in all fields before generating the trip plan.");
      return;
    }

    setLoading(true);

    const prompt = `
      I want to plan a trip with the following details:
      - Budget: ${budget} THB
      - Trip Duration: ${period} days
      - Starting Point: ${beginningPoint}
      - Region: ${region}
      - Mode of Transport: ${transportation}
      - Number of Travellers: ${numberOfTravellers}
      - Trip Type: ${tripType.join(", ")}
      - Current Mood & Tone: ${moodAndTone}

      Format the response **in valid HTML**, ensuring:
      - Provide **3 different trip options**, clearly separated.
      - Each trip should be structured like:
        <h2>Trip Option 1</h2>
        <p>Short trip description.</p>
        <h3>Day 1</h3> 
        <ul><li>Activity description + cost</li></ul>
        <h3>Day 2</h3> 
        <ul><li>Activity description + cost</li></ul>
        <h3>Conclusion</h3> 
        <p>Remaining budget: XXX THB</p>
      - Keep it **short, clear, and easy to read**.
      - **Make the trip budget closest to the given budget, try to spend as much as possible money and show remaining balance at the end**.
      - **Use proper HTML tags**: <h2>, <h3>, <p>, <ul>, <li>, etc.
      - **DO NOT include <head> or <body> tags**.
      - **Ensure all elements are properly structured in a compact way, without unnecessary newlines (\n).**
      - **Do NOT include Gemini response notes or disclaimers.**
    `;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful travel assistant." },
            { role: "user", content: prompt },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResponseHtml(response.data.choices[0].message.content || "No response from AI");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponseHtml("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-50 w-full min-h-screen flex flex-col items-center text-black">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Plan Your Trip</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <input className="p-2 border border-blue-400 rounded text-black placeholder-gray-700"
          placeholder="Budget (THB)" value={budget} onChange={(e) => setBudget(e.target.value)} />

        <input className="p-2 border border-blue-400 rounded text-black placeholder-gray-700"
          placeholder="Trip Duration (days)" value={period} onChange={(e) => setPeriod(e.target.value)} />

        <input className="p-2 border border-blue-400 rounded text-black placeholder-gray-700"
          placeholder="Starting Point" value={beginningPoint} onChange={(e) => setBeginningPoint(e.target.value)} />

        <input className="p-2 border border-blue-400 rounded text-black placeholder-gray-700"
          placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} />

        <input className="p-2 border border-blue-400 rounded text-black placeholder-gray-700"
          placeholder="Mode of Transport" value={transportation} onChange={(e) => setTransportation(e.target.value)} />

        <input className="p-2 border border-blue-400 rounded text-black placeholder-gray-700"
          placeholder="Number of Travellers" value={numberOfTravellers} onChange={(e) => setNumberOfTravellers(e.target.value)} />

        <div className="col-span-2">
          <label className="block text-black font-semibold mb-1">Trip Type</label>
          <div className="grid grid-cols-3 gap-2">
            {tripOptions.map((type) => (
              <label key={type} className="flex items-center">
                <input type="checkbox" value={type} checked={tripType.includes(type)}
                  onChange={() => handleTripTypeChange(type)} className="mr-2" />
                {type}
              </label>
            ))}
          </div>
        </div>

        <select className="p-2 border border-blue-400 rounded text-black"
          value={moodAndTone} onChange={(e) => setMoodAndTone(e.target.value)}>
          <option value="">Select Mood & Tone</option>
          {moodOptions.map((mood) => <option key={mood} value={mood}>{mood}</option>)}
        </select>
      </div>

      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded-lg" disabled={loading}>
        {loading ? "Generating..." : "Generate Trip Plan"}
      </button>

      {responseHtml && (
        <div className="mt-6 p-4 bg-white shadow rounded-lg w-full max-w-3xl">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Your Travel Plan</h2>
          <div dangerouslySetInnerHTML={{ __html: responseHtml }} />
        </div>
      )}
    </div>
  );
}
