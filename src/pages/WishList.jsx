import React, { useEffect, useState } from "react";
import view from "../icons/view.png";
import redheart from "../icons/redheart.png";
import useWishlistStores from "../stores/useWishlistStores";
import useUserStore from "../stores/userStore";
import { Link } from "react-router";
import Swal from "sweetalert2";

function WishList() {
  const actionGetWishlist = useWishlistStores(
    (state) => state.actionGetWishlist
  );
  const actionDeleteWishlist = useWishlistStores(
    (state) => state.actionDeleteWishlist
  );
  const wishlists = useWishlistStores((state) => state.wishlists);
  const getCurrentWishlists = useWishlistStores(
    (state) => state.getCurrentWishlists
  );
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    callActionGetWishlist();
  }, [getCurrentWishlists]);

  const callActionGetWishlist = async () => {
    try {
      setIsLoading(true);
      await actionGetWishlist(user?.id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

  // console.log("***", wishlists);
  // console.log("***", wishlists?.result?.length);

  return (
    <>
      {/* header */}
      {/* <NavbarHeader /> */}

      <div className="flex flex-wrap justify-start gap-2 px-3 my-10">
        {wishlists?.result?.length > 0 && !isLoading ? (
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
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <div role="alert" className="alert alert-info alert-soft">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                <strong>Your wishlist is empty!</strong> Find something amazing
                and add it to your wishlist!
              </span>
              <Link to="/filter-page?placeName=&province=&district=&page=1">
                <div className="btn btn-info btn-xs">here</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default WishList;
