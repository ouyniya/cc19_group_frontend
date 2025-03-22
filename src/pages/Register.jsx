// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
// import FormInput from "../components/form/FormInput";
// import Buttons from "../components/form/Buttons";
// import logo from "../icons/logo.png";
// import destination from "../icons/destination.png";

// // validator
// import { registerSchema } from "../utils/validators";
// import { zodResolver } from "@hookform/resolvers/zod";
// import userApi from "../api/authApi";
// import { createAlert } from "../utils/createAlert";

// function Register() {
//   const { actionRegister } = userApi;
//   const { register, handleSubmit, formState, reset } = useForm({
//     resolver: zodResolver(registerSchema),
//   });
//   const { isSubmitting, errors } = formState;
//   const navigate = useNavigate();

//   const hdlSubmit = async (value) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     try {
//       await actionRegister(value);
//       reset();
//       createAlert("success", "Register success");
//       navigate("/login");
//     } catch (error) {
//       createAlert("info", error.response.data.message);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Body */}
//       <div className="flex flex-grow justify-center gap-20 items-center px-4">
//         {/* Left side */}
//         <div className="flex flex-col h-full min-w-100 w-150 gap-5">
//           <div className="flex flex-row mt-10">
//             <p className="text-6xl font-bold text-[#086FB6] ml-2">V</p>
//             <img src={logo} alt="logo voyager" className="w-22 -mt-4 -ml-1" />
//             <p className="text-6xl font-bold text-[#086FB6] -ml-2">YAGER</p>
//           </div>
//           <p className="text-[#78AAD7] text-xl ml-20 mr-15">
//             "This is a space where the spirit of adventure meets the art of
//             storytelling, inviting you to discover the world through our eyes."
//           </p>
//           <div className="flex justify-end mr-20">
//             <img src={destination} alt="destination logo" className="h-60" />
//           </div>
//         </div>

//         {/* Right (form) */}
//         <div className="flex flex-col h-full w-150 justify-center font-bold gap-1">
//           <div className="flex flex-col min-h-100 py-13 w-130 bg-[#f4f9fb] rounded-4xl items-center justify-center gap-7 shadow-md">
//             {/* 👇 Register title moved inside the box */}
//             <p className="text-4xl font-bold text-[#2f6b97] -mt-4 text-center">
//               Register
//             </p>

//             <form onSubmit={handleSubmit(hdlSubmit)} className="w-full px-8">
//               <div className="flex flex-col items-baseline gap-4">
//                 {/* 👇 Same spacing and layout as login */}
//                 <FormInput
//                   register={register}
//                   name="email"
//                   type="email"
//                   errors={errors}
//                 />
//                 <FormInput
//                   register={register}
//                   name="password"
//                   type="password"
//                   errors={errors}
//                 />
//                 <FormInput
//                   register={register}
//                   name="confirmPassword"
//                   type="password"
//                   errors={errors}
//                 />

//                 <div className="flex justify-center mt-6">
//                   <Buttons isSubmitting={isSubmitting} label="Register" />
//                 </div>

//                 <p
//                   className="text-sm text-blue-500 mt-3 text-center hover:underline cursor-pointer"
//                   onClick={() => navigate("/login")}
//                 >
//                   Already have an account? Login
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#064D7E] h-20 flex justify-center items-center">
//         <p className="text-blue-200">
//           EST 1997 - Voyager website by CC19 student
//         </p>
//       </footer>
//     </div>
//   );
// }

// export default Register;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/validators";
import logo from "../icons/logo.png";
import destination from "../icons/destination.png";
import { Mail, KeyRound } from "lucide-react";
import { createAlert } from "../utils/createAlert";
import userApi from "../api/authApi";

function Register() {
  const navigate = useNavigate();
  const { actionRegister } = userApi;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const hdlSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1000));
    try {
      await actionRegister(data);
      reset();
      createAlert("success", "Register success");
      navigate("/login");
    } catch (err) {
      createAlert("info", err?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow justify-center gap-20 items-center px-4">
        {/* Left Section */}
        <div className="flex flex-col h-full min-w-100 w-150 gap-5">
          <div className="flex flex-row mt-10">
            <p className="text-6xl font-bold text-[#086FB6] ml-2">V</p>
            <img src={logo} alt="logo voyager" className="w-22 -mt-4 -ml-1" />
            <p className="text-6xl font-bold text-[#086FB6] -ml-2">YAGER</p>
          </div>
          <p className="text-[#78AAD7] text-xl ml-20 mr-15">
            "This is a space where the spirit of adventure meets the art of
            storytelling, inviting you to discover the world through our eyes."
          </p>
          <div className="flex justify-end mr-20">
            <img src={destination} alt="destination logo" className="h-60" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col h-full w-150 justify-center font-bold gap-1">
          <div className="flex flex-col min-h-100 py-13 w-130 bg-[#f4f9fb] rounded-4xl items-center justify-center gap-7 shadow-md">
            <form onSubmit={handleSubmit(hdlSubmit)}>
              <p className="text-4xl font-bold text-[#2f6b97] mb-7 text-center">
                Register
              </p>
              <div className="flex flex-col items-baseline gap-4 w-[400px]">
                {/* Email */}
                <label
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 bg-white w-full ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus-within:ring-2 focus-within:ring-[#086BAF] transition`}
                >
                  <Mail color="lightgray" />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="mail@site.com"
                    className="w-full outline-none bg-transparent placeholder:text-gray-400"
                  />
                </label>
                {errors.email && (
                  <p className="text-sm text-red-500 font-normal">
                    {errors.email.message}
                  </p>
                )}

                {/* Password */}
                <label
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 bg-white w-full ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus-within:ring-2 focus-within:ring-[#086BAF] transition`}
                >
                  <KeyRound color="lightgray" />
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="password"
                    className="w-full outline-none bg-transparent placeholder:text-gray-400"
                  />
                </label>
                {errors.password && (
                  <p className="text-sm text-red-500 font-normal">
                    {errors.password.message}
                  </p>
                )}

                {/* Confirm Password */}
                <label
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 bg-white w-full ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus-within:ring-2 focus-within:ring-[#086BAF] transition`}
                >
                  <KeyRound color="lightgray" />
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="confirm password"
                    className="w-full outline-none bg-transparent placeholder:text-gray-400"
                  />
                </label>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 font-normal">
                    {errors.confirmPassword.message}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[46px] rounded-lg bg-[#086BAF] text-white text-[18px] font-medium shadow-sm hover:bg-sky-600 transition duration-300 disabled:opacity-60"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>

                <p
                  className="text-sm text-blue-500 mt-2 text-center hover:underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Login
                </p>
              </div>
            </form>
          </div>
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

export default Register;
