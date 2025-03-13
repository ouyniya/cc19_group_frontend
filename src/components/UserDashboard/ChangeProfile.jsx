import React, { useRef, useState } from "react";
import picture from "../../icons/picture.png";

function ChangeProfile() {
  const fileInputRef = useRef(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State สำหรับควบคุม modal

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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

  return (
    <div className=" w-100 h-50 flex gap-5 mt-5 ml-5">
      <div className="h-25 w-25 rounded-full overflow-hidden">
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
            <img src={picture} alt="" className="w-8 mt-8 ml-23 opacity-70 " />
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
        </div>
      </div>
    </div>
  );
}

export default ChangeProfile;
