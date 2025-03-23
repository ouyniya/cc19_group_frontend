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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postIds = [78, 84, 31];
        const results = await Promise.all(
          postIds.map((id) => actionGetEachPost(id))
        );
        setPlaces(results);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [actionGetEachPost]);

  // console.log(places);

  // Card skeleton loader
  const renderSkeletons = () => {
    return Array(3)
      .fill()
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="relative w-96 h-96 overflow-hidden rounded-lg shadow-lg flex flex-col justify-end bg-gray-200 animate-pulse"
        >
          <div className="absolute bottom-0 left-0 w-full bg-gray-800/50 p-4 flex flex-col">
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ));
  };

  return (
    <>
      <div className="flex flex-row justify-center gap-6 px-5 mt-10">
        {loading ? (
          renderSkeletons()
        ) : error ? (
          <div className="text-red-500">
            Failed to load posts. Please try again.
          </div>
        ) : places.length === 0 ? (
          <div className="text-gray-500">No posts available</div>
        ) : (
          places.map((el, index) => (
            <motion.div
              onClick={() => navigate(`/post/${el?.post?.id}`)}
              key={el?.post?.id || index}
              className="relative w-96 h-96 overflow-hidden rounded-lg shadow-lg flex flex-col justify-end hover:cursor-pointer"
              initial="initial"
              whileHover="hover"
              variants={{
                initial: { scale: 1 },
                hover: {
                  scale: 1.1,
                  transition: { duration: 0.3, ease: "easeOut" },
                },
              }}
            >
              <motion.img
                src={el?.postImage?.[0]?.url || ""}
                alt={el?.post?.title || ""}
                className="w-full h-full object-cover rounded-lg"
              />
              <motion.div className="absolute bottom-0 left-0 w-full bg-black/30 text-white p-4 flex flex-col">
                <p className="text-lg">
                  {el?.post?.place?.province?.name || "Unknown Location"}
                </p>
                <motion.p
                  className="font-bold text-xl"
                  variants={{
                    initial: { y: 0, scale: 1, color: "#ffffff" },
                  }}
                >
                  {el?.post?.title || "Untitled Post"}
                </motion.p>
                <p className="text-sm">
                  {el?.place?.createdAt || "Unknown Date"}
                </p>
              </motion.div>
            </motion.div>
          ))
        )}
      </div>

      {/* <div className="flex flex-row justify-center gap-6 px-5 mt-10">
      {loading && <p>Loading posts...</p>}
      {error && <p>Error loading posts: {error.message}</p>}
      {!loading && !error && places.length === 0 && <p>No posts available</p>}
      {places.map((el, index) => (
        <motion.div
          onClick={() => navigate(`/post/${el?.post?.id}`)}
          key={el.id}
          className="relative w-96 h-96 overflow-hidden rounded-lg shadow-lg flex flex-col justify-end hover:cursor-pointer" // ✅ เพิ่ม `relative` และ `flex`
          initial="initial"
          whileHover="hover" // ✅ ทั้งรูปและข้อความจะเปลี่ยนพร้อมกัน
          variants={cardVariants}
        >

          <motion.img
            src={el.postImage[0].url}
            alt=""
            className="w-full h-full object-cover rounded-lg "
          />


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
    </div> */}
    </>
  );
}

export default Post;
