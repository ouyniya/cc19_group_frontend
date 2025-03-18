import React, { useEffect } from "react";
import NavbarHeader from "../components/NavbarHeader";
import Profile from "../pictures/profile.png";
import Edit from "../icons/edit.png";
import EditProfile from "../components/UserDashboard/EditProfile";
import CreatePost from "../components/UserDashboard/CreatePost";
import ChangeProfile from "../components/UserDashboard/ChangeProfile";
import useUserStore from "../stores/userStore";
import { User2 } from "lucide-react";
import { Link } from "react-router";

function UserDashboard({ userId }) {
  const user = useUserStore((state) => state.user);
  // const getCurrentUser = useUserStore((state) => state.getCurrentUser);
  const actionGetUserInfoForDashboard = useUserStore(
    (state) => state.actionGetUserInfoForDashboard
  );
  const userPublicInfo = useUserStore((state) => state.userPublicInfo);
  const posts = useUserStore((state) => state.posts);
  const actionGetUserPosts = useUserStore((state) => state.actionGetUserPosts);

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
      <div>
        {/* NavBar */}
        {/* <NavbarHeader /> */}
        {/* User dashboard */}
        <div className="flex flex-col bg-blue-50 items-center h-180">
          {/* profile header */}
          <div className="flex  h-80 w-300 bg-white mt-5 ">
            {/* profile photo */}

            <div className="avatar flex items-center justify-center p-10">
              <div className="w-60 h-60 rounded-full bg-blue-200 flex items-center justify-center">
                {userPublicInfo?.profileImage ? (
                  <img
                    src={userPublicInfo?.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <User2 size="150px" color="white" />
                  </div>
                )}
              </div>
            </div>

            {/* profile information */}
            <div className="flex flex-col ml-5 mt-10  h-80 w-140">
              <p className="text-3xl mt-5 font-bold text-[#086BAF]">
                {userPublicInfo?.username}
              </p>
              <p className="text-lg mt-1  text-[#5989A3]">
                {userPublicInfo?.email}
              </p>
              <div className="flex flex-col mt-10">
                <p className="text-2xl  ml-3 font-bold text-[#086BAF]">Posts</p>
                <p className="text-2xl ml-3 font-bold text-[#B3B3B3]">
                  {posts?.length}
                </p>
              </div>
            </div>
            {/* Edit profile */}

            {user?.id === userPublicInfo.id ? (
              <div className="flex mt-14  h-80 w-80">
                <p className="ml-35 text-xl font-bold text-[#086BAF]">
                  Edit profile
                </p>
                <div
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  <img
                    src={Edit}
                    alt="Edit icon"
                    className="ml-2 mt-1 h-5 hover:cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* Activity feed + photo */}
          <div className="flex ml-20 w-full px-60 mt-3  ">
            <button className="btn rounded-full text-[#086BAF] text-xl font-bold bg-white border-0">
              Activity feed
            </button>
            <button className="ml-2 btn rounded-full text-[#086BAF] text-xl border-0 bg-white border-0">
              Photo
            </button>
          </div>
          {/* Board */}
          <div className="flex w-300 gap-5 mt-2">
            {/* Left board */}
            <div className=" bg-white h-100 w-120">
              {/* create post */}
              <div className="flex flex-col justify-center items-center rounded-xl gap-2 h-25 w-60 ">
                <p className="text-blue-900 text-xl">Share your experience</p>

                {user ? (
                  <>
                    <div className="flex">
                      <div
                        onClick={() =>
                          document.getElementById("my_modal_4").showModal()
                        }
                      >
                        <img
                          src={Edit}
                          alt="edit create post"
                          className="h-6 hover:cursor-pointer"
                        />
                      </div>

                      <p className="text-blue-900 text-xl">Create post</p>
                    </div>
                  </>
                ) : (
                  <button className="btn btn-info text-white bg-blue-300 rounded-full border-blue-300">
                    Sign up
                  </button>
                )}
              </div>
            </div>

            {/* Rigth board */}
            <div className=" h-100 w-300 bg-white px-10 py-10">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Province</th>
                      <th>Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {posts.map((el, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          <Link to={`/post/${el.id}`} className="link hover:link-info">{el.title}</Link>
                        </td>
                        <td>{el.place.province.name}</td>
                        <td>
                          {new Intl.NumberFormat("en-US").format(el.budget)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          {/* Edit profile */}

          {/* CreatePost */}
          {/* <CreatePost /> */}
          <ChangeProfile />
        </div>
      </div>

      {/* Modal Edit profile */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-95 w-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <EditProfile />
          </div>
        </div>
      </dialog>

      {/* Modal create post */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box h-100 w-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <CreatePost />
          </div>
        </div>
      </dialog>
    </>
  );
}

export default UserDashboard;
