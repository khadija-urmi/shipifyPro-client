import React from 'react';
import { FaBoxes, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FaUsersViewfinder } from "react-icons/fa6";
import { CgProfile } from 'react-icons/cg';

const AdminMenus = () => {
    return (
        <div className='dark:text-black  space-y-4'>

            <NavLink to='statistics' className='flex items-center space-x-2'>Statistic</NavLink>
            <NavLink to='allUsers' className='flex items-center space-x-2'><FaUsers /> All Users</NavLink>
            <NavLink to='allParcel' className='flex items-center space-x-2'><FaBoxes />All Parcel</NavLink>
            <NavLink to='allDeliveryMen' className='flex items-center space-x-2'><FaUsersViewfinder /> All Delivery Men</NavLink>
            <NavLink to='/dashboard/myProfile' className='flex items-center space-x-2'><CgProfile /> My Profile</NavLink>

        </div>
    );
};

export default AdminMenus;