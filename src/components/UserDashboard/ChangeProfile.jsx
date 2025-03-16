import React, { useRef, useState } from "react";
import picture from "../../icons/picture.png";
import useUserStore from "../../stores/userStore";
import { Axios, AxiosError } from "axios";
import { createAlert } from "../../utils/createAlert";

function ChangeProfile() {
  const actionUpdateProfileImage = useUserStore(
    (state) => state.actionUpdateProfileImage
  );
  const getCurrentUser = useUserStore(
    (state) => state.getCurrentUser
  );
  const user = useUserStore(
    (state) => state.user
  );


  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State สำหรับควบคุม modal
  const [isLoading, setIsLoading] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file)
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
    document.getElementById("my_modal_5").close();
    setPreviewImageUrl(null);
  };

  // ปุ่ม Save รูป profileImage เข้า backend
  const handleSave = async () => {
    try {
      setIsLoading(true);
      let data = new FormData();
      if (file) {
        // console.log(file)
        data.append("profileImage", file);
      }

      await actionUpdateProfileImage(data);
      await getCurrentUser();
      // console.log("update profile success");
      createAlert("success", "update profile success")

      handleClickCancel();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log("axiosError", error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("previewImageUrl", previewImageUrl);

  return (
    <div className=" w-100 h-50 flex gap-5 mt-5 ml-5">
      <div className="h-25 w-25 mt-5 rounded-full overflow-hidden">
        {previewImageUrl && (
          <img
            src={previewImageUrl}
            alt="Preview"
            className="w-full h-full object-cover "
          />
        )}
      </div>
      <div className="flex flex-col font-bold text-[#086BAF]">
        <p>Upload new photo</p>
        <div
          onClick={openModal}
          className=" border-dashed border-1 border-gray-400 h-30 w-60 mt-2 "
        >
          <label htmlFor="file-input" className="cursor-pointer">
            <img
              onClick={() => (fileInputRef.current.value = "")}
              src={picture}
              alt=""
              className="w-8 mt-8 ml-23 opacity-70 "
            />
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            id="file-input"
            className="hidden"
            accept="image/*"
          />

          <div className="flex gap-1 mt-5 ml-2">
            <p className=" text-[#086BAF]">Upload</p>
            <p className="text-gray-400">or drop your file here </p>
          </div>
          {/* button */}
          <div className="flex gap-2 mt-5 justify-center">
            <button
              disabled={isLoading}
              onClick={handleSave}
              className="btn bg-[#086BAF] rounded-4xl text-white"
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
            <button
              onClick={handleClickCancel}
              className="btn bg-white border-1 border-[#086BAF] rounded-4xl text-[#9BA2A5]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfile;
