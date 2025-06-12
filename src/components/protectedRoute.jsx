import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((store) => store.user);

    // If the user is not logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If the user is logged in, render the children components
    return children;
};

export default ProtectedRoute;