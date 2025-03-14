import React, { useState } from "react";
import NavbarHeader from "../components/NavbarHeader";
import facebook from "../icons/facebook.png";
import google from "../icons/google.png";
import logo from "../icons/logo.png";
import destination from "../icons/destination.png";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import { registerSchema } from "../validators/validators";
import { AxiosError } from "axios";
import { ZodError } from "zod";

const register = {
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const navigate = useNavigate();

  const actionRegister = useUserStore((state) => state.actionRegister);
  const [input, setInput] = useState(register);
  const [errorInput, setErrorInput] = useState(register);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    //set ข้อมูลไปใน input
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //set error
    setErrorInput((prev) => ({ ...prev, [e.target.name]: " " }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //validate
      registerSchema.parse(input);

      //api
      const res = await actionRegister(input);
      console.log("register success");
      navigate("/home");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        console.log("first");
        console.log(error.response.data.message);
      }

      if (error instanceof ZodError) {
        console.log("error,errors", error.errors);

        //จัด format ของ error
        const errMsg = error.errors.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        console.log(errMsg);
        setErrorInput(errMsg);
        return console.log("Register invalid");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("AAAA");
    setInput(register);
  };

  return (
    <>
      {/* header */}
      {/* <NavbarHeader /> */}

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

            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center  gap-4">
                {/* <input
                type="text"
                placeholder="   First Name"
                className="bg-white border-4 border-[#086BAF] rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50 "
              />
              <input
                type="text"
                placeholder="    Last Name"
                className="bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
              /> */}
                <input
                  onChange={handleChange}
                  name="email"
                  type="text"
                  placeholder="    Email Address"
                  className="-mt-10 bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
                  value={input.email}
                />
                <input
                  onChange={handleChange}
                  name="password"
                  type="text"
                  placeholder="    Password"
                  className="mt-2 bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
                  value={input.password}
                />
                <input
                  onChange={handleChange}
                  name="confirmPassword"
                  type="text"
                  placeholder="    Confirm Password"
                  className="mt-2 bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
                  value={input.confirmPassword}
                />

                {/* Button */}
                <div className="flex mt-10 gap-5">
                  <button className="btn border-0 rounded-xl text-2xl text-white  h-15 bg-[#086BAF]">
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn border-0 rounded-xl text-2xl text-[#9BA2A5] h-15  bg-white "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
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
