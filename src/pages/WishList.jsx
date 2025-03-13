import React from "react";
import NavbarHeader from "../components/NavbarHeader";
import Lake from "../pictures/Lake.png";
import paris from "../pictures/paris2.jpg";
import shirakawago from "../pictures/Shirakawago.png";
import view from "../icons/view.png";
import redheart from "../icons/redheart.png";

const posts = [
  { id: 1, image: Lake, title: "Lake Tekapo", view: "1.7k" },
  { id: 2, image: paris, title: "The magic of Paris", view: "30.5k" },
  { id: 3, image: shirakawago, title: "Shirakawago", view: "987" },
];

function WishList() {
  return (
    <>
      {/* header */}
      {/* <NavbarHeader /> */}

      <div className="flex flex-wrap justify-start gap-2 px-3 mt-10">
        {posts.map((el) => (
          <div className="flex  flex-col">
            <img
              src={el.image}
              alt="place image"
              className="h-70 w-88 bg-amber-200 rounded-2xl"
            />
            <img
              src={redheart}
              alt="Red heart"
              className="w-10 -mt-65 ml-72 hover:cursor-pointer"
            />
            <p className="ml-2 mt-56 font-bold text-xl text-[#0C4A6E]">
              {el.title}
            </p>
            <div className="flex gap-2 ml-2">
              <img src={view} alt="view icon" className="h-6" />
              <p className="text-[#A3B3BB]">{el.view}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WishList;
