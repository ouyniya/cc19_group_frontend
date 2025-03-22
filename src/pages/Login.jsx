import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../icons/logo.png";
import destination from "../icons/destination.png";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";
import { ZodError } from "zod";
import { login } from "../utils/validators";
import { createAlert } from "../utils/createAlert";
import { KeyRound, Mail } from "lucide-react";
import { axios } from "../configs/axiosInstance";

const initialInput = {
  email: "",
  password: "",
};

function Login() {
  const [input, setInput] = useState(initialInput);
  const [errorInput, setErrorInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const actionLogin = useUserStore((state) => state.actionLogin);
  const actionGetMe = useUserStore((state) => state.actionGetMe);
  const actionGetMeOrGoogleLogin = useUserStore(
    (state) => state.actionGetMeOrGoogleLogin
  );

  const baseUrl = axios.defaults.baseURL;

  const googleAuth = () => {
    window.open(`${baseUrl}/auth/google/callback`, "_self");
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorInput((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      login.parse(input);
      await actionLogin(input);
      await actionGetMeOrGoogleLogin();
      createAlert("success", `Login Success`);
      navigate("/home");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      createAlert("info", errorMsg);

      if (error instanceof ZodError) {
        const errMsg = error.errors.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setErrorInput(errMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content */}
      <div className="flex flex-grow justify-center gap-20 items-center px-4">
        {/* Left Section */}
        <div className="flex flex-col h-full min-w-100 w-150 gap-5">
          {/* Logo */}
          <div className="flex flex-row mt-10">
            <p className="text-6xl font-bold text-[#086FB6] ml-2">V</p>
            <img src={logo} alt="logo voyager" className="w-22 -mt-4 -ml-1" />
            <p className="text-6xl font-bold text-[#086FB6] -ml-2">YAGER</p>
          </div>

          {/* Slogan */}
          <p className="text-[#78AAD7] text-xl ml-20 mr-15">
            "This is a space where the spirit of adventure meets the art of
            storytelling, inviting you to discover the world through our eyes."
          </p>

          {/* Destination Image */}
          <div className="flex justify-end mr-20">
            <img src={destination} alt="destination logo" className="h-60" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col h-full w-150 justify-center font-bold gap-1">
          <div className="flex flex-col min-h-100 py-13 w-130 bg-[#f4f9fb] rounded-4xl items-center justify-center gap-7 shadow-md">
            <form onSubmit={handleSubmit}>
              <p className="text-4xl font-bold text-[#2f6b97] mb-7 text-center">
                Login
              </p>
              <div className="flex flex-col items-baseline gap-4">
                {/* Email */}
                <label className="input validator">
                  <Mail color="lightgray" />
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="mail@site.com"
                    className="border-[#086BAF] py-4  input-lg placeholder:text-lg placeholder:font-medium"
                    required
                  />
                </label>
                <div className="validator-hint hidden -mt-2">
                  Enter valid email address
                </div>

                {/* Password */}
                <label className="input validator">
                  <KeyRound color="lightgray" />
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    required
                    placeholder="password"
                    minLength={6}
                    className="border-[#086BAF] py-4  input-lg placeholder:text-lg placeholder:font-medium"
                  />
                </label>
                <div className="validator-hint hidden -mt-2">
                Must be more than 6 characters
                </div>
              

                {/* Login Button */}
                <button
                  disabled={isLoading}
                  className="btn border-0 text-[18px] font-medium text-white w-full bg-[#086BAF] mt-2 h-[46px] rounded-lg shadow-sm hover:bg-sky-600 transition-all duration-500"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>

                {/* or */}
                <h2 className="relative w-full text-center border-b border-slate-300 my-4">
                  <span className="absolute bg-[#f4f9fb] px-2 inline-block -mt-3 left-[50%] -translate-x-[50%] font-light text-slate-400 ">
                    or
                  </span>
                </h2>
              </div>
            </form>

            {/* Signup and Google */}
            <div className="flex flex-col w-full gap-4 justify-center items-center -mt-3">
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="btn border-0 text-[18px] font-medium text-white px-4 py-2 bg-[#87b2ce] h-[45px] rounded-lg shadow-sm hover:bg-[#679abc] transition-all duration-500 w-[60%]"
              >
                Sign Up
              </button>
              <button
                className="flex items-center justify-center w-[60%] max-w-sm px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-500 hover:cursor-pointer"
                onClick={googleAuth}
              >
                <FcGoogle className="w-6 h-6 mr-2" />
                Sign Up with Google
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Fixed Footer (Always at bottom) */}
      <footer className="bg-[#064D7E] h-20 flex justify-center items-center">
        <p className="text-blue-200">
          EST 1997 - Voyager website by CC19 student
        </p>
      </footer>
    </div>
  );
}

export default Login;
