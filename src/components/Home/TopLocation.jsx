import React, { useEffect } from "react";

import WatRongKhun from "../../pictures/WatRongKhun.png";
import BangtaoBeach from "../../pictures/BangtaoBeach.png";
import Manasikarn from "../../pictures/Manasikarn.png";
import SamPanBok from "../../pictures/SamPanBok.png";
import view from "../../icons/view.png";
import heart from "../../icons/heart.png";
import useAdminStores from "../../stores/useAdminStores";

const posts = [
  { id: 1, image: WatRongKhun, title: "Wat Rong Khun", view: "12.3K" },
  { id: 2, image: BangtaoBeach, title: "Bang tao Beach", view: "1.3K" },
  { id: 3, image: Manasikarn, title: "Manasikarn", view: "987" },
  { id: 4, image: SamPanBok, title: "Sam Pan Bok", view: "137K" },
];

function TopLocation() {
  const store = useAdminStores();
  const {
    allUsers,
    actionAllUsers,
    totalViews,
    actionAllViews,
    actionTopDestination,
    topDestination,
    isLoading,
  } = store;

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await actionAllUsers();
        await actionAllViews();
        await actionTopDestination();
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchAllUsers();
  }, [actionAllUsers, actionAllViews, actionTopDestination]);

  const data = {
    allUsers,
    totalViews,
    topDestination,
  };

  console.log(topDestination);

  return (
    <div className="max-w-[80%] mx-auto mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {posts.map((el) => (
          <div key={el.id} className="relative">
            <img
              src={el.image}
              alt={el.title}
              className="w-full h-48 object-cover rounded-2xl"
            />
            <p className="font-bold mt-2 text-xl">{el.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <img src={view} alt="view icon" className="w-6 h-6" />
              <p className="text-gray-500">{el.view}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopLocation;
