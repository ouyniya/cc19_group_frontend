import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
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
      <div className="max-w-[1500px] m-auto">
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
              className="inline-flex items-center px-6 py-2.5 bg-gradient-to-b from-[var(--btnMain)] to-sky-600 hover:bg-sky-600 text-white font-medium rounded-full shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Search
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
      <div className="max-w-[1500px] m-auto">
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

        <div></div>
        {/* footer */}
        {/* <div className="mt-5">
          <div className="bg-[#97BEE2] py-8">
            <div className="flex flex-wrap justify-center md:justify-around gap-8 md:gap-20 px-4  ">
             
              <div className="w-full md:w-1/2 lg:w-1/3 text-white text-base md:text-lg lg:text-xl text-center md:text-left">
                <p>
                  VOYAGER: A website that compiles information on tourist
                  attractions in Thailand
                </p>
              </div>
              

              <div className=" w-full md:w-1/4 text-white text-base md:text-lg lg:text-xl text-center md:text-left">
                <p>Advertising Inquiries:</p>
                <p>Email: voyager@mail.com</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="bg-[var(--darkGray)]">
        <div className="max-w-[1500px] m-auto">
          <footer className="footer sm:footer-horizontal sm:pl-[16%] bg-[var(--darkGray)] text-neutral-content p-10 mt-12">
            <nav>
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
              <h6 className="footer-title">Legal</h6>
              <Link to="/terms" className="link link-hover">
                Terms and Conditions
              </Link>
              <Link to="/privacy" className="link link-hover">
                Privacy policy
              </Link>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
