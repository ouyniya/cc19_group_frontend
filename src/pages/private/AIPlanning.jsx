import React, { useEffect, useState, useRef } from "react";
import useLocationStores from "../../stores/useLocationStores";
import useAiplanningStores from "../../stores/useAIPlanningStores";

export default function AIPlanning() {
  const [budget, setBudget] = useState("");
  const [period, setPeriod] = useState("");
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [transportation, setTransportation] = useState("");
  const [numberOfTravellers, setNumberOfTravellers] = useState("");
  const [tripType, setTripType] = useState([]);
  const [moodAndTone, setMoodAndTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // ✅ Progress bar state

  const resultRef = useRef(null);

  const input = {
    budget,
    period,
    province,
    region,
    transportation,
    numberOfTravellers,
    tripType,
    moodAndTone,
  };

  const tripOptions = [
    { label: "Adventure", className: "checkbox checkbox-primary" },
    { label: "Nature", className: "checkbox checkbox-secondary" },
    { label: "Cultural", className: "checkbox checkbox-accent" },
    { label: "Luxury", className: "checkbox checkbox-neutral" },
    { label: "Beach", className: "checkbox checkbox-info" },
    { label: "City Exploration", className: "checkbox checkbox-success" },
    { label: "Foodie", className: "checkbox checkbox-warning" }
  ];

  const moodOptions = [
    { label: "Relaxed", emoji: "😌" },
    { label: "Excited", emoji: "🤩" },
    { label: "Romantic", emoji: "😍" },
    { label: "Adventurous", emoji: "🏕️" },
    { label: "Spiritual", emoji: "🧘" },
    { label: "Social", emoji: "🥳" },
    { label: "Energetic", emoji: "⚡" },
    { label: "Peaceful", emoji: "🕊️" },
    { label: "Sad", emoji: "😔" },
    { label: "Burn out", emoji: "😩" }
  ];

  const provinces = useLocationStores((state) => state.provinces);
  const generatePlan = useAiplanningStores((state) => state.generatePlan);
  const resultPlanning = useAiplanningStores((state) => state.resultPlanning);
  const actionGetProvince = useLocationStores((state) => state.actionGetProvince);

  useEffect(() => {
    callActionGetProvince();
  }, []);

  const callActionGetProvince = async () => {
    await actionGetProvince();
    setProvince(province);
  };

  const handleProvinceChange = async (e) => {
    setProvince(e.target.value);
  };

  const handleTripTypeChange = (type) => {
    setTripType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async () => {
    if (!budget || !period || !province || !region || !transportation || !numberOfTravellers || tripType.length === 0 || !moodAndTone) {
      alert("Please fill in all fields before generating the trip plan.");
      return;
    }

    setLoading(true);
    setProgress(0);

    // ⏳ Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 1;
      });
    }, 50);

    try {
      await generatePlan(input);
    } catch (error) {
      console.log(error);
    }

    clearInterval(interval);
    setProgress(100);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // 🔄 Scroll to result when ready
  useEffect(() => {
    if (resultPlanning && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultPlanning]);

  return (
    <div className="p-6 bg-gray-50 w-full min-h-screen flex flex-col items-center text-black">
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#086BB0' }}>
        Plan Your Trip
      </h1>


      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <input
          className="input input-bordered input-info w-full"
          placeholder="Budget (THB)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <select className="select select-info" value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="" disabled>Select Trip Duration</option>
          {[...Array(15)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {i === 0 ? "day" : "days"}
            </option>
          ))}
        </select>

        <select onChange={handleProvinceChange} className="select select-info">
          <option disabled selected>Select Province</option>
          {provinces?.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>

        <select className="select select-info" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="" disabled>Select Region</option>
          <option value="Northern">Northern</option>
          <option value="Northeastern">Northeastern</option>
          <option value="Central">Central</option>
          <option value="Eastern">Eastern</option>
          <option value="Western">Western</option>
          <option value="Southern">Southern</option>
        </select>

        <select className="select select-info" value={transportation} onChange={(e) => setTransportation(e.target.value)}>
          <option value="" disabled>Select Transport Option</option>
          <option value="Public Transport">Public Transport</option>
          <option value="Personal Car">Private Transport</option>
        </select>

        <select className="select select-info" value={numberOfTravellers} onChange={(e) => setNumberOfTravellers(e.target.value)}>
          <option value="" disabled>Select Number of Travellers</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <div className="col-span-2">
          <label className="block text-black font-semibold mb-1">Trip Type</label>
          <div className="grid grid-cols-3 gap-2">
            {tripOptions.map(({ label, className }) => (
              <label key={label} className="flex items-center">
                <input
                  type="checkbox"
                  value={label}
                  checked={tripType.includes(label)}
                  onChange={() => handleTripTypeChange(label)}
                  className={`${className} mr-2`}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Emoji Mood Selector */}
        <div className="col-span-2">
          <p className="font-semibold text-lg mb-2 text-center">Select Mood & Tone:</p>
          <div className="grid grid-cols-5 gap-4 justify-center">
            {moodOptions.map(({ label, emoji }) => (
              <div
                key={label}
                className={`cursor-pointer flex flex-col items-center p-2 rounded-lg transition-all duration-300
                ${moodAndTone === label ? "border-4 border-blue-500" : "border border-gray-300 hover:scale-105"}`}
                onClick={() => setMoodAndTone(label)}
                style={{
                  width: "105px",
                  height: "105px",
                  transform: moodAndTone === label ? "scale(1.2)" : "scale(1)",
                }}
              >
                <span className="text-5xl">{emoji}</span>
                <p className="mt-1 text-center text-sm font-medium leading-tight w-full">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button onClick={handleSubmit} className="btn btn-info mt-4 text-white"   disabled={loading}>
        {loading ? "Generating..." : "Generate Your Travelling"}
      </button>

      {/* Progress Bar */}
      {loading && (
        <div className="w-full max-w-2xl mt-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">Generating trip... {progress}%</p>
        </div>
      )}

      {/* Trip Result */}
      {resultPlanning && (
        <div
          ref={resultRef}
          className="mt-6 p-4 bg-white shadow rounded-lg w-full max-w-3xl"
        >
          <h2 className="text-lg font-semibold mb-3" style={{ color: '#086BB0' }}>
            Your Travel Plan
          </h2>

          <div
            className="text-black leading-relaxed space-y-3"
            style={{ wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{ __html: resultPlanning }}
          />
        </div>
      )}
    </div>
  );
}
