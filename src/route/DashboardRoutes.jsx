import useUser from '../Hooks/useUser';
import React from 'react';
import { Navigate } from 'react-router-dom';

const DashboardRoutes = () => {
    const [users] = useUser('');
    if (users.role === "Admin") {
        return <Navigate to='/dashboard/statistics'></Navigate>
    }
    return (
        <div>

        </div>
    );
};

export default DashboardRoutes;