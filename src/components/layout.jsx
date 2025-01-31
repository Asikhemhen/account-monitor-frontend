import React, { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./nav-top";
import Footer from "./footer";
import Sidebar from "./sideBar";

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, force a redirect to the login page
      window.location.replace("/login");
    }
  }, [isAuthenticated]);

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
