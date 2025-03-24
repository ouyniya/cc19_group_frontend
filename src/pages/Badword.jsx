import React, { useState, useEffect } from "react";
import * as toxicity from "@tensorflow-models/toxicity";
import "@tensorflow/tfjs";

function ProfanityFilter() {
  const [text, setText] = useState("");
  const [isToxic, setIsToxic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await toxicity.load(0.9);
      setModel(loadedModel);
      setLoading(false);
    };
    loadModel();
  }, []);

  const checkToxicity = async () => {
    if (!model) return;
    const predictions = await model.classify([text]);

    const foundToxic = predictions.some((prediction) =>
      prediction.results.some((result) => result.match)
    );

    setIsToxic(foundToxic);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          🔍 Inappropriate word detection
        </h2>

        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={checkToxicity}
          disabled={loading}
        >
          {loading ? "Loading..." : "🔍 "}
        </button>

        {isToxic && text && (
          <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            Inappropriate content detected! Please revise.
          </div>
        )}

        {!isToxic && text && (
          <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700">
            Your content is ok.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfanityFilter;
