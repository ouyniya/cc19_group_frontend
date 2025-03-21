import React from "react";
import Map from "../../pictures/ThaiMap.png";
import WatArun from "../../pictures/WatArun.png";
import NorthEast from "../../pictures/Northeast.png";
import North from "../../pictures/North.png";
import East from "../../pictures/East.png";
import West from "../../pictures/West.png";
import South from "../../pictures/South.png";
import MapCanvasExample from "../MapCanvasExample";
import InteractiveMap from "../InteractiveMap";

function Region() {
  return (
    <div className="max-w-[80%] mx-auto mt-20">
      {/* Title */}
      <div>
        <p className="text-xl font-bold">Explore the most beautiful places</p>
        <p className="text-lg text-gray-400">
          2025’s Traveler’s Select to travel
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-6 mt-4">
        {/* Region Images */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-3 gap-4">
            {[
              { src: WatArun, label: "Central" },
              { src: NorthEast, label: "Northeast" },
              { src: North, label: "Northern" },
              { src: East, label: "East" },
              { src: West, label: "West" },
              { src: South, label: "South" },
            ].map((region, index) => (
              <div key={index} className="relative hover:cursor-pointer">
                <img
                  src={region.src}
                  alt={region.label}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Overlay Black Gradient */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
                  <p className="font-bold text-sm sm:text-base md:text-lg text-white">
                    {region.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heat Map */}
        <div className="w-full h-[400px] md:w-1/3 flex justify-center rounded-xl overflow-hidden">
          <MapCanvasExample />
        </div>
      </div>
      <InteractiveMap />
    </div>
  );
}

export default Region;
