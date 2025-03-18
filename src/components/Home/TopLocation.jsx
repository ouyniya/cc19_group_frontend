import React from "react";

import WatRongKhun from "../../pictures/WatRongKhun.png";
import BangtaoBeach from "../../pictures/BangtaoBeach.png";
import Manasikarn from "../../pictures/Manasikarn.png";
import SamPanBok from "../../pictures/SamPanBok.png";
import view from "../../icons/view.png";
import heart from "../../icons/heart.png";

const posts = [
  { id: 1, image: WatRongKhun, title: "Wat Rong Khun", view: "12.3K" },
  { id: 2, image: BangtaoBeach, title: "Bang tao Beach", view: "1.3K" },
  { id: 3, image: Manasikarn, title: "Manasikarn", view: "987" },
  { id: 4, image: SamPanBok, title: "Sam Pan Bok", view: "137K" },
];

function TopLocation() {
  return (
    <>
      <div className="sm:flex sm:flex-wrap md:flex md:justify-between md:px-2 md:mt-2">
        {posts.map((el, index) => (
          <div
            key={el.id}
            className="w-full sm:w-1/2 md:w-1/4 p-2 flex-grow-0" // ปรับขนาดและเพิ่ม flex-grow-0
          >
            <div className="relative">
              <img
                src={el.image}
                alt=""
                className="w-full h-48 object-cover rounded-2xl"
              />
              <div className="absolute top-2 right-2">
                <img src={heart} alt="" className="w-8 h-8" />
              </div>
              <p className="font-bold mt-2 text-xl">{el.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <img src={view} alt="" className="w-6 h-6" />
                <p className="text-gray-500">{el.view}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TopLocation;
