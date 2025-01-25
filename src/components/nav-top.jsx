import React from "react";
import { useAuth } from "../AuthContext";
import logo from "../assets/images/logo.jpg";
import UserDetail from "./userDetails";

const NavTop = () => {
  const { firstname } = useAuth();
  return (
    <section className="bg-white border-b border-stone-50 shadow-md w-full fixed top-0 z-40">
      <div className="flex justify-between items-center gap-5 mx-5 py-5">
        <img src={logo} alt="logo" className="max-w-36 sm:max-w-40" />
        {firstname && <UserDetail firstName={firstname} />}
      </div>
    </section>
  );
};

export default NavTop;
