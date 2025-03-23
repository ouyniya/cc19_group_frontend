import React, { useEffect, useState } from "react";
import Profile from "../pictures/profile.png";
import Edit from "../icons/edit.png";
import useUserStore from "../stores/userStore";
import { Coins, Crown, Edit3Icon, User2 } from "lucide-react";
import { Link } from "react-router";
import { useLocation, useNavigate } from "react-router";
import ActionMenu from "../components/UserDashboard/ActionMenu";

function UserDashboard({ userId }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const user = useUserStore((state) => state.user);
  // const getCurrentUser = useUserStore((state) => state.getCurrentUser);
  const actionGetUserInfoForDashboard = useUserStore(
    (state) => state.actionGetUserInfoForDashboard
  );
  const userPublicInfo = useUserStore((state) => state.userPublicInfo);
  const posts = useUserStore((state) => state.posts);
  const actionGetUserPosts = useUserStore((state) => state.actionGetUserPosts);

  // Add this new state for controlling visible rows
  const [visibleRows, setVisibleRows] = useState(10);

  // Function to handle showing more rows
  const handleShowMore = () => {
    setVisibleRows(posts.length); // Show all posts
  };

  // Function to handle showing less rows
  const handleShowLess = () => {
    setVisibleRows(10); // Reset to show only 10 rows
  };

  useEffect(() => {
    // navigate(0);
    console.log("***Location changed to:", location.pathname);
    console.log("***now", `/user-dashboard/${userId}`);
  }, [location]);

  useEffect(() => {
    // get user data
    callGetUser();
  }, []);

  const callGetUser = async () => {
    // await getCurrentUser();
    await actionGetUserInfoForDashboard(userId);
    await actionGetUserPosts(userId);
  };

  // console.log(posts);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* NavBar */}
        {/* <NavbarHeader /> */}

        {/* User dashboard */}
        <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 py-8 max-w-7xl mx-auto">
          {/* Profile header - Card with shadow and rounded corners */}
          <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col md:flex-row p-6">
              {/* Profile photo with elegant styling */}
              <div className="flex justify-center md:justify-start">
                <div className="relative group">
                  <div className="w-40 h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-full bg-gradient-to-r from-blue-300 to-blue-200 flex items-center justify-center shadow-md overflow-hidden">
                    {userPublicInfo?.profileImage &&
                    !userPublicInfo?.isGoogleUser ? (
                      <img
                        src={userPublicInfo?.profileImage}
                        alt="profile"
                        className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <User2 size="50%" color="white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile information with improved typography */}
              <div className="flex flex-col md:ml-8 mt-6 md:mt-0 text-center md:text-left flex-grow">
                <h1 className="text-3xl font-bold text-sky-800 mb-1">
                  {userPublicInfo?.role === "ADMIN" ? (
                    <div>
                      {userPublicInfo?.username}
                      <div className="badge badge-soft badge-warning ml-2">
                        <Crown size={18} />
                        <p className="font-medium">admin</p>
                      </div>
                    </div>
                  ) : (
                    userPublicInfo?.username
                  )}
                </h1>
                <p className="text-lg text-sky-600 opacity-80 mb-6">
                  {userPublicInfo?.email}
                </p>

                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="bg-blue-50 rounded-xl px-6 py-3 shadow-sm">
                    <p className="text-lg text-center not-only:font-medium text-sky-800">
                      Posts
                    </p>
                    <p className="text-3xl text-center font-bold text-sky-600">
                      {posts?.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit profile button with animation */}
              {user?.id === userPublicInfo.id && (
                <div className="mt-6 md:mt-0 flex justify-center md:justify-end items-start">
                  <button
                    onClick={() => navigate("/user/edit-profile")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-sky-800 rounded-full transition-all duration-300 shadow-xs hover:shadow group"
                  >
                    <span className="font-medium">Edit Profile</span>
                    <img
                      src={Edit}
                      alt="Edit icon"
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation tabs with elegant styling */}
          {/* <div className="flex w-full mt-8 mb-4 gap-2 overflow-x-auto scrollbar-hide">
            <button className="px-6 py-3 rounded-full text-sky-800 font-medium bg-white shadow-md hover:shadow-md transition-all duration-300 border-b-2 border-sky-500">
              Activity Feed
            </button>
            <button className="px-6 py-3 rounded-full text-sky-700 font-medium bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-b-2 hover:border-blue-300">
              Photos
            </button>
          </div> */}

          {/* Content area with grid layout for better responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-8">
            {/* Left sidebar */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 h-fit">
              {/* Create post section */}
              <div className="flex flex-col items-center gap-4 text-center">
                <h3 className="text-xl font-semibold text-sky-800">
                  Share your experience
                </h3>

                {user ? (
                  <Link to="/user/create-post" className="w-full">
                    <button className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-br from-sky-600 to-sky-500 text-white rounded-xl shadow-md hover:shadow-md transition-all duration-500 hover:from-sky-700 hover:to-sky-600 hover:cursor-pointer">
                      <Edit3Icon />
                      <span className="font-medium">Create Post</span>
                    </button>
                  </Link>
                ) : (
                  <Link to="/register" className="w-full">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-[var(--btnMain)] to-sky-600 text-white rounded-xl shadow-md hover:shadow-md transition-all duration-300 hover:bg-sky-600 hover:cursor-pointer hover:font-bold">
                      Sign Up
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Right content area - Posts table with elegant styling */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 overflow-hidden">
              {/* <h3 className="text-xl font-semibold text-sky-800 mb-4">
                Your Posts
              </h3>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-sky-50">
                      <th className="rounded-l-lg">#</th>
                      <th>Title</th>
                      <th>Province</th>
                      <th className="rounded-r-lg">Budget</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.map((el, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <th className="text-sky-600 font-medium">
                          {index + 1}
                        </th>
                        <td>
                          <Link
                            to={`/post/${el.id}`}
                            className="font-medium text-sky-700 hover:text-sky-500 transition-colors duration-200"
                          >
                            {el.title}
                          </Link>
                        </td>
                        <td className="text-gray-700">
                          {el.place.province.name}
                        </td>
                        <td className="font-medium text-right flex gap-2">
                          <Coins color="gold" size={20} />{" "}
                          <p className="text-right">
                            {new Intl.NumberFormat("en-US").format(el.budget)}
                          </p>
                        </td>
                        <td className="text-gray-700">
                          <ActionMenu />
                        </td>
                      </tr>
                    ))}
                    {posts.length === 0 && (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-8 text-gray-500"
                        >
                          No posts yet. Create your first post!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div> */}

              {/* All your existing code... */}

              {/* Modified Posts Table Section */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 overflow-hidden">
                <h3 className="text-xl font-semibold text-sky-800 mb-4">
                  Your Posts
                </h3>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="bg-sky-50">
                        <th className="rounded-l-lg">#</th>
                        <th>Title</th>
                        <th>Province</th>
                        <th className="rounded-r-lg">Budget</th>
                        {user?.id === userPublicInfo.id ? <th>Action</th> : ""}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Only render the visible number of rows */}
                      {posts?.slice(0, visibleRows)?.map((el, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <th className="text-sky-600 font-medium">
                            {index + 1}
                          </th>
                          <td>
                            <Link
                              to={`/post/${el?.id}`}
                              className="font-medium text-sky-700 hover:text-sky-500 transition-colors duration-200"
                            >
                              {el.title}
                            </Link>
                          </td>
                          <td className="text-gray-700">
                            {el.place.province.name}
                          </td>
                          <td className="font-medium text-right flex gap-2">
                            <Coins color="gold" size={20} />{" "}
                            <p className="text-right">
                              {new Intl.NumberFormat("en-US").format(el.budget)}
                            </p>
                          </td>
                          {user?.id === userPublicInfo.id ? (
                            <td className="text-gray-700">
                              <ActionMenu id={el?.id} />
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))}
                      {posts.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-8 text-gray-500"
                          >
                            No posts yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Show More/Less Button - only display if there are more than 10 posts */}
                  {posts.length > 10 && (
                    <div className="flex justify-center mt-4">
                      {visibleRows < posts.length ? (
                        <button
                          onClick={handleShowMore}
                          className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors duration-200 flex items-center gap-2"
                        >
                          <span>Show More</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={handleShowLess}
                          className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors duration-200 flex items-center gap-2"
                        >
                          <span>Show Less</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty div for modal components */}
        <div className="mt-20">
          {/* Edit profile */}
          {/* <CreatePost /> */}
          {/* <ChangeProfile /> */}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
