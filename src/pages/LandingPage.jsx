import React from "react";
import NavbarHeader from "../components/NavbarHeader";
import Fuji from "../pictures/Fuji.jpg";

function LandingPage() {
  return (
    <>
      {/* header */}
      {/* <NavbarHeader /> */}
      {/* Body */}
      <div className="flex flex-col mt-3 ">
        {/* Image */}
        <img src={Fuji} alt="" className="w-500  " />
        <div className="flex flex-col gap-5 h-50 w-150 ml-25 -mt-90">
          {/* Text */}
          <p className="text-white  text-4xl font-bold ">
            Experience
            <br />
            The best trip ever
          </p>
          <p className="text-white ml-17 ">
            "This is a space where the spirit of adventure meets the art of
            storytelling, inviting you to discover the world through our eyes."
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-45">
        <button className="btn bg-[#A1BDCB] rounded-full h-15 w-30 text-white text-xl">
          Home
        </button>
      </div>
    </>
  );
}

export default LandingPage;
