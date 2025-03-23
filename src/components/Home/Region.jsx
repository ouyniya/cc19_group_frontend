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
import useAdminStores from "../../stores/useAdminStores";

function Region() {
  const regions = [
    { src: WatArun, label: "Central" },
    { src: NorthEast, label: "Northeast" },
    { src: North, label: "Northern" },
    { src: East, label: "East" },
    { src: West, label: "West" },
    { src: South, label: "South" },
  ];

  return (
    <div className="max-w-[80%] mx-auto mt-20 flex flex-col gap-5">
      {/* Title */}
      <div className="mb-2">
        <p className="text-xl font-bold">Explore the most beautiful places</p>
        <p className="text-lg text-gray-400">
          2025's Traveler's Select to travel
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-6">
        {/* Region Images */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {regions.map((region, index) => (
              <div
                key={index}
                className="relative hover:cursor-pointer h-40 overflow-hidden rounded-lg"
              >
                <img
                  src={region.src}
                  alt={region.label}
                  className="w-full h-full object-cover"
                />

                {/* Overlay Black Gradient */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2 sm:p-4">
                  <p className="font-bold text-sm sm:text-base text-white">
                    {region.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Heat Map */}
        {/* Heat Map */}
        <div className="w-full h-85 md:w-1/3 flex justify-center rounded-xl overflow-hidden">
          <MapCanvasExample />
        </div>

        {/* <div className="md:w-1/3 h-80 rounded-xl overflow-hidden justify-center">
          <div className="w-full h-[400px] ">
            <MapCanvasExample />
          </div>
        </div> */}
      </div>

      {/* Interactive Map */}
      <div className="w-full h-96 overflow-hidden rounded-xl mt-4">
        <div className="w-full h-full">
          <InteractiveMap />
        </div>
      </div>
    </div>
  );
}

export default Region;
