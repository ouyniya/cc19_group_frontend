import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../icons/logo.png";

import pagination from "../icons/pagination.png";
import Post from "../components/Home/post";
import TopLocation from "../components/Home/TopLocation";
import MoreExplore from "../components/Home/MoreExplore";
import Region from "../components/Home/Region";
import useUserStore from "../stores/userStore";
import MapCanvasExample from "../components/MapCanvasExample";

function Home() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  // const { user, token } = useUserStore();

  // useEffect(() => {
  //   if (!user && token) {
  //     actionGetMeOrGoogleLogin();
  //   }
  // }, []);

  // console.log(user)

  const hdlSearch = (e) => {
    setSearchText(e.target.value);
    // console.log(searchText)
    navigate(`/filter-page?placeName=${searchText}&province=&district=&page=1`);
  };

  return (
    <>
      {/* header */}
      {/* <NavbarHeader /> */}
      {/* Body1 */}
      <div>
        {/* Body top */}
        <div>
          {/* Where is your destination */}
          <div className="flex justify-center gap-2 mt-5">
            <p className="text-3xl font-bold text-[#193B53]"> WHERE IS YOUR </p>
            <p className="text-3xl font-bold text-[#086BB0]"> DESTINATION? </p>
          </div>
          {/* search bar */}

          <div className="flex justify-center gap-4 mt-5">
            <input
              type="search"
              className="input input-lg rounded-full w-[35%] p-5"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Find your destination"
            />
            <button
              onClick={(e) => hdlSearch(e)}
              className="btn rounded-full bg-[#086BB0] text-white text-xl h-12 w-25 border-0"
            >
              Search
            </button>
          </div>
        </div>
        {/* Body popular */}
        <div className="mt-5 px-4">
          <div className=" flex flex-wrap justify-center gap-2">
            <button className="btn border-0 rounded-full text-[#082F49] text-sm sm:text-base">
              Popular regions
            </button>
            <button className="btn border-0 rounded-full text-[#082F49] text-sm sm:text-base">
              Popular destination
            </button>
            <button className="btn border-0 rounded-full text-[#082F49] text-sm sm:text-base">
              Popular landmarks
            </button>
          </div>
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
            <p className="text-xl font-bold ml-37">Top locations on Voyager </p>
            <img src={logo} alt="icon destination" className="h-10 -mt-2" />
          </div>
          {/* post */}
          <TopLocation />
        </div>
        {/* More to explore */}
        <MoreExplore />
        {/* The most beautiful places */}
        <Region />

        <div>
        </div>
        {/* footer */}
        <div className="mt-5">
          <div className="bg-[#97BEE2] py-8">
            <div className="flex flex-wrap justify-center md:justify-around gap-8 md:gap-20 px-4  ">
              {/* left text */}
              <div className="w-full md:w-1/2 lg:w-1/3 text-white text-base md:text-lg lg:text-xl text-center md:text-left">
                <p>
                  VOYAGER: A website that compiles information on tourist
                  attractions in Thailand
                </p>
              </div>
              {/* right text */}

              <div className=" w-full md:w-1/4 text-white text-base md:text-lg lg:text-xl text-center md:text-left">
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
