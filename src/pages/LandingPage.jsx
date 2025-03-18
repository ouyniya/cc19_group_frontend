import React from "react";
import { useNavigate } from "react-router";
import Experience from "../pictures/Experience.png";
import { motion } from "motion/react";
import plane from "../icons/plane.png";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Experience})` }}
    >
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mt-45 text-center">
          <h1 className="text-6xl font-bold text-white mb-4 ">Experience</h1>
          <h1 className="text-6xl font-bold text-white mb-4 ">
            The best trip ever
          </h1>
          <p className="mt-5 ml-10 text-lg text-white ">
            "This is a space where the spirit of adventure meets the art of
            storytelling,
          </p>
          <p className="mt-1 text-lg ml-11 text-white">
            inviting you to discover the world through our eyes."
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => navigate("/home")}
            className=" glass mt-50 rounded-full bg-[#5A7184] py-3 px-8 text-xl font-bold text-white transition-all duration-300 hover:bg-[#4A6174] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Start Your Journey!
          </motion.button>
        </div>
        <div className="flex h-45 w-45">
          <motion.img
            src={plane}
            className="-mt-110 ml-170 w-full h-full opacity-70"
            initial={{ x: -500, y: -400, rotate: -10 }}
            animate={{ x: 90, y: -100, rotate: 0 }} // ปรับปรุงตำแหน่งสุดท้ายและหมุน
            transition={{
              duration: 2, // ปรับปรุง duration
              ease: "easeOut", // ปรับปรุง easing function
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
