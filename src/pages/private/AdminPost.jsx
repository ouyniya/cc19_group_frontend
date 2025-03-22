import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import useAdminPostStores from "../../stores/useAdminPostStores";
import moment from "moment";
import { Trash2 } from "lucide-react";
import { Link } from "react-router";
import { FcNext, FcPrevious } from "react-icons/fc";

export default function PostTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemDel, setItemDel] = useState({ id: "", title: "" });

  const store = useAdminPostStores();
  const { allPost, totalPages, totalPosts, actionAllPost, actionDeletePost } = store;

  const fetchAllPosts = async () => {
    try {
      await actionAllPost(currentPage);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, [currentPage, actionDeletePost]);

  const hdlDeleteUser = async (id) => {
    try {
      await actionDeletePost(id);
      fetchAllPosts();
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 w-full text-sm">
      <table className="w-full border-collapse text-gray-700 bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-3 w-10">#</th>
            <th className="p-3">Post Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Place</th>
            <th className="p-3">Budget</th>
            <th className="p-3">Created Date</th>
            <th className="p-3 w-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPost?.map((post, index) => (
            <tr key={index} className="border-b border-slate-300 hover:bg-gray-100 text-gray-600">
              <td className="p-3 w-10 text-center font-semibold">{post.id}</td>
              <td className="p-3 font-bold text-[var(--btnMain)]">
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </td>
              <td className="p-3 font-semibold">
                <Link to={`/user-dashboard/${post.user.id}`}>
                  <div className="badge badge-soft badge-info">{post.user.username}</div>
                </Link>
              </td>
              <td className="p-3">{post.place.name}</td>
              <td className="p-3 text-right font-bold">{post.budget.toLocaleString()}</td>
              <td className="p-3 text-slate-400 text-xs">{moment(post.user.createdAt).format("YYYY-MM-DD")}</td>
              <td className="p-3 flex justify-center items-center w-full">
                <button
                  className="btn-ghost rounded-xl hover:cursor-pointer"
                  onClick={() => {
                    setItemDel({ id: post.id, title: post.title });
                    document.getElementById("my_modal_1").showModal();
                  }}
                >
                  <Trash2 color="red" size={16} />
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Please Confirm</h3>
                    <p className="py-4">Are you sure you want to delete?</p>
                    <p>Post Title: {itemDel.title}</p>
                    <div className="modal-action gap-2">
                      <button className="btn" onClick={() => document.getElementById("my_modal_1").close()}>CLOSE</button>
                      <button className="btn" onClick={() => hdlDeleteUser(itemDel.id)}>SUBMIT</button>
                    </div>
                  </div>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-black">
        <button
          className="btn btn-sm bg-gray-100"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <FcPrevious />
        </button>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${currentPage === index + 1 ? "bg-[var(--btnMain)] text-white" : "bg-gray-100"}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="btn btn-sm bg-gray-100"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <FcNext />
        </button>
      </div>
    </div>
  );
}
