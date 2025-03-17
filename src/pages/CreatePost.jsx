import React, { useEffect, useState } from "react";
import profile from "../pictures/profile.png";
import map from "../icons/map.png";
import picture from "../icons/picture.png";
import trash from "../icons/trash.png";
import uploading from "../icons/up-loading.png";
import MapCanvas from "../components/MapCanvas";
import useLocationStores from "../stores/useLocationStores";

function CreatePost() {
  const provinces = useLocationStores((state) => state.provinces);
  const districts = useLocationStores((state) => state.districts);
  const actionGetProvince = useLocationStores(
    (state) => state.actionGetProvince
  );
  const actionGetDistrict = useLocationStores(
    (state) => state.actionGetDistrict
  );

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    callActionGetProvince();
  }, []);

  useEffect(() => {
    setDistrict(districts); // Update local state when Zustand state changes
  }, [districts]);

  const callActionGetProvince = async () => {
    await actionGetProvince();
    setProvince(provinces);
  };

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);

    if (!provinceId) return;

    try {
      await actionGetDistrict(provinceId)
    } catch (error) {
      console.error("Error fetching districts", error);
    }
  };

  // console.log(district)

  return (
    <div className="flex justify-center  bg-blue-50 py-10">
      <div className="flex flex-col items-center w-250 rounded-4xl  mt-5 bg-white py-5 ">
        <div>
          <p className="text-[#086BAF]  font-bold text-3xl mt-10 ">
            CREATED POST
          </p>
        </div>
        {/* post detail */}
        <div className="flex mt-10 gap-15">
          {/* left */}
          <div className="flex flex-col">
            <img src={profile} alt="" className="h-50 w-50 rounded-full" />
            <p className="text-[#086BAF] text-2xl font-bold ml-10 mt-2">
              Moana Stair
            </p>
            <p className="text-[#086BAF] text-2xl  ml-10">@MoanaSTR</p>
          </div>
          {/* Right */}
          <div>
            <form action="">
              <div className="flex flex-col gap-2 ml-5 ">
                <p className="font-bold text-lg text-[#086BAF]">Title</p>
                <input
                  type="text"
                  className="bg-white rounded-xs h-10 w-120 border-1 border-[#9BA2A5] "
                  placeholder="   Please fill your title"
                />

                <p className="font-bold  text-lg text-[#086BAF] mt-2">
                  {" "}
                  Content
                </p>
                <input
                  type="text"
                  className="bg-white rounded-xs  h-20 w-120 border-1 border-[#9BA2A5] "
                  placeholder="    "
                />
              </div>
              <div className="flex mt-10  gap-8">
                <div className="flex flex-col items-center gap-2  ml-5 border-2 border-dashed border-[#78AAD7] h-45 w-80">
                  <img
                    src={uploading}
                    alt="uploading-icon"
                    className="h-7 mt-4"
                  />
                  <button className="btn bg-[#5CAFF0] mt-2 border-0 rounded-3xl text-white ">
                    Browse
                  </button>
                  <p className="text-[#5CAFF0]">drop a file here</p>
                  <p className="text-[#457BA6]">*File supported .png & .jpg</p>
                </div>
                <div className="flex flex-col">
                  <p className="-mt-5 font-bold text-[#086BAF]">Upload files</p>
                  <div className="flex gap-2 mt-2">
                    <img src={picture} alt="" className="h-5" />
                    <p className="text-[#457BA6]">ADDDd.jpg</p>
                    <img src={trash} alt="" className="h-6" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <img src={picture} alt="" className="h-5" />
                    <p className="text-[#457BA6]">ADDDd.jpg</p>
                    <img src={trash} alt="" className="h-6" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <img src={picture} alt="" className="h-5" />
                    <p className="text-[#457BA6]">ADDDd.jpg</p>
                    <img src={trash} alt="" className="h-6" />
                  </div>
                </div>
              </div>
              {/* map */}
              <div className="flex flex-col  ml-5 gap-2">
                <p className=" font-bold  text-lg text-[#086BAF] mt-5">
                  Location
                </p>
                <div className="flex gap-20 ">
                  <div className="flex flex-col">
                    <p className="   text-lg text-[#086BAF] mt-2">
                      Location name
                    </p>
                    <input
                      type="text"
                      className="bg-white rounded-xs h-10 w-60 border-1 border-[#9BA2A5] "
                      placeholder="   location name"
                    />
                  </div>

                  <div className="flex flex-col">
                    <p className="   text-lg text-[#086BAF] mt-2">
                      Description
                    </p>
                    <input
                      type="text"
                      className="bg-white rounded-xs h-10 w-60 border-1 border-[#9BA2A5] "
                      placeholder="   description"
                    />
                  </div>
                </div>
                <div className="flex gap-20">
                  <div className="flex flex-col w-60">
                    <p className="text-lg text-[#086BAF] mt-2">Province</p>
                    <select defaultValue="Pick a color" onChange={handleProvinceChange} className="select">
                      <option disabled={true} selected>
                        Pick a Province
                      </option>
                      {provinces &&
                        provinces?.map((el) => (
                          <option key={el.id} value={el.id}>{el.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className="flex flex-col w-60">
                    <p className="   text-lg text-[#086BAF] mt-2">District</p>
                    <select defaultValue="Pick a color" className="select">
                      <option disabled={true} selected>Pick a District</option>
                      {district?.length > 0 &&

                      district?.map((el) => (
                        <option key={el.id} value={el.id}>
                          {el.name}
                        </option>
                      ))

                      }
                    </select>
                  </div>
                </div>
                <p className="text-lg font-bold text-[#086BAF] mt-5">
                  Select location in Map
                </p>
                <div className="mt-2 bg-blue-50 h-100 w-140">
                  <MapCanvas />
                </div>
              </div>

              {/* button */}
              <div className="flex justify-center mt-10 gap-3 ">
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
    </div>
  );
}

export default CreatePost;
