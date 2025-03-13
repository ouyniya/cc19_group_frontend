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
      <div className="flex justify-between px-2 mt-2">
        {posts.map((el, index) => (
          <>
            <div key={index} className="h-70 w-90 ">
              <img
                src={el.image}
                alt=""
                className="w-full h-full rounded-2xl"
              />
              <div className="flex h-8 w-8 -mt-66 ml-78">
                <img src={heart} alt="" className="w-full h-full" />
              </div>
              <p className="font-bold ml-2 mt-60 text-xl">{el.title}</p>
              <div className="flex gap-2 ml-2">
                <img src={view} alt="" className="w-6" />
                <p className="text-gray-500">{el.view}</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default TopLocation;
