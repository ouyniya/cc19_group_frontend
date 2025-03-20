import React, { useEffect, useState } from "react";
import logo from "../icons/logo.png";
import heart from "../icons/heart.png";
import useFilterStores from "../stores/useFilterStores";
import { useSearchParams } from "react-router"; // Import from react-router-dom

function FilterPageDraft() {
  const filterPosts = useFilterStores((state) => state.filterPosts); // Fetch posts from store
  const actionGetFilterPosts = useFilterStores(
    (state) => state.actionGetFilterPosts
  ); // Action to fetch posts
  const [searchParams, setSearchParams] = useSearchParams(); // Search params for query strings

  const [loading, setLoading] = useState(false);
  const [placeName, setPlaceName] = useState(
    searchParams.get("placeName") || ""
  );
  const [province, setProvince] = useState(searchParams.get("province") || "");
  const [district, setDistrict] = useState(searchParams.get("district") || "");

  // Query params from URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10; // Number of items per page
  const totalPages = Math.ceil((filterPosts?.totalPosts || 0) / pageSize); // Calculate total pages

  // Fetch posts based on query params whenever they change
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
        placeName,
        province,
        district,
        page: page.toString(),
      });

      try {
        // Fetch posts based on current filters
        await actionGetFilterPosts(queryParams);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [placeName, province, district, page, actionGetFilterPosts]); // Dependencies: re-fetch when these change

  // Handle search form submission
  const handleSearch = () => {
    setSearchParams({
      placeName,
      province,
      district,
      page: "1", // Reset to page 1 when search is triggered
    });
  };

  // Handling page change
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

  // console.log(filterPosts);

  return (
    <>
      <div>
        <div className="mt-15">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold ml-37">Top locations on Voyager</p>
            <img src={logo} alt="icon destination" className="h-10 -mt-2" />
          </div>

          {/* Search Box */}
          <div className="mt-5 max-w-[80%] mx-auto flex gap-3">
            <input
              type="text"
              placeholder="Search by Place"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Search by Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Search by District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Go
            </button>
          </div>

          <div className="max-w-[80%] mx-auto mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {loading ? (
                <p>Loading...</p>
              ) : filterPosts?.posts?.length > 0 ? (
                filterPosts?.posts?.map((el) => (
                  <div key={el.id} className="relative">
                    <img
                      src={el.firstImage}
                      alt={el.title}
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                    <div className="absolute top-2 right-2">
                      <img src={heart} alt="heart icon" className="w-8 h-8" />
                    </div>
                    <p className="font-bold mt-2 text-xl">{el.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray-500 text-xs">{el.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available for the given filters.</p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4 gap-3">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="btn btn-primary disabled:btn-disabled"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="btn-group">
                  <button
                    onClick={() => handlePageChange(1)}
                    className={`btn ${page === 1 ? "btn-active" : "btn-ghost"}`}
                  >
                    1
                  </button>
                  {page > 2 && <span className="btn btn-ghost">...</span>}
                  {page > 1 && page < totalPages && (
                    <button
                      onClick={() => handlePageChange(page)}
                      className="btn btn-info"
                    >
                      {page}
                    </button>
                  )}
                  {page < totalPages - 1 && (
                    <span className="btn btn-ghost">...</span>
                  )}
                  {page < totalPages && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`btn ${
                        page === totalPages ? "btn-active" : "btn-ghost"
                      }`}
                    >
                      {totalPages}
                    </button>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="btn btn-primary disabled:btn-disabled"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterPageDraft;
