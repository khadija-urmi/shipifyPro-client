import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../share/Loading/Loading";
import PropTypes from "prop-types";


const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();


    if (isLoading) {
        return <Loading />
    }
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>

};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PrivateRoute;