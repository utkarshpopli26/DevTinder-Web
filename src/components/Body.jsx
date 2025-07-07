import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Body = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const fetchUser = async () => {
        if (user) return; 
        try {
            const res = await axios.get(BASE_URL + "/profile/", { withCredentials: true });
            dispatch(addUser(res.data.user));
            navigate("/");
        } catch (err) {
            if (!user && location.pathname !== "/login") {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        if (location.pathname !== "/login") {
            fetchUser();
        }
    }, [user, location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className={"flex-grow flex justify-center items-center background"}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Body;