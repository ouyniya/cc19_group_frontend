import React, { useEffect, useState, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../icons/logo.png";
import destination from "../icons/destination.png";
import useUserStore from "../stores/userStore";
import { Link, useNavigate } from "react-router";
import { ZodError } from "zod";
import { login } from "../utils/validators";
import { createAlert } from "../utils/createAlert";
import { KeyRound, Mail } from "lucide-react";
import { axios } from "../configs/axiosInstance";
import Swal from "sweetalert2";

const initialInput = {
  email: "",
  password: "",
};

function Login2() {
  const [input, setInput] = useState(initialInput);
  const [errorInput, setErrorInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const actionLogin = useUserStore((state) => state.actionLogin);
  const actionGetMe = useUserStore((state) => state.actionGetMe);
  const actionGetMeOrGoogleLogin = useUserStore(
    (state) => state.actionGetMeOrGoogleLogin
  );
  const verifyOTP = useUserStore((state) => state.verifyOTP);
  const resendOTP = useUserStore((state) => state.resendOTP);
  const resetOTPState = useUserStore((state) => state.resetOTPState);

  const baseUrl = axios.defaults.baseURL;

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const googleAuth = () => {
    window.open(`${baseUrl}/auth/google/callback`, "_self");
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorInput((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (input.email.trim() !== "voyager.cc19@gmail.com") {
    //   return Swal.fire({
    //     icon: "info",
    //     html: `
    //       Your account is not set up for <b>2FA authentication</b> yet. Please log in using the lower-security option.
    //       <br>
    //       <a href="/login-less-secure" autofocus><b>➔ Click here</b></a>
    //     `,
    //     showCloseButton: true,
    //     showCancelButton: true,
    //     focusConfirm: false,
    //     confirmButtonText: `
    //       <i class="fa fa-thumbs-up"></i> OK
    //     `,
    //     confirmButtonAriaLabel: "Thumbs up, great!",
       
    //   });
      
    //   // createAlert("info", "Your account is not set up for 2FA authentication yet. Please log in using the lower-security option.")
    // }

    try {
      setIsLoading(true);
      login.parse(input);
      const response = await actionLogin(input);

      // Check if OTP verification is required
      if (response && response.requiresOTP) {
        setShowOTP(true);
        setIsLoading(false);
        return;
      }

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

  // OTP input handling functions
  const handleInputChange = (index, event) => {
    const value = event.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only take the first character
    setOtp(newOtp);

    // Auto-focus next input field if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    // Move to previous input field on backspace if current field is empty
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");

    // Check if pasted content contains only numbers
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    for (let i = 0; i < pastedOtp.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedOtp[i];
      }
    }

    setOtp(newOtp);

    // Focus the next empty field or the last field if all are filled
    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setOtpError("Please enter all 6 digits");
      return;
    }

    setOtpError("");
    setIsLoading(true);

    try {
      await verifyOTP(otpValue);
      await actionGetMeOrGoogleLogin();
      createAlert("success", `Login Success`);
      navigate("/home");
    } catch (error) {
      setOtpError(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtpError("");
    setResendDisabled(true);
    setCountdown(60); // 60 seconds cooldown

    try {
      await resendOTP();
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
      createAlert("success", `OTP resent successfully`);
    } catch (error) {
      setOtpError(error.response?.data?.message || "Failed to resend OTP");
      setResendDisabled(false);
      setCountdown(0);
    }
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    resetOTPState();
  };

  // OTP verification UI
  const renderOTPForm = () => {
    return (
      <div className="flex flex-col min-h-100 py-13 bg-[#f4f9fb] rounded-4xl items-center justify-center gap-7 shadow-md">
        <div className="w-[360px]">
          <p className="text-4xl font-bold text-[#2f6b97] mb-7 text-center">
            Verify OTP
          </p>

          <p className="text-center mb-6 text-gray-600">
            We've sent a 6-digit OTP to <strong>{input.email}</strong>
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : null}
                className="w-12 h-12 text-center text-2xl border border-[#086BAF] rounded-md focus:outline-none focus:border-[#086BAF] focus:ring-1 focus:ring-[#086BAF]"
              />
            ))}
          </div>

          {otpError && (
            <div className="text-red-500 text-center mb-4">{otpError}</div>
          )}

          <button
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className="btn border-0 text-[18px] font-medium text-white w-full bg-[#086BAF] mt-2 h-[46px] rounded-lg shadow-sm hover:bg-sky-600 transition-all duration-500"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600">Didn't receive the code?</p>
            <button
              onClick={handleResendOTP}
              disabled={resendDisabled || isLoading}
              className="text-[#086BAF] hover:text-[#064D7E] disabled:text-gray-400"
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={handleBackToLogin}
              className="text-gray-600 hover:text-gray-800"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Login UI
  const renderLoginForm = () => {
    return (
      <div className="flex flex-col min-h-100 py-13 bg-[#f4f9fb] rounded-4xl items-center justify-center gap-7 shadow-md">
        <form onSubmit={handleSubmit} className="w-[360px]">
          <p className="text-4xl font-bold text-[#2f6b97] mb-7 text-center">
            Login
          </p>
          <div className="flex flex-col items-baseline gap-4">
            {/* Email */}
            <label className="input validator w-[360px]">
              <Mail color="lightgray" />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="mail@site.com"
                className="border-[#086BAF] py-4 input-lg placeholder:text-lg placeholder:font-medium"
                required
              />
            </label>
            <div
              className={`validator-hint ${
                errorInput.email ? "block" : "hidden"
              } -mt-2 text-red-500`}
            >
              {errorInput.email || "Enter valid email address"}
            </div>

            {/* Password */}
            <label className="input validator w-[360px]">
              <KeyRound color="lightgray" />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                required
                placeholder="password"
                minLength={6}
                className="border-[#086BAF] py-4 input-lg placeholder:text-lg placeholder:font-medium"
              />
            </label>
            <div
              className={`validator-hint ${
                errorInput.password ? "block" : "hidden"
              } -mt-2 text-red-500`}
            >
              {errorInput.password || "Must be more than 6 characters"}
            </div>

            {/* Login Button */}
            <button
              disabled={isLoading}
              className="btn border-0 text-[18px] font-medium text-white w-full bg-[#086BAF] mt-2 h-[46px] rounded-lg shadow-sm hover:bg-sky-600 transition-all duration-500"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            {/* <Link className="text-center w-full flex gap-2 justify-center" to="/login-less-secure">
            <p className=" text-sky-700">
              Lower-Security Login
              </p>
            </Link> */}
            {/* <input type="checkbox" className="checkbox checkbox-info" /> */}

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
            Sign In with Google
          </button>
        </div>
      </div>
    );
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
          {showOTP ? renderOTPForm() : renderLoginForm()}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#064D7E] h-20 flex justify-center items-center">
        <p className="text-blue-200">
          EST 1997 - Voyager website by CC19 student
        </p>
      </footer>
    </div>
  );
}

export default Login2;
