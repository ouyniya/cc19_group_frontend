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
import Swal from "sweetalert2";

function WishList() {
  const actionGetWishlist = useWishlistStoresExample(
    (state) => state.actionGetWishlist
  );
  const actionDeleteWishlist = useWishlistStoresExample(
    (state) => state.actionDeleteWishlist
  );
  const wishlists = useWishlistStoresExample((state) => state.wishlists);
  const getCurrentWishlists = useWishlistStoresExample(
    (state) => state.getCurrentWishlists
  );
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    callActionGetWishlist();
  }, [getCurrentWishlists]);

  const callActionGetWishlist = async () => {
    await actionGetWishlist(user?.id);
  };

  const hdlDelete = async (wishlistId) => {
    try {
      // console.log(wishlistId);

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await actionDeleteWishlist(wishlistId);
          await actionGetWishlist(user?.id); // Re-fetch the updated wishlists

          Swal.fire({
            title: "Deleted!",
            text: "Your wishlist has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      createAlert("info", error);
    }
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
              <div onClick={() => hdlDelete(el?.id)}>
                <img
                  src={redheart}
                  alt="Red heart"
                  className="w-10 -mt-65 ml-72 hover:cursor-pointer"
                />
              </div>
              <Link to={`/post/${el?.post?.id}`}>
                <p className="ml-2 font-semibold text-sm text-[#0C4A6E]">
                  {el?.post?.title}
                </p>
              </Link>
              <div className="flex gap-2 ml-2">
                <img src={view} alt="view icon" className="h-6" />
                <p className="text-[#A3B3BB]">{el?.post?.view}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default WishList;
