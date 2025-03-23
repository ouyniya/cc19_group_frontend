import React, { useEffect, useState } from "react";
import fuji2 from "../../pictures/fuji2.jpg";
import maldives from "../../pictures/maldives.png";
import paris from "../../pictures/paris.png";
import { motion } from "framer-motion"; // ✅ ใช้ framer-motion
import usePostStores from "../../stores/usePostStores";
import { Link } from "react-router";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const actionGetEachPost = usePostStores((state) => state.actionGetEachPost);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postIds = [78, 84, 31];
        const results = await Promise.all(
          postIds.map((id) => actionGetEachPost(id))
        );

        setPlaces(results); // Store the fetched posts in an array
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log(places);

  return (
    <div className="flex flex-row justify-center gap-6 px-5 mt-10">
      {places.map((el, index) => (
        <motion.div
          onClick={() => navigate(`/post/${el?.post?.id}`)}
          key={el.id}
          className="relative w-96 h-96 overflow-hidden rounded-lg shadow-lg flex flex-col justify-end hover:cursor-pointer" // ✅ เพิ่ม `relative` และ `flex`
          initial="initial"
          whileHover="hover" // ✅ ทั้งรูปและข้อความจะเปลี่ยนพร้อมกัน
          variants={cardVariants}
        >
          {/* <Link to={`/post/${el?.post?.id}`}> */}
          {/* ✅ รูปภาพ */}
          <motion.img
            src={el.postImage[0].url}
            alt=""
            className="w-full h-full object-cover rounded-lg "
          />
          {/* </Link> */}

          {/* ✅ กล่องข้อความที่อยู่ในแต่ละรูป */}
          <motion.div className="absolute bottom-0 left-0 w-full bg-black/30 text-white p-4 flex flex-col">
            <p className="text-lg">{el?.post?.place?.province?.name}</p>

            <motion.p
              className="font-bold text-xl"
              variants={titleVariants} // ✅ ใช้ Motion Variants
            >
              {el.post.title}
            </motion.p>

            <p className="text-sm">{el?.place?.createdAt}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default Post;
