import React from "react";
import { Outlet } from "react-router";
import NavbarHeader from "../components/NavbarHeader";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <NavbarHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
