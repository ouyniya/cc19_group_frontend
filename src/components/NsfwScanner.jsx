import React, { useState, useEffect } from "react";
import * as nsfwjs from "nsfwjs";

const NsfwScanner = ({ imageFile, onScanComplete }) => {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {

      const nsfwModel = await nsfwjs.load();
      setModel(nsfwModel);
      console.log("NSFW Model loaded");
      setIsLoading(false)
    };


    loadModel();
  }, []);

  useEffect(() => {
    console.log(isLoading)
    if (imageFile) {
      // console.log(",,,,", imageFile);
      if (!isLoading) {
        classifyImage(imageFile);
      }
    }
  }, [isLoading, imageFile]);

  const classifyImage = async (file) => {
    if (!model) return;

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.crossOrigin = "anonymous"; // Prevent CORS issues
    img.src = imageUrl;

    img.onload = async () => {
      console.log("Image loaded for scanning");

      try {
        const results = await model.classify(img);
        setPredictions(results);
        onScanComplete(results);
        console.log("Scanning completed", results);
      } catch (error) {
        console.error("Error classifying image:", error);
      } finally {
        URL.revokeObjectURL(imageUrl); // Clean up object URL
      }
    };

    img.onerror = () => {
      console.error("Failed to load image for scanning");
    };
  };

  return (
    <div>
      {predictions.length > 0 && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold">NSFW Scan Results:</h3>
          <ul>
            {predictions.map((p, index) => (
              <li key={index} className="text-sm">
                {p.className}:{" "}
                <strong>{(p.probability * 100).toFixed(2)}%</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NsfwScanner;
