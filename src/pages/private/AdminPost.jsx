import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const posts = [
  {
    title: "Exploring the Beauty of Bali",
    author: "Leslie Maya",
    date: "March 2, 2024",
    place: "Bali, Indonesia",
    budget: "$1,500",
  },
  {
    title: "A Guide to the Northern Lights",
    author: "Josie Deck",
    date: "February 15, 2024",
    place: "Tromsø, Norway",
    budget: "$2,000",
  },
  {
    title: "Top 10 Beaches in Thailand",
    author: "Alex Pfeiffer",
    date: "February 10, 2024",
    place: "Phuket, Thailand",
    budget: "$500",
  },
  {
    title: "Hidden Gems of Japan",
    author: "Mike Dean",
    date: "January 20, 2024",
    place: "Kyoto, Japan",
    budget: "$1,200",
  },
  {
    title: "Backpacking Across Europe",
    author: "Mateus Cunha",
    date: "January 5, 2024",
    place: "Europe",
    budget: "$3,000",
  },
];

export default function PostTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(posts.length / rowsPerPage);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  const displayedPosts = posts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleSelection = (title) => {
    setSelectedPosts((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleAction = (action, title) => {
    alert(`${action} action performed on: ${title}`);
    setMenuOpen(null);
  };

  return (
    <div className="p-4 bg-white w-full">
      <table className="w-full border-collapse text-black bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-3 w-10"></th>
            <th className="p-3">Post Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Created Date</th>
            <th className="p-3">Place</th>
            <th className="p-3">Budget</th>
            <th className="p-3 w-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedPosts.map((post, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 relative">
              <td className="p-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(post.title)}
                  onChange={() => toggleSelection(post.title)}
                  className="cursor-pointer"
                />
              </td>
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.author}</td>
              <td className="p-3">{post.date}</td>
              <td className="p-3">{post.place}</td>
              <td className="p-3">{post.budget}</td>
              <td className="p-3 w-10 relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                >
                  <FaEllipsisV />
                </button>
                {menuOpen === index && (
                  <div className="absolute right-0 top-8 bg-white border shadow-md rounded-md text-sm z-50">
                    <button
                      onClick={() => handleAction("Edit", post.title)}
                      className="block px-4 py-2 hover:bg-gray-100 w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleAction("Delete", post.title)}
                      className="block px-4 py-2 hover:bg-gray-100 w-full"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-black">
        <div>
          <button
            className="px-3 py-1 bg-gray-300 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            ◀
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 mx-1 rounded-lg ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-300 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            ▶
          </button>
        </div>

        <div>
          Show:{" "}
          <select className="border p-1 rounded-md">
            <option>10 rows</option>
            <option>20 rows</option>
            <option>50 rows</option>
          </select>
        </div>
      </div>
    </div>
  );
}
