import React from "react";
import profile from "../../pictures/profile.png";
import map from "../../icons/map.png";
import picture from "../../icons/picture.png";
import trash from "../../icons/trash.png";

function CreatePost() {
  return (
    <div>
      <div>
        <p className="text-[#086BAF]  font-bold ml-50 ">CREATED POST</p>
      </div>
      {/* post detail */}
      <div className="flex mt-5">
        {/* left */}
        <div className="flex flex-col">
          <img src={profile} alt="" className="h-30 w-30 rounded-full" />
          <p className="text-[#086BAF] font-bold ml-3">Moana Stair</p>
          <p className="text-[#086BAF] ml-3">@MoanaSTR</p>
        </div>
        {/* Right */}
        <div>
          <form action="">
            <div className="flex flex-col gap-2 ml-5 ">
              <p className="font-bold text-lg text-[#086BAF]">Title</p>
              <input
                type="text"
                className="bg-white rounded-xs h-10 w-70 border-1 border-[#9BA2A5] "
                placeholder="   Please fill your title"
              />

              <p className="font-bold  text-lg text-[#086BAF] mt-2"> Content</p>
              <input
                type="text"
                className="bg-white rounded-xs  h-20 w-70 border-1 border-[#9BA2A5] "
                placeholder="    "
              />
            </div>
            <div className="flex mt-5  gap-5">
              <div className="ml-5 border-1 border-dashed border-[#78AAD7] h-30 w-30"></div>
              <div className="flex flex-col">
                <p>Upload files</p>
                <div className="flex gap-2 mt-2">
                  <img src={picture} alt="" className="h-5" />
                  <p>ADDDd.jpg</p>
                  <img src={trash} alt="" className="h-6" />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5 gap-2 ">
              <button className="btn border-0 bg-[#086BAF] rounded-full text-white">
                Post
              </button>
              <button className="btn text-[#9BA2A5] bg-white border-2 border-[#086BAF] rounded-full">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
