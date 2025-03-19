import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import useAdminStoresUser from "../../stores/useAdminStoresUser";
import { Trash, Trash2 } from "lucide-react";

// const users = [
//   {
//     name: "Leslie Maya",
//     email: "leslie@gmail.com",
//     joined: "October 2, 2010",
//     role: "Admin",
//   },
//   {
//     name: "Josie Deck",
//     email: "josie@gmail.com",
//     joined: "October 3, 2011",
//     role: "Admin",
//   },
//   {
//     name: "Alex Pfeiffer",
//     email: "alex@gmail.com",
//     joined: "May 20, 2015",
//     role: "Admin",
//   },
//   {
//     name: "Mike Dean",
//     email: "mike@gmail.com",
//     joined: "July 14, 2015",
//     role: "User",
//   },
//   {
//     name: "Mateus Cunha",
//     email: "cunha@gmail.com",
//     joined: "October, 2016",
//     role: "User",
//   },
//   {
//     name: "Nzola Uemo",
//     email: "nzola@gmail.com",
//     joined: "June 5, 2016",
//     role: "User",
//   },
//   {
//     name: "Antony Mack",
//     email: "mack@gmail.com",
//     joined: "June 15, 2015",
//     role: "User",
//   },
//   {
//     name: "André da Silva",
//     email: "andre@gmail.com",
//     joined: "March 13, 2018",
//     role: "User",
//   },
//   {
//     name: "Jorge Ferreira",
//     email: "jorge@gmail.com",
//     joined: "March 14, 2018",
//     role: "User",
//   },
// ];


export default function AdminUserTable() {

  const [menuOpen, setMenuOpen] = useState(null);

  /* state เก็บ ข้อมูลจากหลังบ้าน */
  const [users02, setUsers02] = useState([])

  /* state เก็บ token กับ id ที่ต้องการจะ cormfirm ลบ */
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
  };
  console.log("data allUsers")
  console.log(data.allUsers)

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
            <th className="p-3 w-10"></th>
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
