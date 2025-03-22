import React from "react";
import fuji2 from "../../pictures/fuji2.jpg";
import maldives from "../../pictures/maldives.png";
import paris from "../../pictures/paris.png";
import { motion } from "framer-motion"; // ✅ ใช้ framer-motion

// Mock Data
const posts = [
  {
    id: 1,
    image: fuji2,
    location: "Asia x Japan",
    title: "Fuji-san with a lot of sakura",
    createDate: "Jan 20, 2025",
  },
  {
    id: 2,
    image: paris,
    location: "Europe x France",
    title: "The magic of Paris",
    createDate: "Feb 14, 2025",
  },
  {
    id: 3,
    image: maldives,
    location: "Asia x Maldives",
    title: "The Bluest blue sea in Maldives",
    createDate: "Mar 29, 2025",
  },
];

// Motion Variants
const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } }, // ✅ รูปขยายเมื่อ Hover
};

const titleVariants = {
  initial: { y: 0, scale: 1, color: "#ffffff" },

};

function Post() {
  return (
    <div className="flex flex-row justify-center gap-6 px-5 mt-10">
      {posts.map((el) => (
        <motion.div
          key={el.id}
          className="relative w-96 h-96 overflow-hidden rounded-lg shadow-lg flex flex-col justify-end" // ✅ เพิ่ม `relative` และ `flex`
          initial="initial"
          whileHover="hover" // ✅ ทั้งรูปและข้อความจะเปลี่ยนพร้อมกัน
          variants={cardVariants}
        >
          {/* ✅ รูปภาพ */}
          <motion.img
            src={el.image}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />

          {/* ✅ กล่องข้อความที่อยู่ในแต่ละรูป */}
          <motion.div className="absolute bottom-0 left-0 w-full bg-black/30 text-white p-4 flex flex-col">
            <p className="text-lg">{el.location}</p>

            <motion.p
              className="font-bold text-xl"
              variants={titleVariants} // ✅ ใช้ Motion Variants
            >
              {el.title}
            </motion.p>

            <p className="text-sm">{el.createDate}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default Post;
