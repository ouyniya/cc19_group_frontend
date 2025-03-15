import React, { useEffect, useState } from "react";
// import NavbarHeader from "../components/NavbarHeader";
import Search from "../components/Search";
import logo from "../icons/logo.png";

import pagination from "../icons/pagination.png";
import Post from "../components/Home/post";
import TopLocation from "../components/Home/TopLocation";
import MoreExplore from "../components/Home/MoreExplore";
import Region from "../components/Home/Region";
import LoginGoogle1 from "./LoginGoogle1";
import SignUpGoogle from "./SignUpGoogle";
import axios from "axios";
import useUserStore from "../stores/userStore";

function Home() {
  const { user, actionGoogleLogin } = useUserStore();

  useEffect(() => {
    actionGoogleLogin()
  }, []);

  return (
    <>
      {/* header */}
      {/* <NavbarHeader /> */}
      {/* Body1 */}
      <div>
        {/* Body top */}
        <div>
          <LoginGoogle1 />
          <SignUpGoogle />
          {/* Where is your destination */}
          <div className="flex justify-center gap-2 mt-5">
            <p className="text-3xl font-bold text-[#193B53]"> WHERE IS YOUR </p>
            <p className="text-3xl font-bold text-[#A3B3BB]"> DESTINATION? </p>
          </div>
          {/* search bar */}

          <div className="flex justify-center gap-1 mt-5">
            <Search />
            <button className="btn rounded-full bg-[#086BB0] text-white text-xl h-12 w-25 border-0">
              Search
            </button>
          </div>
        </div>
        {/* Body popular */}
        <div className=" w-full h-10 mt-5 flex ml-50 gap-2">
          <button className="btn border-0 rounded-full text-[#082F49]">
            Popular regions
          </button>
          <button className="btn border-0 rounded-full text-[#082F49]">
            Popular destination
          </button>
          <button className="btn border-0 rounded-full text-[#082F49]">
            Popular landmarks
          </button>
        </div>
        {/* Body get post */}
        <Post />
        {/* pagination */}
        <div className="flex justify-center mt-3 ">
          <img src={pagination} alt="pagination logo" className="w-20 " />
        </div>
      </div>

      {/* Body2 */}
      <div>
        {/* Top locations on Voyager  */}
        <div className="mt-15">
          {/* text */}
          <div className="flex">
            <p className="text-xl font-bold ml-10">Top locations on Voyager </p>
            <img src={logo} alt="icon destination" className="h-10 -mt-2" />
          </div>
          {/* post */}
          <TopLocation />
        </div>
        {/* More to explore */}
        <MoreExplore />
        {/* The most beautiful places */}
        <Region />
        {/* footer */}
        <div className="mt-5">
          <div className="h-60 w-full bg-[#97BEE2]">
            <div className="flex justify-center gap-100  ">
              {/* left text */}
              <div className="w-100 mt-22 text-white text-xl">
                <p>
                  VOYAGER: A website that compiles information on tourist
                  attractions in Thailand
                </p>
              </div>
              {/* right text */}

              <div className="flex flex-col mt-22 text-white text-xl">
                <p>Advertising Inquiries:</p>
                <p>Email: voyager@mail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
