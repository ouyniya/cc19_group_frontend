import React, { useEffect, useRef, useState } from "react";
import useFilterStores from "../stores/useFilterStores";
import { useSearchParams } from "react-router";
import { createAlert } from "../utils/createAlert";
import useWishlistStores from "../stores/useWishlistStores";
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";
import useUserStore from "../stores/userStore";

function FilterPage() {
  const actionAddWishlist = useWishlistStores(
    (state) => state.actionAddWishlist
  );
  const actionDeleteWishlistByPostId = useWishlistStores(
    (state) => state.actionDeleteWishlistByPostId
  );
  const actionGetWishlist = useWishlistStores(
    (state) => state.actionGetWishlist
  );
  const wishlists = useWishlistStores((state) => state.wishlists.result);
  const user = useUserStore((state) => state.user);

  const filterPosts = useFilterStores((state) => state.filterPosts);
  const actionGetFilterPosts = useFilterStores(
    (state) => state.actionGetFilterPosts
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [placeName, setPlaceName] = useState(
    searchParams.get("placeName") || ""
  );
  const [province, setProvince] = useState(searchParams.get("province") || "");
  const [district, setDistrict] = useState(searchParams.get("district") || "");

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 12;
  const totalPages = Math.ceil((filterPosts?.totalPosts || 0) / pageSize);

  const timeoutRef = useRef(null);
  const [likedPosts, setLikedPosts] = useState({});

  // Fetch wishlist data when component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = user?.id || "";
        await actionGetWishlist(userId);
        // console.log(wishlists)
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [actionGetWishlist]);

  // Update likedPosts state when wishlists are fetched
  useEffect(() => {
    if (wishlists && wishlists.length > 0) {
      console.log("...");
      const wishlistMap = {};
      wishlists.forEach((item) => {
        wishlistMap[item?.post?.id] = true;
      });
      console.log(wishlistMap);
      setLikedPosts(wishlistMap);
    }
  }, [wishlists]);

  // console.log(wishlists)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
        placeName,
        province,
        district,
        page: page.toString(),
      });

      try {
        await actionGetFilterPosts(queryParams);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [placeName, province, district, page, actionGetFilterPosts]);

  const handleSearch = () => {
    setSearchParams({
      placeName,
      province,
      district,
      page: "1",
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({
        page: newPage.toString(),
        placeName,
        province,
        district,
      });
    }
  };

  const hdlAddWishlist = async (el) => {
    if (!user?.id) {
      return createAlert("info", "Please login before adding a wishlist");
    }

    if (!el) {
      return createAlert("info", "Please choose post correctly");
    }

    const body = {
      postId: el.id,
    };

    try {
      await actionAddWishlist(body);
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [el.id]: true,
      }));
      createAlert("success", "Added to wishlist successfully");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      createAlert("error", "Failed to add to wishlist");
    }
  };

  const hdlRemoveWishlist = async (el) => {
    if (!el) {
      return createAlert("info", "Please choose post correctly");
    }

    const postId = el.id;

    try {
      await actionDeleteWishlistByPostId(postId);
      setLikedPosts((prevLikedPosts) => {
        const newLikedPosts = { ...prevLikedPosts };
        delete newLikedPosts[el.id];
        return newLikedPosts;
      });
      createAlert("success", "Removed from wishlist successfully");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      createAlert("error", "Failed to remove from wishlist");
    }
  };

  return (
    <>
      <div className="container max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-xl p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Find Your Next Adventure
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search Inputs */}
            <div className="relative">
              <input
                type="text"
                placeholder="Place"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <button
              onClick={handleSearch}
              className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md"
            >
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <p>Loading adventures...</p>
              </div>
            ) : filterPosts?.posts?.length > 0 ? (
              filterPosts?.posts?.map((el) => (
                <div
                  key={el.id}
                  className="relative  rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <img
                    src={el.firstImage}
                    alt={el.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{el.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {el.content}
                    </p>
                  </div>
                  {/* Read more */}
                  <div className="flex justify-between pb-4 px-4 items-center">
                    <button
                      onClick={() => (window.location.href = `/post/${el.id}`)}
                      className="btn btn-info btn-outline badge-sm"
                    >
                      Read More
                    </button>

                    {/* Heart */}
                    <div className="absolute right-2 top-2">
                      <div className="btn btn-ghost bg-white w-[34px] h-[34px] rounded-full overflow-hidden flex justify-center items-center shadow-sm">
                      <button
                        onClick={() => {
                          if (likedPosts[el.id]) {
                            hdlRemoveWishlist(el);
                          } else {
                            hdlAddWishlist(el);
                          }
                        }}
                        className="text-rose-500 transition-transform duration-200 hover:scale-110"
                        aria-label={
                          likedPosts[el.id]
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {likedPosts[el.id] ? (
                          <FaHeart className="text-xl" />
                        ) : (
                          <FaRegHeart className="text-xl" />
                        )}
                      </button>
                    </div>
                    </div>
                    
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">
                  No adventures found for your search criteria. Try adjusting
                  your filters.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show at most 5 page buttons
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 mx-1 rounded-md ${
                      page === pageNum
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FilterPage;
