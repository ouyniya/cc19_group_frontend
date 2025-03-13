import React from "react";
import fuji2 from "../../pictures/fuji2.jpg";
import maldives from "../../pictures/maldives.png";
import paris from "../../pictures/paris.png";

// mock data
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
    title: "The Bluest  blue sea in  Maldives",
    createDate: "Mar 29, 2025",
  },
];

function Post() {
  return (
    <div className="flex justify-between px-5 mt-5 ">
      {posts.map((el) => (
        <div className=" h-120 w-118">
          <img src={el.image} alt="" className="w-full h-full" />
          <div className="flex flex-col -mt-25 ml-5 text-white">
            <p className="text-xl">{el.location}</p>
            <p className="font-bold text-2xl">{el.title}</p>
            <p className="text-xl">{el.createDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
