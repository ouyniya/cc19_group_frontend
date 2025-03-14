import React, { useState } from "react";
import CommentList from "./CommentList";
import {FaLink, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PostPage = ({ postId }) => {
  const images = [
    "https://picsum.photos/id/10/1000",
    "https://picsum.photos/id/12/1000",
    "https://picsum.photos/id/13/1000",
    "https://picsum.photos/id/14/1000",
  ];
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
          The Bluest Blue Sea in Maldives
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
      <div className="flex justify-center mt-5 border-b pb-2 space-x-6 text-gray-600">
      </div>

      {/* Middle Post */}
      <div className="mt-6 text-black ml-20">
        <h2 className="text-xl font-semibold text-blue-700 ">About</h2>
        <p className="mt-2">
          This location is a stunning tropical paradise in the Indian Ocean.
          Explore breathtaking coral reefs, exotic marine life, and luxurious
          resorts with crystal-clear waters.
        </p>

        <h3 className="text-lg font-semibold text-blue-700 mt-4">Highlights</h3>
        <ul className="list-disc pl-5">
          <li>Scuba diving & snorkeling</li>
          <li>Luxury beach resorts</li>
          <li>Local culture & seafood markets</li>
          <li>Sunset dolphin cruises</li>
          <li>Private island experiences</li>
        </ul>
      </div>

      {/* Footer Post */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-blue-700">Fly me to Maldives</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2">
            <img
              src="https://picsum.photos/id/124/1000/500"
              alt="Post Image"
              className="rounded-lg w-full object-cover"
            />
            <p className=" text-black mt-2">
              Experience the best of the Maldives through stunning beach
              resorts, water villas, and world-class diving spots.
            </p>
          </div>
          {/* Suggestion Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700 ml-20">Suggestion</h3>
            <div className="space-y-3 mt-2 ml-20">
              <img
                src="https://picsum.photos/id/154/1000/500"
                alt="Related Post"
                className="rounded-lg w-full object-cover"
              />
              <img
                src="https://picsum.photos/id/177/1000/500"
                alt="Related Post"
                className="rounded-lg w-full object-cover"
              />
              <img
                src="https://picsum.photos/id/211/1000/500"
                alt="Related Post"
                className="rounded-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <section>
          <h2 className="text-xl font-semibold text-blue-700">Comments</h2>
          <CommentList postId={postId} />
        </section>
      </div>
  );
};

export default PostPage;
