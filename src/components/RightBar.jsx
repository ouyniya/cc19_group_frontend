import React, { useEffect } from "react";
import Home from "../icons/home.png";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import { User as UserIcon } from "lucide-react"; // Import Lucid User Icon

function RightBar() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const actionGetMe = useUserStore((state) => state.actionGetMe);

  useEffect(() => {
    if (!user && token) {
      actionGetMe();
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Perform any logout logic here (like clearing the user and token)
    useUserStore.getState().actionLogout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="flex items-center mt-3 gap-1 ">
      <div className="w-9">
        <img src={Home} alt="Home logo" className="w-full" />
      </div>
      <button
        onClick={() => navigate("/home")}
        className="btn border-0 bg-[#5CAFF0] text-white rounded-full"
      >
        Home
      </button>
      {/* Conditional Rendering */}

      {user?.role === "USER" ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/user/plan")}
            className="btn border-0 bg-[#aecee5] text-white rounded-full"
          >
            Plan
          </button>
          <button
            onClick={() => navigate("/user/wishlist")}
            className="btn border-0 bg-[#aecee5] text-white rounded-full"
          >
            Wish List
          </button>
        </div>
      ) : ""}

      {user?.role === "ADMIN" ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/admin")}
            className="btn border-0 bg-[#aecee5] text-white rounded-full"
          >
            Dashboard
          </button>
        </div>
      ) : ""}


      {user ? (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gray-300 flex justify-center items-center">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserIcon size={30} color="#000" /> // Display Lucid User Icon when no profile picture
            )}
          </div>
          <span>{user.username}</span>
          <button
            onClick={handleLogout}
            className="btn border-0 bg-[#FF5733] text-white rounded-full"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => navigate("/register")}
            className="btn border-0 text-black rounded-full"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="btn border-0 bg-[#086BAF] text-white rounded-full mr-2"
          >
            Log in
          </button>
        </>
      )}
    </div>
  );
}

export default RightBar;
