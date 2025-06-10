import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
    const isLoginRoute = location.pathname === "/login";
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div
                className={`flex-grow ${
                    isLoginRoute ? "flex flex-col justify-center items-center" : ""
                }`}
            >
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Body;