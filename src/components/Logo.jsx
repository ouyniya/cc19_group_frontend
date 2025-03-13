import React from "react";
import logo from "../icons/logo.png";

function Logo() {
  return (
    <>
      <div className="flex flex-row  mt-2">
        {/* Logo Voyager */}

        <div className="flex flex-row ">
          <div>
            <p className="text-3xl font-bold text-[#086FB6] ml-2">V</p>
          </div>
          <div>
            <img src={logo} alt="logo voyager" className="w-10 -mt-1 -ml-1" />
          </div>
          <div>
            <p className="text-3xl font-bold text-[#086FB6] -ml-2 ">YAGER</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logo;
