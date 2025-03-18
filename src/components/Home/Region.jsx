import React from "react";
import Map from "../../pictures/ThaiMap.png";
import WatArun from "../../pictures/WatArun.png";
import NorthEast from "../../pictures/Northeast.png";
import North from "../../pictures/North.png";
import East from "../../pictures/East.png";
import West from "../../pictures/West.png";
import South from "../../pictures/South.png";

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
            {/* Central */}
            <div className="relative hover:cursor-pointer">
              <img
                src={WatArun}
                alt="Central"
                className="w-full h-full object-cover rounded-lg"
              />
              <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-lg text-white">
                Central
              </p>
            </div>
            {/* Northeast */}
            <div className="relative hover:cursor-pointer">
              <img
                src={NorthEast}
                alt="Northeast"
                className="w-full h-full object-cover rounded-lg"
              />
              <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-lg text-white">
                Northeast
              </p>
            </div>
            {/* Northern */}
            <div className="relative hover:cursor-pointer">
              <img
                src={North}
                alt="Northern"
                className="w-full h-full object-cover rounded-lg"
              />
              <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-lg text-white">
                Northern
              </p>
            </div>
            {/* East */}
            <div className="relative hover:cursor-pointer">
              <img
                src={East}
                alt="East"
                className="w-full h-full object-cover rounded-lg"
              />
              <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-lg text-white">
                East
              </p>
            </div>
            {/* West */}
            <div className="relative hover:cursor-pointer">
              <img
                src={West}
                alt="West"
                className="w-full h-full object-cover rounded-lg"
              />
              <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-lg text-white">
                West
              </p>
            </div>
            {/* South */}
            <div className="relative hover:cursor-pointer">
              <img
                src={South}
                alt="South"
                className="w-full h-full object-cover rounded-lg"
              />
              <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-lg text-white">
                South
              </p>
            </div>
          </div>
        </div>

        {/* Heat Map */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={Map}
            alt="heat map"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Region;
