import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex justify-between items-center">
            <img src={logo} alt="logo" className="w-12 h-12" />
            <NavLink to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primaryClr">
                ShipifyPro
              </span>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/book-parcel"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              Book A Parcel
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "text-blue-600" : ""
                }`
              }
            >
              About Us
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/login"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-primaryClr text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Register
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
