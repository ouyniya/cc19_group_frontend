import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ImageUploader from "react-images-upload";
import { motion } from "framer-motion";
import useLocationStores from "../stores/useLocationStores";
import usePostStores from "../stores/usePostStores";
import MapCanvas from "../components/MapCanvas";
import { Trash, Undo2, User } from "lucide-react";
import { createAlert } from "../utils/createAlert";
import useUserStore from "../stores/userStore";
import * as toxicity from "@tensorflow-models/toxicity";
import "@tensorflow/tfjs";

// for check img before uploading
import * as nsfwjs from "nsfwjs";
import { Buffer } from "buffer";
import { createPostSchema } from "../utils/validators";

window.Buffer = Buffer;

function CreatePostPage() {
  // Zustand Stores
  const navigate = useNavigate();

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

  // safe image
  const [isSafe, setIsSafe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [province, setProvince] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(true);
  const [district, setDistrict] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [file, setFile] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  const [model, setModel] = useState(null);
  const [isToxic, setIsToxic] = useState(false);
  const [loadingModel, setLoadingModel] = useState(true);
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

  const [inputError, setInputError] = useState({
    title: "",
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    provinceId: "",
    districtId: "",
    content: "",
    budget: "",
  });

  const initialInputError = {
    title: "",
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    provinceId: "",
    districtId: "",
    content: "",
    budget: "",
  };

  useEffect(() => {
    const loadToxicityModel = async () => {
      const loadedModel = await toxicity.load(0.9);
      setModel(loadedModel);
      setLoadingModel(false);
    };
    loadToxicityModel();
  }, []);

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

  const checkToxicity = async (text) => {
    if (!model) return false;
    const predictions = await model.classify([text]);
    return predictions.some((p) => p.results.some((r) => r.match));
  };

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
    setInputError(initialInputError);
    setSelectedProvince("");
    setFile([]);
    setLatitude(null);
    setLongitude(null);
    setProvinceSelected(true);
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
  const onDrop = async (pictureFiles, pictureDataURLs) => {
    if (pictureFiles.length > 0) {
      // console.log("Files selected:", pictureFiles);
      setFile(pictureFiles);
      setPreviewImageUrl(pictureDataURLs);

      const nsfwModel = await nsfwjs.load();

      const results = await Promise.all(
        pictureFiles.map((file) => classifyImage(nsfwModel, file))
      );

      const safeImages = pictureFiles.filter((_, index) => results[index]);
      const hasUnsafeImage = results.includes(false);

      if (hasUnsafeImage) {
        createAlert("error", "NSFW content detected! Some images are removed.");
      }

      setFile(safeImages);
      setIsSafe(safeImages.length === pictureFiles.length);
    } else {
      setIsSafe(true);
      setFile([]);
    }
  };

  // Function to classify image using NSFW model
  const classifyImage = async (model, file) => {
    return new Promise((resolve) => {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      img.onload = async () => {
        try {
          const results = await model.classify(img);
          // console.log("Scanning completed", results);

          const nsfwResult = results.some(
            (p) =>
              (p.className === "Porn" && p.probability > 0.1) ||
              (p.className === "Hentai" && p.probability > 0.05)
          );

          resolve(!nsfwResult); // true = safe, false = NSFW
        } catch (error) {
          console.error("Error classifying image:", error);
          resolve(false); // Assume unsafe if an error occurs
        } finally {
          URL.revokeObjectURL(imageUrl);
        }
      };

      img.onerror = () => {
        console.error("Failed to load image for scanning");
        resolve(false); // Assume unsafe if image fails to load
      };
    });
  };

  // console.log(file);
  const hdlAddPost = async (e) => {
    e.preventDefault();
    if (!isSafe) {
      createAlert(
        "error",
        "NSFW content detected! Please choose a different image."
      );
      return;
    }

    const foundToxic = await checkToxicity(input.content);
    if (foundToxic) {
      createAlert("error", "❌ Inappropriate content detected! Please revise.");
      setIsToxic(true);
      return;
    }

    try {
      const validatedInput = {
        ...input,
        budget: Number(input.budget), // Convert budget to number
        latitude: Number(input.latitude), // Convert latitude to number
        longitude: Number(input.longitude), // Convert longitude to number
        provinceId: Number(input.provinceId), // Convert provinceId to number
        districtId: Number(input.districtId), // Convert districtId to number
      };

      // Validate the input using Zod schema
      createPostSchema.parse(validatedInput);

      let formData = new FormData();
      console.log(input);
      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });

      file.forEach((el) => {
        formData.append("images", el);
      });

      await actionAddPost(formData);
      // createAlert("success", "Post created successfully!");
      navigate("/user/success-post");
    } catch (error) {
      // console.log(error);
      const errMsg = error.errors.reduce((acc, cur) => {
        acc[cur.path] = cur.message;
        return acc;
      });
      createAlert("info", errMsg.message);
      setInputError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(user)

  return (
    <>
      <div className="flex justify-evenly items-center text-slate-800 pb-25">
        <motion.div
          className="flex flex-col items-center w-[900px] rounded-xl bg-white"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-[#086BAF] font-bold text-3xl pt-20 pb-7"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Create Post
          </motion.p>
          <div className="flex justify-evenly w-[85%] gap-10 pt-15 pb-25">
            <div className="flex items-center flex-col basis-1/4">
              {user?.profileImage && !user?.isGoogleUser ? (
                <div className="flex overflow-hidden rounded-full w-50 h-50 justify-center items-center bg-gradient-to-r from-blue-300 to-blue-200">
                  <motion.img
                    src={user?.profileImage}
                    alt="Profile"
                    className="object-cover w-full h-full"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              ) : (
                <div className="flex overflow-hidden rounded-full w-50 h-50 justify-center items-center bg-gradient-to-r from-blue-300 to-blue-200">
                  <User size={100} color="white" />
                </div>
              )}

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
              {/* check img */}

              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-[#086BAF]">
                  Image Upload
                </h2>
                <p className="text-xs">Add an Image to Your Post</p>

                <ImageUploader
                  withIcon={true}
                  withPreview={true}
                  buttonText="Choose images"
                  onChange={onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".webp", "jpeg"]}
                  maxFileSize={5242880}
                  deleteIcon={<Trash />}
                  buttonStyles={{ backgroundColor: "#086BAF" }}
                />
                {/* 
                {file.length > 0 && (
                  <NsfwScanner
                    imageFile={file[0]}
                    onScanComplete={handleScanComplete}
                  />
                )} */}
              </div>

              {/* <NsfwScanner /> */}

              {/* <motion.div
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
                </div> */}

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
                </motion.div> 
              </motion.div> */}

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
                  placeholder="Please fill your title"
                  value={input.title}
                  onChange={(e) => {
                    setInput({ ...input, title: e.target.value });
                    setInputError(initialInputError);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {inputError.title && (
                  <span className="text-xs text-red-500">
                    {inputError.title}
                  </span>
                )}
                {inputError?.message?.includes("Title") && (
                  <span className="text-xs text-red-500">
                    {inputError.message}
                  </span>
                )}

                <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                  Content
                </p>

                <motion.textarea
                  className="bg-white rounded-xs h-30 w-full border-1 border-[#9BA2A5] p-2"
                  placeholder="Content"
                  value={input.content}
                  onChange={(e) => {
                    setInput({ ...input, content: e.target.value });
                    setInputError(initialInputError);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {inputError.content && (
                  <span className="text-xs text-red-500">
                    {inputError.content}
                  </span>
                )}
                {inputError?.message?.includes("Content") && (
                  <span className="text-xs text-red-500">
                    {inputError.message}
                  </span>
                )}

                <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                  Budget
                </p>
                <motion.input
                  type="number"
                  className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                  placeholder="Budget"
                  value={input.budget}
                  onChange={(e) => {
                    setInput({ ...input, budget: e.target.value });
                    setInputError(initialInputError);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {inputError.budget && (
                  <span className="text-xs text-red-500">
                    {inputError.budget}
                  </span>
                )}
                {inputError?.message?.includes("Budget") && (
                  <span className="text-xs text-red-500">
                    {inputError.message}
                  </span>
                )}

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
                {inputError.name && (
                  <span className="text-xs text-red-500">
                    {inputError.name}
                  </span>
                )}
                {inputError?.message?.includes("Name") && (
                  <span className="text-xs text-red-500">
                    {inputError.message}
                  </span>
                )}

                <p className="font-bold text-lg text-[#086BAF] mt-2 -mb-3">
                  Location description
                </p>
                <motion.textarea
                  className="bg-white rounded-xs h-30 w-full border-1 border-[#9BA2A5] p-2"
                  placeholder="Description"
                  value={input.description}
                  onChange={(e) => {
                    setInput({ ...input, description: e.target.value });
                    setInputError(initialInputError);
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {inputError.description && (
                  <span className="text-xs text-red-500">
                    {inputError.description}
                  </span>
                )}
                {inputError?.message?.includes("Description") && (
                  <span className="text-xs text-red-500">
                    {inputError.message}
                  </span>
                )}

                <div className="flex gap-2">
                  <div className="basis-1/2">
                    <select
                      id="province"
                      defaultValue={"Select Province"}
                      // value={selectedProvince}
                      onChange={handleProvinceChange}
                      className="bg-white rounded-xs h-10 w-full border-1 border-[#9BA2A5] p-2"
                    >
                      <option
                        disabled={true}
                        selected={provinceSelected}
                        value="Select Province"
                      >
                        Select Province
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
                      onChange={(e) => {
                        setInput({ ...input, districtId: e.target.value });
                        setInputError(initialInputError);
                      }}
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
                {inputError["provinceId,districtId"] && (
                  <span className="text-xs text-red-500">
                    {inputError["provinceId,districtId"]}
                  </span>
                )}
                {inputError?.message?.includes("provinceId,districtId") && (
                  <span className="text-xs text-red-500">
                    {inputError.message}
                  </span>
                )}

                <div className="mt-2 bg-blue-50 h-100 w-140">
                  <MapCanvas
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                  />
                </div>
                {inputError["latitude,longitude"] && (
                  <span className="text-xs text-red-500">
                    {inputError["latitude,longitude"]}
                  </span>
                )}
                {inputError?.message?.includes("Latitude and Longitude") && (
                  <span className="text-xs text-red-500">
                    {inputError.message}
                  </span>
                )}

                <motion.button
                  onClick={hdlAddPost}
                  disabled={!isSafe}
                  type="submit"
                  className={`mt-4 p-3 rounded-xl text-white font-bold ${
                    isSafe || !file
                      ? "bg-[#086BAF]"
                      : "bg-red-500 cursor-not-allowed"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSafe || !file ? "Create Post" : "NSFW Content Detected!"}
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
