import React, { useEffect, useRef, useState } from "react";
import useFilterStores from "../stores/useFilterStores";
import { useSearchParams } from "react-router";
import { createAlert } from "../utils/createAlert";
import useWishlistStores from "../stores/useWishlistStores";
import {
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
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
  const [showTopButton, setShowTopButton] = useState(false);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 12;
  const totalPages = Math.ceil((filterPosts?.totalPosts || 0) / pageSize);

  const timeoutRef = useRef(null);
  const [likedPosts, setLikedPosts] = useState({});
  const contentRef = useRef(null);

  // Fetch wishlist data when component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = user?.id || "";
        if (!userId) {
          return;
        }
        await actionGetWishlist(userId);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [actionGetWishlist, user?.id]);

  // Update likedPosts state when wishlists are fetched
  useEffect(() => {
    if (wishlists && wishlists.length > 0) {
      const wishlistMap = {};
      wishlists.forEach((item) => {
        wishlistMap[item?.post?.id] = true;
      });
      setLikedPosts(wishlistMap);
    }
  }, [wishlists]);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setLoading(true);

    timeoutRef.current = setTimeout(async () => {
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
    }, 1000);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // Skeleton loader component for cards
  const SkeletonCard = () => (
    <div className="rounded-lg overflow-hidden flex flex-col justify-between animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
      </div>
      <div className="flex justify-between pb-4 px-4 items-center">
        <div className="h-8 bg-gray-200 rounded-md w-24"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container max-w-7xl mx-auto p-4" ref={contentRef}>
        <div className="bg-white rounded-xl p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center bg-gradient-to-r from-sky-900 to-sky-500 bg-clip-text text-transparent">
            Find Your Next Adventure
          </h1>

          <div className="flex flex-col justify-center items-center gap-4 mb-15">
            <div className="w-full flex justify-center gap-5">
              <div className="relative">
                <input
                  type="search"
                  className="input input-lg w-[500px] rounded-full pl-10 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="Place"
                />
                <FaSearch className="absolute left-4 top-4 text-gray-400" />
              </div>
              <div className="flex gap-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="input input-lg w-[230px] rounded-full pl-10 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="input input-lg w-[230px] rounded-full pl-10 pr-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Search Inputs */}

            {/* <button
              onClick={handleSearch}
              className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md transition-all duration-300 hover:shadow-lg"
            >
              Search
            </button> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              // Skeleton loading state
              Array(12)
                .fill()
                .map((_, index) => <SkeletonCard key={index} />)
            ) : filterPosts?.posts?.length > 0 ? (
              filterPosts?.posts?.map((el) => (
                <div
                  key={el.id}
                  className="relative rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-gray-100 hover:border-gray-200 hover:translate-y-[-2px]"
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
                      className="btn btn-info btn-outline badge-sm hover:shadow-md transition-all duration-300"
                    >
                      Read More
                    </button>

                    {/* Heart */}
                    <div className="absolute right-2 top-2">
                      <div className="btn btn-ghost bg-white w-[34px] h-[34px] rounded-full overflow-hidden flex justify-center items-center shadow-sm hover:shadow-md">
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
            <div className="flex justify-center mt-[100px]">
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

      {/* Go to Top Button - Fixed position */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 p-3 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-all duration-300 hover:shadow-xl z-50 group"
          aria-label="Go to top"
        >
          <FaArrowUp className="text-lg group-hover:animate-bounce" />
        </button>
      )}

      {/* Go to Bottom Button - Fixed position */}
      <button
        onClick={scrollToBottom}
        className="fixed bottom-6 right-6 p-3 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-all duration-300 hover:shadow-xl z-50 group"
        aria-label="Go to bottom"
      >
        <FaArrowDown className="text-lg group-hover:animate-bounce" />
      </button>
    </>
  );
}

export default FilterPage;
