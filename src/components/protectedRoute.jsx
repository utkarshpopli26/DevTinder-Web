import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((store) => store.user);
    const location = useLocation();

    // If the user is not logged in, redirect to the login page
    if (!user && location.pathname !== "/login") {
        return <Navigate to="/login" />;
    }

    // If the user is logged in, render the children components
    return children;
};

export default ProtectedRoute;