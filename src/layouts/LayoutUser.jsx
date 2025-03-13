import React from "react";
import { Outlet } from "react-router";
import NavbarHeader from "../components/NavbarHeader";

function LayoutUser() {
  return (
    <>
      <NavbarHeader />
      <Outlet />
    </>
  );
}

export default LayoutUser;
