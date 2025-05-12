import { Navigate } from 'react-router-dom';
import useUser from '../Hooks/useUser';
import useAuth from '../Hooks/useAuth';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const [users, isLoading] = useUser();
    if (loading || isLoading) {
        return <h2>Loading...</h2>
    }
    if (users?.role === "Admin") {
        return children
    }
    return <Navigate to='/dashboard/statistics' replace></Navigate>
};

export default AdminRoutes;