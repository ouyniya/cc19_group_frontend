import React from "react";
import NavbarHeader from "../components/NavbarHeader";
import facebook from "../icons/facebook.png";
import google from "../icons/google.png";
import logo from "../icons/logo.png";
import destination from "../icons/destination.png";

function Register() {
  return (
    <>
      {/* header */}
      <NavbarHeader />

      {/* Body  */}
      <div className="flex justify-center gap-20 h-175 items-center ">
        {/* Left body */}
        <div className="flex flex-col h-150 w-150 gap-5 ">
          {/* Logo Voyager */}
          <div className="flex flex-row mt-20 ">
            <div>
              <p className="text-6xl font-bold text-[#086FB6] ml-2">V</p>
            </div>
            <div>
              <img src={logo} alt="logo voyager" className="w-22 -mt-4 -ml-1" />
            </div>
            <div>
              <p className="text-6xl font-bold text-[#086FB6] -ml-2 ">YAGER</p>
            </div>
          </div>
          {/* definition */}
          <p className="text-[#78AAD7] text-xl ml-20 mr-15 ">
            "This is a space where the spirit of adventure meets the art of
            storytelling, inviting you to discover the world through our eyes."
          </p>
          {/* Logo destination */}
          <div className="flex justify-end mr-20">
            <img src={destination} alt="destination logo" className="h-60" />
          </div>
        </div>

        {/* Right body */}
        <div className="flex flex-col h-150 w-150  items-center font-bold gap-1">
          <p className="text-4xl text-[#064D7E]">Register</p>
          <div className="flex flex-col h-130 w-130 bg-[#EFF4F6] rounded-4xl items-center justify-center gap-10 ">
            {/* input */}
            <div className="flex flex-col items-center  gap-4">
              <input
                type="text"
                placeholder="   First Name"
                className="bg-white border-4 border-[#086BAF] rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50 "
              />
              <input
                type="text"
                placeholder="    Last Name"
                className="bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
              />
              <input
                type="text"
                placeholder="    Email Address"
                className="bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
              />
              <input
                type="text"
                placeholder="    Password"
                className="bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
              />
              <input
                type="text"
                placeholder="    Confirm Password"
                className="bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
              />

              {/* Button */}
              <div className="flex gap-5">
                <button className="btn border-0 rounded-xl text-2xl text-white  h-15 bg-[#086BAF]">
                  Register
                </button>
                <button className="btn border-0 rounded-xl text-2xl text-[#9BA2A5] h-15  bg-white ">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex bg-[#064D7E] h-20 justify-center">
        <p className="text-blue-200 mt-8 ">
          {" "}
          EST 1997 - Voyager website by CC19 student
        </p>
      </div>
    </>
  );
}

export default Register;
