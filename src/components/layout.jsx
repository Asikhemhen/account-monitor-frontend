import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./nav-top";
import Footer from "./footer";
import Sidebar from "./sideBar";

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-layout">
      <div className="main-content">
        <Navbar />
        <main>
          {!isLoginPage && <Sidebar />}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
