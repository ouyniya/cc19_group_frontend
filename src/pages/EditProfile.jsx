import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Edit2Icon, Camera, Save, X, User } from "lucide-react";
import useUserStore from "../stores/userStore";
import { updateProfile } from "../utils/validators";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { createAlert } from "../utils/createAlert";
import ChangeProfile from "../components/UserDashboard/ChangeProfile";
import { div } from "@tensorflow/tfjs-core";

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
      updateProfile.parse(input);
      if (
        input.username.trim() === user.username.trim() &&
        input.email.trim() === user.email.trim()
      ) {
        return createAlert("info", "Nothing changed.");
      }

      await actionUpdateProfileInfo(input);
      await getCurrentUser();
      createAlert("success", "Profile updated successfully");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log("error axios", error.response.data);
      }
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
  };

  // console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-[var(--btnMain)] to-sky-600 py-6 px-8">
          <h1 className="text-2xl font-bold text-white text-center">
            Edit Profile
          </h1>
        </div>

        <div className="p-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-md bg-blue-50">
                  {!user?.profileImage || user?.isGoogleUser ? (
                    <div className="flex overflow-hidden rounded-full w-full h-full justify-center items-center bg-gradient-to-r from-blue-300 to-blue-200">
                    <User size={50} color="white" />
                  </div>
                  ) : (
                    <img
                      src={user?.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <button
                  onClick={() =>
                    document.getElementById("profile_modal").showModal()
                  }
                  className="absolute bottom-0 right-0 p-2 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-all transform hover:scale-105"
                >
                  <Camera size={18} />
                </button>
              </div>
              <p className="mt-4 text-sky-600 font-medium">{user?.username}</p>
            </div>

            {/* Form Section */}
            <div className="flex-1 w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      minLength="3"
                      maxLength="30"
                      value={input.username}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all focus:outline-none"
                      placeholder="Your username"
                    />
                    {inputError.username && (
                      <p className="mt-1 text-sm text-red-500">
                        {inputError.username}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Must be 3 to 30 characters
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={input.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all focus:outline-none"
                      placeholder="mail@example.com"
                    />
                    {inputError.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {inputError.email}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Enter a valid email address
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center px-6 py-2.5 border border-gray-300 shadow-sm rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-2.5 bg-gradient-to-b from-[var(--btnMain)] to-sky-600 hover:bg-sky-600 text-white font-medium rounded-full shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <Save size={16} className="mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image Change Modal */}
      <dialog id="profile_modal" className="modal">
        <div className="modal-box max-w-md bg-white rounded-2xl p-6">
          <form method="dialog" className="absolute right-4 top-4">
            <button className="btn btn-sm btn-circle bg-gray-100 hover:bg-gray-200 border-none text-gray-500">
              ✕
            </button>
          </form>
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Change Profile Picture
          </h3>
          <div>
            <ChangeProfile />
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default EditProfile;
