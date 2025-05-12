import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "Logged out successfully!",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

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
                `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${isActive ? "text-blue-600" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="dashboard/bookParcel"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${isActive ? "text-blue-600" : ""}`
              }
            >
              Book A Parcel
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${isActive ? "text-blue-600" : ""}`
              }
            >
              About Us
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 
                  rounded-md text-sm font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-primaryClr text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </NavLink>
              </>
            ) : (
              // User Button & Dropdown
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primaryClr">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full text-primaryClr" />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 py-1">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <MdOutlineSpaceDashboard className="w-5 h-5 mr-2" />
                      Dashboard
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <IoMdLogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
