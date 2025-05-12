import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='flex justify-between '>
            <div className='w-[20%]'>
                <Sidebar></Sidebar>
            </div>
            <div className='w-[80%]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;