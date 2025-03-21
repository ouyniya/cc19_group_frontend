import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import {
  FaLink,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import useLocationStores from "../stores/usePublicPostStores";
import { useNavigate } from "react-router";
import MapCanvasShow from "./MapCanvasShow";
import view from "../icons/view.png";

const PostPage = ({ postId }) => {
  const actionGetPostByPostId = useLocationStores(
    (state) => state.actionGetPostByPostId
  );
  const navigate = useNavigate();
  const publicPost = useLocationStores((state) => state.publicPost);
  const postImage = useLocationStores((state) => state.postImage);

  useEffect(() => {
    callPost();
  }, []);

  const callPost = async () => {
    await actionGetPostByPostId(postId);
  };

  let postImages = postImage ? postImage.map((el) => el?.url) : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? postImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === postImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  console.log(publicPost);
  let latitude = publicPost?.post?.place?.latitude;
  let longitude = publicPost?.post?.place?.longitude;

  // console.log(latitude)

  return (
    <div className="mx-auto w-full max-w-5xl p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {publicPost?.post?.title}
        </h1>
        <div className="flex gap-1">
          <img src={view} alt="view icon" className="w-6 h-6" />
          <p className="text-gray-500 flex items-center">
            {new Intl.NumberFormat("ja-JP", {}).format(publicPost?.post?.view)}
          </p>
        </div>
      </div>

      <div className="flex items-center mt-4">
        <FaUser className="text-gray-600 mr-2" />
        <span
          className="text-sky-600 cursor-pointer"
          onClick={() =>
            navigate(`/user-dashboard/${publicPost?.post?.userId}`)
          }
        >
          {publicPost?.post?.user?.username}
        </span>
      </div>

      {/* Image Slider */}
      <div className="relative flex justify-center items-center mt-6">
        <button
          onClick={prevImage}
          className="absolute left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg opacity-80"
        >
          <FaChevronLeft size={24} />
        </button>
        <img
          src={
            postImages[currentImageIndex] ||
            "https://via.placeholder.com/800x400"
          }
          alt="Post Image"
          className="rounded-lg w-full max-w-3xl h-96 object-cover cursor-pointer"
          onClick={openPopup} // เปิด Popup เมื่อคลิกที่รูป
        />
        <button
          onClick={nextImage}
          className="absolute right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg opacity-80"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 bg-gray-700 text-white p-2 rounded-full shadow-lg"
            >
              <FaTimes size={24} />
            </button>
            <img
              src={postImages[currentImageIndex]}
              alt="Expanded Post Image"
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Location and Budget Section */}
      <div className="mt-4 flex items-center justify-between text-gray-600">
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-red-500 mr-2" />
          <span>
            {publicPost?.post?.place?.latitude} ,{" "}
            {publicPost?.post?.place?.longitude}
          </span>
        </div>
        <div className="font-semibold text-gray-600">
          Budget:
          {new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "THB",
          }).format(publicPost?.post?.budget)}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <div className="w-2/3 pr-4">
          <h2 className="text-xl font-semibold text-gray-700">Details</h2>
          <p className="mt-2 text-gray-600">{publicPost?.post?.content}</p>
        </div>
        <div className="w-[250px]">
          <MapCanvasShow latitude={latitude} longitude={longitude} />
        </div>
      </div>

      {/* Additional Images */}
      {publicPost?.postImage?.length > 0 && (
        <div className="my-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            More Photos
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {publicPost.postImage.map((el, index) => (
              <img
                key={index}
                src={el?.url}
                alt="Additional Image"
                className="rounded-lg object-cover w-full h-40 cursor-pointer"
                onClick={() => {
                  setCurrentImageIndex(index);
                  openPopup();
                }} // คลิกแล้วเปิด Popup
              />
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-700">Comments</h2>
        <CommentList postId={postId} />
      </section>
    </div>
  );
};

export default PostPage;
