import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../icons/logo.png";
import destination from "../icons/destination.png";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";
import { ZodError } from "zod";
import { login } from "../utils/validators";
import { createAlert } from "../utils/createAlert";
import { KeyIcon, KeyRound, Mail, User } from "lucide-react";
import { axios, getAccessToken } from "../configs/axiosInstance";

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
    //set ข้อมูลไปใน input
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //set error
    setErrorInput((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // console.log(actionGetMe())

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true); // เริ่มการทำให้มัน loading เป็น true
      e.preventDefault(); // กัน refresh ข้อมูลเวลากด submit

      //validate
      login.parse(input);
      //ยิงของส่งไปหลังบ้านแล้ว หลังจากที่ผ่านการ validate
      const res = await actionLogin(input);
      createAlert("success", `Login Success`);
      navigate("/home");

      await actionGetMeOrGoogleLogin();
      return createAlert("success", `Login Success`);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      createAlert("info", errorMsg);

      if (error instanceof ZodError) {
        console.log("error,errors", error.errors);
        const errMsg = error.errors.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        console.log(errMsg);
        setErrorInput(errMsg);
        return console.log("login invalid");
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log(input);

  return (
    <>
      {/* header */}
      {/* Body  */}
      <div className="flex flex-col min-h-[calc(100vh-96px)]">
        <div className="flex justify-center gap-20 h-175 items-center">
          <div className="flex flex-col h-150 min-w-100 w-150 gap-5">
            {/* Logo Voyager */}
            <div className="flex flex-row mt-20">
              <div>
                <p className="text-6xl font-bold text-[#086FB6] ml-2">V</p>
              </div>
              <div>
                <img
                  src={logo}
                  alt="logo voyager"
                  className="w-22 -mt-4 -ml-1"
                />
              </div>
              <div>
                <p className="text-6xl font-bold text-[#086FB6] -ml-2 ">
                  YAGER
                </p>
              </div>
            </div>
            {/* definition */}
            <p className="text-[#78AAD7] text-xl ml-20 mr-15 ">
              "This is a space where the spirit of adventure meets the art of
              storytelling, inviting you to discover the world through our
              eyes."
            </p>
            {/* Logo destination */}
            <div className="flex justify-end mr-20">
              <img src={destination} alt="destination logo" className="h-60" />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col h-150 w-150 justify-center font-bold gap-1">
            <div className="flex flex-col min-h-100 py-13 w-130 bg-[#f4f9fb] rounded-4xl items-center justify-center gap-7">
              <form onSubmit={handleSubmit}>
                <p className="text-4xl font-bold text-[#2f6b97] mb-7 text-center">Login</p>
                {/* input + button */}
                <div className="flex flex-col items-baseline gap-4">
                  <label className="input validator">
                    <Mail color="lightgray" />
                    <input
                      onChange={handleChange}
                      type="email"
                      name="email"
                      placeholder="mail@site.com"
                      className="border-[#086BAF] py-4 input input-lg placeholder:text-lg placeholder:font-medium"
                      required
                    />
                  </label>
                  <div className="validator-hint hidden -mt-2">
                    Enter valid email address
                  </div>
                  {/* <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  placeholder="Email Address"
                  className="bg-white border-2 border-[#086BAF] text-[#086BAF] px-5 rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50 "
                />
                {errorInput?.email && (
                  <p className="text-red-500 text-xs bg-amber-200">
                    {errorInput?.email}...
                  </p>
                )} */}
                  <label className="input validator">
                    <KeyRound color="lightgray" />
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      required
                      placeholder="password"
                      minlength="6"
                      // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      className="border-[#086BAF] py-4 input input-lg placeholder:text-lg placeholder:font-medium"
                      title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                  </label>
                  <p className="validator-hint hidden -mt-2">
                    Must be more than 6 characters
                    {/* , including
                  <br />
                  At least one number
                  <br />
                  At least one lowercase letter
                  <br />
                  At least one uppercase letter */}
                  </p>
                  {/* <input
                  name="password"
                  onChange={handleChange}
                  type="text"
                  placeholder="Password"
                  className="bg-white border-2 border-[#086BAF] px-5 text-[#086BAF] rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50 "
                />
                {errorInput?.password && (
                  <p className="text-red-500 text-xs">{errorInput?.password}</p>
                )} */}
                  <button
                    disabled={isLoading}
                    className="btn border-0 text-[18px] font-medium text-white  w-full bg-[#086BAF] mt-2 h-[46px] rounded-lg shadow-sm hover:bg-sky-600 transition-all duration-500"
                  >
                    Login
                  </button>
                  {/* <hr className="border-b-0 border-slate-300 w-full" /> */}
                  <h2 className="relative w-full text-center border-b border-slate-300 my-4">
                    <span className="absolute bg-[#f4f9fb] px-2 inline-block -mt-3 left-[50%] -translate-x-[50%] font-light text-slate-400 ">
                      or
                    </span>
                  </h2>
                </div>
                {/* or using another platform */}
                {/* <div className="flex flex-col justify-center gap-5">
                <p className="text-lg opacity-60">
                Or Login using another platform
                </p>
                <div className="flex flex-row  justify-center gap-5">
                <img
                src={facebook}
                alt="facebook logo"
                className=" h-10 hover:cursor-pointer"
                />
                
                <img
                onClick={googleAuth}
                src={google}
                alt="google logo"
                className="h-10 hover:cursor-pointer"
                />
                </div>
                </div> */}
              </form>
              <div className="flex flex-col w-full gap-4 justify-center items-center -mt-3">
                <button
                  onClick={() => navigate("/register")}
                  type="button"
                  className="btn border-0 text-[18px] font-medium text-white px-4 py-2 bg-[#87b2ce] h-[45px] rounded-lg shadow-sm hover:bg-[#679abc] transition-all duration-500 w-[60%]"
                >
                  Sign Up
                </button>
                <button
                  className="flex items-center justify-center w-[60%] max-w-sm px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none  focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-500 hover:cursor-pointer"
                  onClick={googleAuth}
                >
                  <FcGoogle className="w-6 h-6 mr-2" />
                  Sign Up with Google
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute w-screen bottom-0 bg-[#064D7E] h-20 flex justify-center items-center">
          <p className="text-blue-200">
            EST 1997 - Voyager website by CC19 student
          </p>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="flex bg-[#064D7E] h-20 justify-center">
        <p className="text-blue-200 mt-8 ">
          {" "}
          EST 1997 - Voyager website by CC19 student
        </p>
      </div> */}
    </>
  );
}

export default Login;
