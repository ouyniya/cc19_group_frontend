import React, { useState } from "react";
import facebook from "../icons/facebook.png";
import google from "../icons/google.png";
import logo from "../icons/logo.png";
import destination from "../icons/destination.png";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";
import { ZodError } from "zod";
import { login } from "../utils/validators";

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

  const handleChange = (e) => {
    //set ข้อมูลไปใน input
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //set error
    setErrorInput((prev) => ({ ...prev, [e.target.name]: " " }));
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true); // เริ่มการทำให้มัน loading เป็น true
      e.preventDefault(); //กันมัน refresh ข้อมูลเวลากด submit

      //validate
      login.parse(input);
      //ยิงของส่งไปหลังบ้านแล้ว หลังจากที่ผ่านการ validate
      const res = await actionLogin(input);
      console.log("login success");
      navigate("/home");

      await actionGetMe(res.token);
    } catch (error) {
      console.log(error);

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

  return (
    <>
      {/* header */}
      {/* Body  */}
      <div className="flex justify-center gap-20 h-175 items-center ">
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

        {/* Right */}
        <div className="flex flex-col h-150 w-150  items-center font-bold gap-1">
          <p className="text-4xl text-[#064D7E]">LOG IN</p>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col h-130 w-130 bg-[#EFF4F6] rounded-4xl items-center justify-center gap-10 ">
              {/* input + button */}
              <div className="flex flex-col items-center  gap-4">
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  placeholder="   Email Address"
                  className="bg-white border-4 border-[#086BAF] rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50 "
                />
                {errorInput.email && (
                  <p className="text-red-500 text-xs">{errorInput.email}</p>
                )}
                <input
                  name="password"
                  onChange={handleChange}
                  type="text"
                  placeholder="    Password"
                  className="bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
                />
                {errorInput.password && (
                  <p className="text-red-500 text-xs">{errorInput.password}</p>
                )}
                <button
                  disabled={isLoading}
                  className="btn border-0 rounded-xl text-2xl text-white w-80 h-15 bg-[#086BAF]"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  type="button"
                  className="btn border-0 rounded-xl text-2xl text-[#9BA2A5] h-15 w-80 bg-white "
                >
                  Sign Up
                </button>
              </div>
              {/* or using another platform */}
              <div className="flex flex-col justify-center gap-5">
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
                    src={google}
                    alt="google logo"
                    className="h-10 hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </form>
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

export default Login;
