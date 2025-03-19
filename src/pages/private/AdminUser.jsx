import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import useAdminStoresUser from "../../stores/useAdminStoresUser";
import { Trash, Trash2 } from "lucide-react";

export default function AdminUserTable() {

  /* state เก็บ ข้อมูลจากหลังบ้าน */
  const [users02, setUsers02] = useState([])

  /* state เก็บ username กับ id ที่ต้องการจะ cormfirm ลบ */
  const [itemDel, setItemDel] = useState({
    id: "",
    username:""
  })


  const store = useAdminStoresUser();
  const {
    allUsers,
    actionAllUsers02,
    actionUpdateRole02,
    actionDeleteUser02,
  } = store;

  const fetchAllUsers = async () => {
    try {
      await actionAllUsers02()
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [actionAllUsers02, actionUpdateRole02, actionDeleteUser02])

  const data = {
    allUsers
  }

  /* Update role */
  const hdlUpdateRole = async (id, role) => {
    try {
      console.log("id, role")
      console.log({id, role})
      const res = await actionUpdateRole02({ id, role })
      console.log("res hdlUpdateRole")
      console.log(res)

    } catch (error) {
      console.log(error)
    }
  }
  /* Delete user */
  const hdlDeleteUser = async (id) => {
    try {
      console.log("id hdlDeleteUser")
      console.log(id)
      const res = await actionDeleteUser02(id)
      fetchAllUsers()
      console.log("id hdlDeleteUser after delete")
      console.log(id)
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
            <th className="p-3 w-10">no.</th>
            <th className="p-3">Full Name</th>
            <th className="p-3">Email Address</th>
            <th className="p-3">Role</th>
            <th className="p-3 w-10">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.allUsers?.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 relative">
              <td className="p-3 w-10">{index + 1}</td>
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                {
                  <select
                    className={`px-3 py-1 rounded-full text-white text-sm ${user.role === "Admin" ? "bg-red-500" : "bg-blue-400"
                      }`}
                    onChange={(e) => hdlUpdateRole(user.id, e.target.value)}
                    defaultValue={user.role}
                  >
                    <option >USER</option>
                    <option >ADMIN</option>
                  </select>
                }
              </td>


              <td className="p-3 w-10 relative">
                {/* Trash button */}
                <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>
                  < Trash2
                    color="red"
                    onClick={() => setItemDel({id: user.id, username: user.username })}
                  />
                </button>
                {/* Modal */}
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Please cornfirm</h3>
                    <p className="py-4">Are you sure you want to Delete {itemDel.username} </p>
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
    </div>
  );
}
