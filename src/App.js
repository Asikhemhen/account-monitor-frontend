import React, { Component, useState } from "react";
import "./styles/tailwind.css";
import Main from "./components/main";
import NavTop from "./components/nav-top";
import AccountDetails from "./components/account-details";
import Footer from "./components/footer";

const App = () => {
  return (
    <div>
      <NavTop />
      <AccountDetails />
      {/* <Main /> */}
      <Footer />
    </div>
  );
};

export default App;
