import React from "react";
import Logo from "./Logo";
import RightBar from "./RightBar";

function NavbarHeader() {
  return (
    <div className="flex justify-between">
      <Logo />
      <RightBar />
    </div>
  );
}

export default NavbarHeader;
