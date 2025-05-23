import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
