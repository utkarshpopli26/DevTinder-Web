import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("http://localhost:3000/logout", {} , {withCredentials: true});
        dispatch(removeUser());
        navigate("/login");    
    }

    return (
        <div className="navbar bg-neutral shadow-sm">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl ml-12">DevTinder</Link>
            </div>
            {user && <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                {user && (<div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-12 avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="user profile picture"
                        src={user.photoUrl} />
                    </div>
                </div>)}
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <Link to={"/profile"} className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
                </div>
            </div>}
        </div>
    );
}

export default Navbar;