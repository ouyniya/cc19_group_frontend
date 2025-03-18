import React, { useEffect } from "react";
import NavbarHeader from "../components/NavbarHeader";
import Profile from "../pictures/profile.png";
import Edit from "../icons/edit.png";
import EditProfile from "../components/UserDashboard/EditProfile";
import CreatePost from "../components/UserDashboard/CreatePost";
import ChangeProfile from "../components/UserDashboard/ChangeProfile";
import useUserStore from "../stores/userStore";
import { User2 } from "lucide-react";

function UserDashboard({ userId }) {
  const user = useUserStore((state) => state.user);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);

  useEffect(() => {
    // get user data
    callGetUser();
  }, [user]);

  const callGetUser = async () => {
    await getCurrentUser();
    await getCurrentUser();
  };

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
                {user?.profileImage ? (
                  <img
                    src={user?.profileImage}
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
                {user?.username}
              </p>
              <p className="text-lg mt-1  text-[#5989A3]">{user?.email}</p>
              <div className="flex flex-col mt-10">
                <p className="text-2xl  ml-3 font-bold text-[#086BAF]">Posts</p>
                <p className="text-2xl ml-3 font-bold text-[#B3B3B3]">315</p>
              </div>
            </div>
            {/* Edit profile */}
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
              <div className="flex flex-col  justify-center rounded-xl gap-2 h-25 w-60 ">
                <p className="text-blue-900 text-xl mt-5 ml-10 ">
                  Share your experience
                </p>
                <div className="flex ml-15 ">
                  <div
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    <img
                      src={Edit}
                      alt="edit create post"
                      className="ml-3 mt-5  h-6 hover:cursor-pointer"
                    />
                  </div>

                  <p className="text-blue-900 text-xl mt-5 ml-2 ">
                    Create post
                  </p>
                </div>
              </div>
            </div>

            {/* Rigth board */}
            <div className=" h-100 w-300 bg-white"></div>
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
