import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import useAdminPostStores from "../../stores/useAdminPostStores";
import moment from "moment"
import { Trash2 } from "lucide-react";

export default function PostTable() {

  /* state เก็บ currentPage */
  const [currentPage, setCurrentPage] = useState(1);

  /* state เก็บ postName กับ id ที่ต้องการจะ cormfirm ลบ */
  const [itemDel, setItemDel] = useState({
    id: "",
    title: ""
  })

  const store = useAdminPostStores()
  const {
    allPost,
    totalPages,
    totalPosts,
    actionAllPost,
    actionDeletePost
  } = store

  const fetchAllUsers = async () => {
    try {
      await actionAllPost(currentPage)
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [actionAllPost, currentPage, actionDeletePost])

  const data = {
    allPost,
    totalPages,
    totalPosts
  }

  /* Delete user */
  const hdlDeleteUser = async (id) => {
    try {
      const res = await actionDeletePost(id)
      fetchAllUsers()
      document.getElementById('my_modal_1').close()
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className="p-4 bg-white w-full">
      <table className="w-full border-collapse text-black bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-3 w-10">
              no.
            </th>
            <th className="p-3">Post Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Created Date</th>
            <th className="p-3">Place</th>
            <th className="p-3">Budget</th>
            <th className="p-3 w-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.allPost?.map((post, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 relative">
              <td className="p-3 w-10">
                {index + 1}
              </td>
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.user.username}</td>
              <td className="p-3">{moment(post.user.createdAt).format("MMM Do YY")}</td>
              <td className="p-3">{post.place.name}</td>
              <td className="p-3">{post.budget}</td>
              <td className="p-3 w-10 relative">
                {/* Trash button */}
                <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>
                  < Trash2
                    color="red"
                    onClick={() => setItemDel({ id: post.id, title: post.title })}
                  />
                </button>
                {/* Modal */}
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Please cornfirm</h3>
                    <p className="py-4">Are you sure you want to Delete  </p>
                    <p>Post Title : {itemDel.title}</p>
                    <div className="modal-action gap-2">
                      <button className="btn"
                        onClick={() => document.getElementById('my_modal_1').close()}
                      >CLOSE</button>
                      <button className="btn"
                      onClick={() => hdlDeleteUser(itemDel.id)}
                      >SUBMIT</button>
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
        <div>
          <button
            className="px-3 py-1 bg-gray-300 rounded-lg"
            onClick={() => {
              if (currentPage > 1) setCurrentPage((prev) => (prev - 1))
            }
            }
          >
            ◀
          </button>
          <button
            className="px-3 py-1 bg-gray-300 rounded-lg"
            onClick={() => {
              if (totalPosts / currentPage > 10) setCurrentPage((prev) => (prev + 1))
            }
            }
          >
            ▶
          </button>
        </div>
      </div>

    </div>
  );
}
