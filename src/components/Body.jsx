import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Body = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (user) return; 
        try {
            const res = await axios.get("http://localhost:3000/profile/", { withCredentials: true });
            dispatch(addUser(res.data.user));
        } catch (err) {
            console.error("Error fetching user:", err);
            if (!user && location.pathname !== "/login") {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        if (user && location.pathname === "/login") {
            navigate("/profile");
        } else {
            fetchUser();
        }
    }, [user, location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className={"flex-grow flex justify-center items-center"}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Body;