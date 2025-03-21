import React, { useEffect, useState } from "react";
import logo from "../icons/logo.png";
import { useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import { User as UserIcon, Menu, X } from "lucide-react"; // Import Lucide Icons

function Rightbar() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const googleLoginSuccessful = useUserStore(
    (state) => state.googleLoginSuccessful
  );
  const actionGetMeOrGoogleLogin = useUserStore(
    (state) => state.actionGetMeOrGoogleLogin
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user && (!googleLoginSuccessful || !!token)) {
      actionGetMeOrGoogleLogin();
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    useUserStore.getState().actionLogout();
    navigate("/home");
  };

  return (
    <header className="w-full flex justify-center py-4 bg-transparent relative">
      <div className="max-w-[80%] w-full flex items-center mx-auto px-6 py-3">
        {/* ✅ LOGO ด้านซ้าย */}
        <div className="flex items-center">
          <p className="text-3xl font-bold text-[#086FB6] ml-2">V</p>
          <img src={logo} alt="logo voyager" className="w-10 -mt-1 -ml-1" />
          <p className="text-3xl font-bold text-[#086FB6] -ml-2">YAGER</p>
        </div>

        {/* ✅ Navigation - ซ่อนบนมือถือ แสดงบน Desktop */}
        <div className="hidden md:flex flex-1 justify-center gap-6">
          <button
            onClick={() => navigate("/home")}
            className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
          >
            Home
          </button>

          {user?.role === "USER" && (
            <>
              <button
                onClick={() => navigate(`/user-dashboard/${user?.id}`)}
                className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
              >
                Profile
              </button>
              <button
                onClick={() => navigate("/user/plan")}
                className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
              >
                Plan
              </button>
              <button
                onClick={() => navigate("/user/wishlist")}
                className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
              >
                Wishlist
              </button>
            </>
          )}

          {user?.role === "ADMIN" && (
            <button
              onClick={() => navigate("/admin")}
              className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* ✅ USER ด้านขวา */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-300 flex justify-center items-center">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <UserIcon size={30} color="#000" />
                )}
              </div>
              <span>{user.username}</span>
              <button
                onClick={handleLogout}
                className="btn border-0 bg-gray-700 text-white rounded-full px-4 py-1 shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/register")}
                className="btn border-0 text-black rounded-full px-4 py-1 shadow-md"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn border-0 bg-[#086BAF] text-white rounded-full px-4 py-1 shadow-md"
              >
                Log in
              </button>
            </>
          )}
        </div>

        {/* ✅ Hamburger Menu สำหรับมือถือ */}
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* ✅ เมนู Dropdown สำหรับมือถือ */}
        {menuOpen && (
          <div className="absolute top-[4.5rem] right-1/2 translate-x-1/2 z-50 bg-white/90 backdrop-blur-md shadow-lg rounded-lg p-4 w-full max-w-xs flex flex-col gap-3 md:hidden">
            <button
              onClick={() => {
                navigate("/home");
                setMenuOpen(false);
              }}
              className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
            >
              Home
            </button>

            {user?.role === "USER" && (
              <>
                <button
                  onClick={() => {
                    navigate("/user/plan");
                    setMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
                >
                  Plan
                </button>
                <button
                  onClick={() => {
                    navigate("/user/wishlist");
                    setMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
                >
                  Wish List
                </button>
              </>
            )}

            {user?.role === "ADMIN" && (
              <button
                onClick={() => {
                  navigate("/admin");
                  setMenuOpen(false);
                }}
                className="text-gray-700 hover:text-[#5CAFF0] hover:underline font-semibold"
              >
                Dashboard
              </button>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn border-0 bg-gray-700 text-white rounded-full px-4 py-1 shadow-md"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className="btn border-0 text-black rounded-full px-4 py-1 shadow-md"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="btn border-0 bg-[#086BAF] text-white rounded-full px-4 py-1 shadow-md"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Rightbar;
