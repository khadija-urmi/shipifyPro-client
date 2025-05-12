import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useUser from '../Hooks/useUser';
import Loading from '../share/Loading/Loading';

const DeliveryMenRoutes = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [users, isLoading] = useUser();
    const location = useLocation();


    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const isDeliveryMan = users?.role === "Delivery Man";

    if (!isDeliveryMan) {
        return <Navigate to="/dashboard/myDeliveryList" replace />;
    }

    return children;
};

export default DeliveryMenRoutes;