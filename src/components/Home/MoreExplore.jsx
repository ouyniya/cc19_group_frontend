import React from "react";
import yingyong from "../../pictures/Yingyong.png";
import KhaoLung from "../../pictures/KhaoLung.png";
import Namtok from "../../pictures/Namtok.png";
import SearchLogo from "../../icons/search.png";

const posts = [
  { id: 1, image: yingyong },
  { id: 2, image: Namtok },
  { id: 3, image: KhaoLung },
];

function MoreExplore() {
  return (
    <div className="max-w-[80%] mx-auto mt-20">
      {/* More to explore */}
      <div>
        {/* Header */}
        <div className="flex gap-2 items-center">
          <p className="text-xl font-bold">More to explore</p>
          <img src={SearchLogo} alt="icon search" className="h-7" />
        </div>

        {/* Grid for posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {posts.map((el, index) => (
            <div key={index} className="w-full">
              <div className="h-60 w-full">
                <img
                  src={el.image}
                  alt="place image"
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoreExplore;
