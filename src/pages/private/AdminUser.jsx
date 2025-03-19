import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import useAdminStoresUser from "../../stores/useAdminStoresUser";

const users = [
  {
    name: "Leslie Maya",
    email: "leslie@gmail.com",
    joined: "October 2, 2010",
    role: "Admin",
  },
  {
    name: "Josie Deck",
    email: "josie@gmail.com",
    joined: "October 3, 2011",
    role: "Admin",
  },
  {
    name: "Alex Pfeiffer",
    email: "alex@gmail.com",
    joined: "May 20, 2015",
    role: "Admin",
  },
  {
    name: "Mike Dean",
    email: "mike@gmail.com",
    joined: "July 14, 2015",
    role: "User",
  },
  {
    name: "Mateus Cunha",
    email: "cunha@gmail.com",
    joined: "October, 2016",
    role: "User",
  },
  {
    name: "Nzola Uemo",
    email: "nzola@gmail.com",
    joined: "June 5, 2016",
    role: "User",
  },
  {
    name: "Antony Mack",
    email: "mack@gmail.com",
    joined: "June 15, 2015",
    role: "User",
  },
  {
    name: "André da Silva",
    email: "andre@gmail.com",
    joined: "March 13, 2018",
    role: "User",
  },
  {
    name: "Jorge Ferreira",
    email: "jorge@gmail.com",
    joined: "March 14, 2018",
    role: "User",
  },
];


export default function AdminUserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  /* state เก็บ ข้อมูลจากหลังบ้าน */
  const [users02, setUsers02] = useState([])

  const displayedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const store = useAdminStoresUser();
  const {
    allUsers,
    actionAllUsers02,
    actionUpdateRole02,
  } = store;

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await actionAllUsers02()
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchAllUsers()
  }, [actionAllUsers02,actionUpdateRole02])

  const data = {
    allUsers
  };
  console.log("data allUsers")
  console.log(data.allUsers)


  const toggleSelection = (email) => {
    setSelectedUsers((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleAction = (action, email) => {
    alert(`${action} action performed on: ${email}`);
    setMenuOpen(null);
  };

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

  return (
    <div className="p-4 bg-white w-full">

      <table className="w-full border-collapse text-black bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-3 w-10"></th>
            <th className="p-3">Full Name</th>
            <th className="p-3">Email Address</th>
            <th className="p-3">Role</th>
            <th className="p-3 w-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.allUsers?.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 relative">
              <td className="p-3 w-10"></td>
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
                <button
                  onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                >
                  <FaEllipsisV />
                </button>
                {menuOpen === index && (
                  <div className="absolute right-0 top-8 bg-white border shadow-md rounded-md text-sm z-50">
                    <button
                      onClick={() => handleAction("Edit", user.email)}
                      className="block px-4 py-2 hover:bg-gray-100 w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleAction("Delete", user.email)}
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
      {/* <div className="flex justify-between items-center mt-4 text-black">
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
              className={`px-3 py-1 mx-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
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
      </div> */}
    </div>
  );
}
