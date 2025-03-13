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
    <div>
      {/* More to explore */}
      <div className="mt-20">
        {/* text */}
        <div className="flex gap-2">
          <p className="text-xl font-bold ml-10">More to explore</p>
          <img src={SearchLogo} alt="icon search" className="h-7  " />
        </div>

        {/* post */}
        <div className="flex mt-2 gap-1 px-2">
          {posts.map((el, index) => (
            <div key={index}>
              <div className="h-80 w-120">
                <img
                  src={el.image}
                  alt="place image"
                  className="rounded-2xl w-full h-full"
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
