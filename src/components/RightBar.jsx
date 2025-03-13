import React from "react";
import Home from "../icons/home.png";

function RightBar() {
  return (
    <>
      <div className="flex items-center mt-3 gap-1 ">
        <div className="w-9">
          <img src={Home} alt="Home logo" className="w-full" />
        </div>
        <button className="btn border-0 bg-[#5CAFF0] text-white rounded-full">
          Home
        </button>
        <button className="btn border-0 bg-[#aecee5]  text-white rounded-full">
          Plan
        </button>
        <button className="btn border-0 bg-[#aecee5]  text-white rounded-full">
          Wish List
        </button>
        <button className="btn border-0  text-black rounded-full">
          Sign Up
        </button>
        <button className="btn border-0 bg-[#086BAF] text-white rounded-full mr-2">
          Log in
        </button>
      </div>
    </>
  );
}

export default RightBar;
