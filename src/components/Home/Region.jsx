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
    <div>
      <div>
        {/* text title */}
        <div className="flex flex-col mt-20">
          <p className="text-xl font-bold ml-10">
            Explore the most beautiful places
          </p>
          <p className="text-lg ml-10 text-gray-400 ">
            2025’s Traveler’s Select to travel
          </p>
        </div>
        <div className="flex flex-col items-center  md:flex-row md:justify-center gap-5 mt-2">
          {/* Region */}
          <div className=" w-full  md:w-auto">
            {/* อันบน */}
            <div className="grid grid-cols-3 gap-2">
              {/* Central */}
              <div className="relative h-55 w-full hover:cursor-pointer">
                <img
                  src={WatArun}
                  alt="Central"
                  className="w-full h-full object-cover   md:h-55"
                />
                <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-xl text-white">
                  Central
                </p>
              </div>
              {/* Northeast */}

              <div className="relative h-55 w-full hover:cursor-pointer">
                <img
                  src={NorthEast}
                  alt="Northeast"
                  className="w-full h-full object-cover  md:h-55"
                />
                <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-xl text-white">
                  Northeast
                </p>
              </div>
              {/* Northern */}
              <div className="relative h-55 w-full hover:cursor-pointer">
                <img
                  src={North}
                  alt="Northern"
                  className="w-full h-full object-cover  md:h-55"
                />
                <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-xl text-white">
                  Northern
                </p>
              </div>
              {/* East */}
              <div className="relative h-55 w-full hover:cursor-pointer">
                <img
                  src={East}
                  alt=""
                  className="w-full h-full object-cover  md:h-55"
                />
                <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-xl text-white">
                  East
                </p>
              </div>
              {/* West */}
              <div className="relative h-55 w-full hover:cursor-pointer">
                <img
                  src={West}
                  alt="West"
                  className="w-full h-full object-cover  md:h-55"
                />
                <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-xl text-white">
                  West
                </p>
              </div>
              {/* South */}
              <div className="relative h-55 w-full hover:cursor-pointer">
                <img
                  src={South}
                  alt="South"
                  className="w-full h-full object-cover  md:h-55"
                />
                <p className="absolute bottom-2 left-2 font-bold text-sm sm:text-base md:text-xl text-white">
                  South
                </p>
              </div>
            </div>
          </div>
          {/* Heat map */}
          <div className=" h-130 w-180 -mt-8">
            <img src={Map} alt="heat map" className="h-130 " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Region;
