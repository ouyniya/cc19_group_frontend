import { useState } from "react";
import { FaHome, FaUser, FaChartBar, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-gray-100 p-4 h-screen">
      <h1 className="text-xl font-bold text-blue-600 mb-4">VOYAGER</h1>
      <nav>
        <ul className="space-y-2 text-black">
          <li>
            <button
              className={`flex items-center p-2 w-full text-left rounded-lg ${
                active === "Dashboard" ? "bg-blue-100 font-bold" : ""
              }`}
              onClick={() => { setActive("Dashboard"); navigate("/admin/dashboard"); }}
            >
              <FaHome className="mr-2" /> Dashboard
            </button>
          </li>
          <li>
            <button
              className={`flex items-center p-2 w-full text-left rounded-lg ${
                active === "User" ? "bg-blue-100 font-bold" : ""
              }`}
              onClick={() => { setActive("User"); navigate("/admin/usermanagement"); }}
            >
              <FaUser className="mr-2" /> User
            </button>
          </li>
          <li>
            <button
              className={`flex items-center p-2 w-full text-left rounded-lg ${
                active === "Analytics" ? "bg-blue-100 font-bold" : ""
              }`}
              onClick={() => { setActive("Analytics"); navigate("/admin/analysis"); }}
            >
              <FaChartBar className="mr-2" /> Analytics
            </button>
          </li>
          <li>
            <button
              className={`flex items-center p-2 w-full text-left rounded-lg ${
                active === "Post" ? "bg-blue-100 font-bold" : ""
              }`}
              onClick={() => { setActive("Post"); navigate("/admin/postmanagement"); }}
            >
              <FaEdit className="mr-2" /> Post
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
