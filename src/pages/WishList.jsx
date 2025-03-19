import React, { useEffect } from "react";
import NavbarHeader from "../components/NavbarHeader";
import Lake from "../pictures/Lake.png";
import paris from "../pictures/paris2.jpg";
import shirakawago from "../pictures/Shirakawago.png";
import view from "../icons/view.png";
import redheart from "../icons/redheart.png";
import useWishlistStoresExample from "../stores/useWishlistStoresExample";
import useUserStore from "../stores/userStore";
import { Link } from "react-router";

function WishList() {
  const actionGetWishlist = useWishlistStoresExample(
    (state) => state.actionGetWishlist
  );
  const wishlists = useWishlistStoresExample((state) => state.wishlists);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    callActionGetWishlist();
  }, []);

  const callActionGetWishlist = async () => {
    await actionGetWishlist(user?.id);
  };

  // console.log('***', wishlists)

  return (
    <>
      {/* header */}
      {/* <NavbarHeader /> */}

      <div className="flex flex-wrap justify-start gap-2 px-3 mt-10">
        {wishlists &&
          wishlists?.result?.map((el, index) => (
            <div key={index} className="flex  flex-col">
              <Link to={`/post/${el?.post?.id}`}>
                {/* Image or Fallback Icon */}
                {el?.post?.postImage ? (
                  <img
                    src={el?.post?.postImage}
                    alt="Post image"
                    className="h-70 w-88 bg-slate-200 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="h-70 w-88 bg-gray-300 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-500 text-xl">📷</span>{" "}
                    {/* Placeholder icon */}
                  </div>
                )}
                <img
                  src={redheart}
                  alt="Red heart"
                  className="w-10 -mt-65 ml-72 hover:cursor-pointer"
                />
                <p className="ml-2 mt-56 font-semibold text-sm text-[#0C4A6E]">
                  {el?.post?.title}
                </p>
                <div className="flex gap-2 ml-2">
                  <img src={view} alt="view icon" className="h-6" />
                  <p className="text-[#A3B3BB]">{el?.post?.view}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}

export default WishList;
