import React, { useEffect, useState } from "react";
import profile from "../pictures/profile.png";
import ImageUploader from "react-images-upload";
import { motion } from "framer-motion";
import useLocationStores from "../stores/useLocationStores";
import usePostStores from "../stores/usePostStores";
import MapCanvas from "../components/MapCanvas";
import { Undo2 } from "lucide-react";
import { createAlert } from "../utils/createAlert";
import useUserStore from "../stores/userStore";

function CreatePostPage() {
  // Zustand Stores
  const actionAddPost = usePostStores((state) => state.actionAddPost);
  const user = useUserStore((state) => state.user);
  const newPost = usePostStores((state) => state.newPost);
  const provinces = useLocationStores((state) => state.provinces);
  const districts = useLocationStores((state) => state.districts);
  const actionGetProvince = useLocationStores(
    (state) => state.actionGetProvince
  );
  const actionGetDistrict = useLocationStores(
    (state) => state.actionGetDistrict
  );

  // State Variables
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [file, setFile] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  const [input, setInput] = useState({
    title: "",
    name: "",
    description: "",
    latitude: latitude || null,
    longitude: longitude || null,
    provinceId: "",
    districtId: "",
    content: "",
    budget: "",
  });

  // console.log(input);

  useEffect(() => {
    callActionGetProvince();
  }, []);

  useEffect(() => {
    setDistrict(districts); // Update local state when Zustand state changes
  }, [districts]);

  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      latitude: latitude,
      longitude: longitude,
    }));
  }, [latitude, longitude]);

  const callActionGetProvince = async () => {
    await actionGetProvince();
    setProvince(provinces);
  };

  const handleReset = () => {
    setInput({
      title: "",
      name: "",
      description: "",
      latitude: null,
      longitude: null,
      provinceId: "",
      districtId: "",
      content: "",
      budget: "",
    });
    setSelectedProvince("");
    setFile([]);
    setLatitude(null);
    setLongitude(null);
  };

  // Handle Province Selection
  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setInput((prev) => ({ ...prev, provinceId }));

    if (!provinceId) return;

    try {
      await actionGetDistrict(provinceId);
    } catch (error) {
      console.error("Error fetching districts", error);
    }
  };

  // Handle Image Upload
  const onDrop = (pictureFiles, pictureDataURLs) => {
    setFile(pictureFiles);
    setPreviewImageUrl(pictureDataURLs);
  };

  // Handle Form Submission
  const hdlAddPost = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });

      file.forEach((el) => {
        formData.append("images", el);
      });

      await actionAddPost(formData);
      createAlert("success", "Post created successfully!");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      createAlert("info", errorMsg);
    }
  };

  return (
    <>
      <div className="flex justify-evenly items-center text-slate-800 pt-15 pb-25">
        <motion.div
          className="flex flex-col items-center w-[80%] min-w-[900px] max-w-[1200px] rounded-xl bg-white"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-[#086BAF] font-bold text-3xl pt-20"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Create Post
          </motion.p>
          <div className="flex justify-evenly w-[85%] gap-10 pt-15 pb-25">
            <div className="flex items-center flex-col basis-1/4">
              <div className="flex overflow-hidden rounded-full w-50 h-50 justify-center items-center">
                <motion.img
                  src={user?.profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <motion.p
                className="text-[#086BAF] text-2xl font-bold mt-2"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {user?.username}
              </motion.p>
              <motion.p
                className="text-[#086BAF] text-lg"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {user?.email}
              </motion.p>
            </div>

            <div className="flex flex-col basis-2/3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full mb-5">
                  <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText="Choose images"
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                    singleImage={false}
                    buttonClassName={"btn btn-info bg-blue-300"}
                    buttonStyles={{ backgroundColor: "#086BAF" }}
                    fileContainerStyle={{ backgroundColor: "#EFF4F6" }}
                  />
                </div>

                {/* <motion.div
                  className="mt-4 overflow-hidden"
                  drag="x"
                  dragConstraints={{ left: -200, right: 200 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex gap-2">
                    {previewImageUrl.map((url, index) => (
                      <motion.img
                        key={index}
                        src={url}
                        alt="Preview"
                        className="h-20 w-20 rounded-md"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </motion.div> */}
              </motion.div>

              <motion.form
                onSubmit={hdlAddPost}
                className="flex flex-col gap-5"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                  Title
                </p>
                <motion.input
                  type="text"
                  className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                  placeholder="   Please fill your title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, title: e.target.value })
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                  Content
                </p>

                <motion.textarea
                  className="bg-white rounded-xs h-30 w-full border-1 border-[#9BA2A5] p-2"
                  placeholder="Content"
                  value={input.content}
                  onChange={(e) =>
                    setInput({ ...input, content: e.target.value })
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                  Budget
                </p>
                <motion.input
                  type="number"
                  className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                  placeholder="Budget"
                  value={input.budget}
                  onChange={(e) =>
                    setInput({ ...input, budget: e.target.value })
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                  Location name
                </p>
                <motion.input
                  type="text"
                  className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                  placeholder="Name"
                  value={input.name}
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                  Location description
                </p>
                <motion.textarea
                  className="bg-white rounded-xs h-30 w-full border-1 border-[#9BA2A5] p-2"
                  placeholder="Description"
                  value={input.description}
                  onChange={(e) =>
                    setInput({ ...input, description: e.target.value })
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="flex gap-2">
                  <div className="basis-1/2">
                    <select
                      defaultValue="Pick a color"
                      onChange={handleProvinceChange}
                      className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                    >
                      <option disabled={true} selected>
                        Pick a Province
                      </option>
                      {provinces &&
                        provinces?.map((el) => (
                          <option key={el.id} value={el.id}>
                            {el.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="basis-1/2">
                    <motion.select
                      onChange={(e) =>
                        setInput({ ...input, districtId: e.target.value })
                      }
                      value={input.districtId}
                      className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <option value="">Select District</option>
                      {district.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {dist.name}
                        </option>
                      ))}
                    </motion.select>
                  </div>
                </div>

                <div className="mt-2 bg-blue-50 h-100 w-140">
                  <MapCanvas
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="bg-[#086BAF] text-white font-bold p-3 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Post
                </motion.button>
              </motion.form>
              <button
                onClick={handleReset}
                className="hover:link-error hover:cursor-grab mt-3"
              >
                <p className="flex gap-2 justify-center items-center">
                  <Undo2 />
                  Reset
                </p>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default CreatePostPage;
