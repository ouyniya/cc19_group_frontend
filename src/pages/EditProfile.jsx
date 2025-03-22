import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import profile from "../pictures/profile.png";
import picture from "../icons/picture.png";
import ChangeProfile from "../components/UserDashboard/ChangeProfile";
import { updateProfile } from "../utils/validators";
import useUserStore from "../stores/userStore";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { createAlert } from "../utils/createAlert";
import { Edit2Icon } from "lucide-react";

function EditProfile() {
  const navigate = useNavigate();

  const actionUpdateProfileInfo = useUserStore(
    (state) => state.actionUpdateProfileInfo
  );
  const user = useUserStore((state) => state.user);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);

  const [input, setInput] = useState({
    username: user.username,
    email: user.email,
  });

  useEffect(() => {
    setInput({
      username: user.username,
      email: user.email,
    });
  }, [user]);

  const [inputError, setInputError] = useState({
    username: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //validate
      updateProfile.parse(input);
      if (
        input.username.trim() === user.username.trim() &&
        input.email.trim() === user.email.trim()
      ) {
        return createAlert("info", "Nothing changed.");
      }

      // connect to db
      await actionUpdateProfileInfo(input);
      await getCurrentUser();

      // console.log("Update success");
      createAlert("success", "Update success");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log("error axios", error.response.data);
      }
      // if (error instanceof ZodError) {
      //   const errMsg = error.errors.reduce((acc, cur) => {
      //     acc[cur.path] = cur.message;
      //     console.log(acc.email)
      //     createAlert(`info`, ` ${acc.email} `)
      //     return acc;
      //   }, {});
      //   setInputError(errMsg);
      //   return;
      // }
      if (error instanceof ZodError) {
        const errMsg = error.errors.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          createAlert(`info`, ` ${cur.message} `);
          return acc;
        }, {});
        setInputError(errMsg);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/user-dashboard/${user?.id}`);
    // setInput({
    //   username: user.username,
    //   email: user.email,
    // });
  };

  return (
    <div className="flex flex-col items-center mt-10 h-100 w-screen">
      <div className="bg-blue-50 px-20 py-10 rounded-4xl">
        <p className="font-bold text-2xl text-[#086BAF] mt-5 text-center">
          Edit Profile
        </p>
        <div className="flex h-80 w-120">
          {/* Left */}
          <div className="flex flex-col">
            <div className="w-30 h-30 rounded-full overflow-hidden mt-10">
              <img
                src={user?.profileImage}
                alt="Profile"
                className="w-full h-full object-cover" // Ensure the image fills the circle without distortion
              />
              <div className="flex flex-col ml-12 -mt-25">
                <div
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                >
                  <div className="btn btn-circle absolute left-2 bottom-100 badge badge-info">
                    <Edit2Icon size={16} color="white" />
                  </div>
                </div>
              </div>
            </div>
            {/* change photo icon */}
          </div>
          {/* Right */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 ml-5 mt-8">
              <p className="font-bold text-xl text-[#086BAF]">Username</p>
              <input
                type="text"
                className="text-black bg-white rounded-lg h-10 w-70 border-1 border-[#9BA2A5] pl-3"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={input.username}
              />
              {inputError.username && (
                <span className="text-xs text-red-500">
                  {inputError.username}
                </span>
              )}

              <p className="font-bold text-xl text-[#086BAF] mt-2">
                Email Address
              </p>
              <input
                type="text"
                className="text-black bg-white rounded-lg h-10 w-70 border-1 border-[#9BA2A5] pl-3"
                placeholder="Add your email address"
                name="email"
                onChange={handleChange}
                value={input.email}
              />
              {inputError.email && (
                <span className="text-xs text-red-500">{inputError.email}</span>
              )}
            </div>
            <div className="flex justify-center mt-8 gap-2 ">
              <button className="btn border-0 bg-[#086BAF] rounded-full text-white">
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn text-[#9BA2A5] bg-white border-2 border-[#086BAF] rounded-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        {/* Modal change profile */}
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box w-150">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <ChangeProfile />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default EditProfile;
