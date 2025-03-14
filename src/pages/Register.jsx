import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import FormInput from "../components/form/FormInput";
import Buttons from "../components/form/Buttons";
import logo from "../icons/logo.png";
import destination from "../icons/destination.png";

// validator
import { registerSchema } from "../utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import userApi from "../api/authApi";
import { createAlert } from "../utils/createAlert";

function Register() {
  const { actionRegister } = userApi;
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const { isSubmitting, errors } = formState;
  // console.log(errors)
  const navigate = useNavigate();

  const hdlSubmit = async (value) => {
    //   e.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const res = await actionRegister(value);
      reset();
      // console.log("register success");
      createAlert("success", "Register success");
      navigate("/login");
    } catch (error) {
      // console.log(error.response.data.message);
      createAlert("info", error.response.data.message);
    }
  };

  return (
    <>
      {/* header */}

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

            <form onSubmit={handleSubmit(hdlSubmit)}>
              <div className="flex flex-col items-center  gap-4">
                <FormInput
                  register={register}
                  name="email"
                  type="email"
                  errors={errors}
                />
                <FormInput
                  register={register}
                  name="password"
                  type="password"
                  errors={errors}
                />
                <FormInput
                  register={register}
                  name="confirmPassword"
                  type="password"
                  errors={errors}
                />
                {/* 
                <input
                  onChange={handleChange}
                  name="email"
                  type="text"
                  placeholder="Email Address"
                  className="-mt-10 bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
                  value={input.email}
                />
                <input
                  onChange={handleChange}
                  name="password"
                  type="text"
                  placeholder="Password"
                  className="mt-2 bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
                  value={input.password}
                />
                <input
                  onChange={handleChange}
                  name="confirmPassword"
                  type="text"
                  placeholder="Confirm Password"
                  className="mt-2 bg-white border-4 border-[#086BAF]  rounded-xl h-15 w-80 placeholder:text-xl placeholder:opacity-50  "
                  value={input.confirmPassword}
                /> */}

                {/* Button */}
                <div className="flex mt-10 gap-5">
                  <Buttons isSubmitting={isSubmitting} label="Register" />
                  {/* <button
                    type="button"
                    onClick={handleCancel}
                    className="btn border-0 rounded-xl text-2xl text-[#9BA2A5] h-15  bg-white "
                  >
                    Cancel
                  </button> */}
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
