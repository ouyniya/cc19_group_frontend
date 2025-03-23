import React, { useEffect, useRef, useState } from "react";
import useFilterStores from "../stores/useFilterStores";
import { useSearchParams } from "react-router";
import { createAlert } from "../utils/createAlert";
import useWishlistStores from "../stores/useWishlistStores";
import { FaSearch, FaHeart, FaRegHeart } from "react-icons/fa"; // Import icons

function FilterPage() {
  const actionAddWishlist = useWishlistStores(
    (state) => state.actionAddWishlist
  );
  const actionRemoveWishlist = useWishlistStores(
    (state) => state.actionRemoveWishlist
  );
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
  console.log("filterPosts", filterPosts)
  console.log(totalPages)

  const timeoutRef = useRef(null);

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

  const [likedPosts, setLikedPosts] = useState({});

  const hdlAddWishlist = async (el) => {
    if (!el) {
      return createAlert("info", "Please choose post correctly");
    }

    const body = {
      postId: el.id,
    };

    await actionAddWishlist(body);
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [el.id]: true,
    }));
  };

  const hdlRemoveWishlist = async (el) => {
    if (!el) {
      return createAlert("info", "Please choose post correctly");
    }

    const body = {
      postId: el.id,
    };

    await actionRemoveWishlist(body);
    setLikedPosts((prevLikedPosts) => {
      const newLikedPosts = { ...prevLikedPosts };
      delete newLikedPosts[el.id];
      return newLikedPosts;
    });
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
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : filterPosts?.posts?.length > 0 ? (
            filterPosts?.posts?.map((el) => (
              <div
                key={el.id}
                className="relative bg-white rounded-lg shadow-sm overflow-hidden"
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
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => (window.location.href = `/post/${el.id}`)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Read More
                    </button>
                    <button
                      onClick={() => {
                        if (likedPosts[el.id]) {
                          hdlRemoveWishlist(el);
                        } else {
                          hdlAddWishlist(el);
                        }
                      }}
                      className="text-red-500"
                    >
                      {likedPosts[el.id] ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm">
              No posts available for the given filters.
            </p>
          )}
        </div>

        {/* Corrected Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  page === p ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 mx-1 bg-gray-200 rounded-md disabled:opacity-50"
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
      