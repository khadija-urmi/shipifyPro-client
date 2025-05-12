import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { Navigate, NavLink } from "react-router-dom";
import UserMenus from "../menus/UserMenus";
import DeliveryMenMenus from "../menus/DeliveryMenMenus";
import AdminMenus from "../menus/AdminMenus";
import useUser from "../../../Hooks/useUser";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const [users, isLoading] = useUser('');
  // console.log(users?.role);
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  console.log('user role', users.role);


  return (
    <div>
      {/* Mobile Header */}
      <div className="flex overflow-x-hidden justify-between items-center bg-gray-100 md:hidden px-8 py-3">
        <h2 className="text-2xl font-semibold">SwiftParcel</h2>
        <button onClick={handleToggle}>
          <IoMdMenu size={30} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed overflow-x-hidden bg-purple-300 w-[20%] space-y-6 px-2 py-4 absolute inset-y-0 ${toggle ? "-translate-x-full" : ""
          } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <h2 className="text-2xl font-semibold px-4 py-2 justify-center items-center text-primaryClr mx-auto">
            ShipifyPro
          </h2>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col justify-between flex-1 mt-6 space-y-3 text-lg px-3">
          {users?.role === "User" && <UserMenus />}
          {users?.role === "Delivery Man" && <DeliveryMenMenus />}
          {users?.role === "Admin" && <AdminMenus />}
          <NavLink to="/" className="flex items-center dark:text-black">
            <FaHome /> Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;