import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { FaLink, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useLocationStores from "../stores/usePublicPostStores";

const PostPage = ({ postId }) => {

  const actionGetPostByPostId = useLocationStores(
    (state) => state.actionGetPostByPostId
  );
  const publicPost = useLocationStores((state) => state.publicPost);
  const postImage = useLocationStores((state) => state.postImage);

  // get post
  useEffect(() => {
    callPost();
  }, []);

  const callPost = async () => {
    await actionGetPostByPostId(postId);
  };

  // post image
  let postImages = [];

  if (postImage) {
    postImages = postImage?.map((el) => el?.url);
  }

  // console.log(publicPost);

  const images = postImages;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className=" mx-auto w-full p-6 bg-white">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-700 flex justify-center">
          {publicPost?.post?.title}
          <a href="#" className="text-gray-500 ml-2">
            <FaLink />
          </a>
        </h1>
      </div>

      {/* Image Slider */}
      <div className="relative flex justify-center items-center mt-6">
        <button
          onClick={prevImage}
          className="absolute left-20 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        >
          <FaChevronLeft size={24} />
        </button>
        <img
          src={images[currentImageIndex]}
          alt="Main Image"
          className="rounded-lg w-full max-w-3xl h-72 object-cover"
        />
        <button
          onClick={nextImage}
          className="absolute right-20 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-5 border-b pb-2 space-x-6 text-gray-600"></div>

      {/* Middle Post */}
      <div className="mt-6 text-black ml-20">
        <h2 className="text-xl font-semibold text-blue-700 ">Content</h2>
        <p className="mt-2">{publicPost?.post?.content}</p>
      </div>

      <div className="my-6 h-10 mb-[150px]">
        <div className="flex gap-2">
          {publicPost
            ? publicPost?.postImage?.map((el, index) => (
                <div key={index} className="w-[300px]">
                  <img src={el?.url} />
                </div>
              ))
            : ""}
        </div>
      </div>

      {/* Footer Post */}
      {/* <div className="mt-10">
        <h2 className="text-xl font-bold text-blue-700">Fly me to Maldives</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2">
            <img
              src={""}
              alt="Post Image"
              className="rounded-lg w-full object-cover"
            />
            <p className=" text-black mt-2">
              Experience the best of the Maldives through stunning beach
              resorts, water villas, and world-class diving spots.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-700 ml-20">
              Suggestion
            </h3>
            <div className="space-y-3 mt-2 ml-20">
              <img
                src={""}
                alt="Related Post"
                className="rounded-lg w-full object-cover"
              />
              <img
                src={""}
                alt="Related Post"
                className="rounded-lg w-full object-cover"
              />
              <img
                src={""}
                alt="Related Post"
                className="rounded-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* Comments Section */}
      <section>
        <CommentList postId={postId} />
      </section>
    </div>
  );
};

export default PostPage;
