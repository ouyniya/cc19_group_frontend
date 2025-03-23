import React, { useRef, useState } from "react";
import picture from "../../icons/picture.png";
import useUserStore from "../../stores/userStore";
import { Axios, AxiosError } from "axios";
import { createAlert } from "../../utils/createAlert";
import { User } from "lucide-react";

function ChangeProfile() {
  const actionUpdateProfileImage = useUserStore(
    (state) => state.actionUpdateProfileImage
  );
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);
  const user = useUserStore((state) => state.user);

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickCancel = () => {
    document.getElementById("profile_image_modal").close();
    setPreviewImageUrl(null);
  };

  // Save profile image to backend
  const handleSave = async () => {
    try {
      setIsLoading(true);
      let data = new FormData();
      if (file) {
        data.append("profileImage", file);
      }

      await actionUpdateProfileImage(data);
      await getCurrentUser();
      document.getElementById("profile_modal").close();

      handleClickCancel();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log("axiosError", error.response.data);
        createAlert("error", error.response?.data?.message || "Update failed");
      }
    } finally {
      setIsLoading(false);
      createAlert("success", "Profile updated successfully");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-6">
      {/* Current Profile Section */}
      <div className="flex flex-col items-center mb-8 w-full">
        <h2 className="text-2xl font-semibold mb-4">Profile Photo</h2>
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
          {!user?.profileImage || user?.isGoogleUser ? (
            <div className="flex overflow-hidden rounded-full w-full h-full justify-center items-center bg-gradient-to-r from-blue-300 to-blue-200">
              <User size={50} color="white" />
            </div>
          ) : (
            <img
              src={user?.profileImage || "https://via.placeholder.com/150"}
              alt="Current profile"
              className="w-full h-full object-cover"
            />
          )}

          <div
            className="absolute inset-0 bg-sky-800 bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-75 transition-opacity duration-200 cursor-pointer"
            onClick={() =>
              document.getElementById("profile_image_modal").showModal()
            }
          >
            <span className="text-white font-medium">Change</span>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={() =>
          document.getElementById("profile_image_modal").showModal()
        }
        className="px-4 py-2 hover:cursor-pointer text-white rounded-lg bg-gradient-to-b from-[var(--btnMain)] to-sky-600 hover:bg-sky-600 transition-colors duration-200 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Upload New Photo
      </button>

      {/* Modal Dialog */}
      <dialog
        id="profile_image_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white rounded-lg p-6">
          <h3 className="font-bold text-xl mb-4">Update Profile Photo</h3>

          {/* Preview Section */}
          <div className="flex justify-center mb-6">
            {previewImageUrl ? (
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-100">
                <img
                  src={previewImageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer mb-6"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={picture}
              alt="Upload icon"
              className="w-12 h-12 mb-4 opacity-70"
            />
            <p className="text-lg font-medium mb-1">Upload a photo</p>
            <p className="text-sm text-gray-500 mb-2">or drop your file here</p>
            {errorInput && (
              <p className="text-red-500 text-sm mt-1">{errorInput}</p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              onClick={(e) => (fileInputRef.current.value = "")}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 hover:cursor-pointer bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              onClick={handleClickCancel}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 hover:cursor-pointer bg-gradient-to-b from-[var(--btnMain)] to-sky-600 hover:bg-sky-600 text-white rounded-lg ${
                isLoading ? "opacity-70" : "hover:bg-blue-700"
              } transition-colors duration-200 flex items-center`}
              onClick={handleSave}
              disabled={isLoading || !file}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ChangeProfile;
