import React, { useEffect } from "react";

import WatRongKhun from "../../pictures/WatRongKhun.png";
import BangtaoBeach from "../../pictures/BangtaoBeach.png";
import Manasikarn from "../../pictures/Manasikarn.png";
import SamPanBok from "../../pictures/SamPanBok.png";
import view from "../../icons/view.png";
import heart from "../../icons/heart.png";
import useAdminStores from "../../stores/useAdminStores";
import useLocationStores from "../../stores/useLocationStores";
import { Link } from "react-router";

const posts = [
  { id: 1, image: WatRongKhun, title: "Wat Rong Khun", view: "12.3K" },
  { id: 2, image: BangtaoBeach, title: "Bang tao Beach", view: "1.3K" },
  { id: 3, image: Manasikarn, title: "Manasikarn", view: "987" },
  { id: 4, image: SamPanBok, title: "Sam Pan Bok", view: "137K" },
];

function TopLocation() {
  const store = useLocationStores();
  const { actionGetTopProvinces, topLocation } = store;

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await actionGetTopProvinces();
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchAllUsers();
  }, [actionGetTopProvinces]);

  return (
    <div className="max-w-[80%] mx-auto mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {topLocation?.topPlaces?.slice(0, 4)?.map((el) => (
          <div key={el?.id} className="relative">
            <Link to={`/post/${el?.id}`}>
              <img
                src={el?.imageUrl}
                alt={el?.name}
                className="w-full h-48 object-cover rounded-xl"
              />
              <p className="font-bold mt-2 text-xl">{el?.name}</p>
            </Link>
              <div className="flex items-center gap-2 mt-1">
                <img src={view} alt="view icon" className="w-6 h-6" />
                <p className="text-gray-500">
                  {el?.totalViews?.toLocaleString()}
                </p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopLocation;
