import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async () => {
        if(isLoginForm){
            try {
                
                const res = await axios.post(
                    "http://localhost:3000/login",
                    {
                        emailId: email,
                        password: password,
                    },
                    { withCredentials: true }
                );
                dispatch(addUser(res.data));
                navigate("/");
            } catch (err) {
                setError(err?.response?.data || "Something went wrong. Please try again.");
            }
        }
        else{
            try {
                const res = await axios.post(
                    "http://localhost:3000/signup",
                    {
                        firstName: firstName,
                        lastName: lastName,
                        emailId: email,
                        password: password,
                    },
                    { withCredentials: true }
                );
                dispatch(addUser(res.data));
                navigate("/profile");
            } catch (err) {
                setError(err?.response?.data || "Something went wrong. Please try again.");
            }
        }
        
    };

    const [email, setEmail] = useState("utkarsh.popli@gmail.com");
    const [password, setPassword] = useState("Utkarsh@popli1");

    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>
                    <div className="justify-center text-center my-4">
                     
                        {!isLoginForm && <><label className="input validator mb-4">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <legend className="fieldset-legend">First Name</legend>
                            <input
                                type="text"
                                required
                                placeholder="First Name"
                                minLength="3"
                                maxLength="30"
                                title="Only letters"
                                onChange={(e) => {setFirstName(e.target.value);}}
                                value={firstName}
                            />
                        </label>

                       
                        <label className="input validator mb-4">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <legend className="fieldset-legend">Last Name</legend>
                            <input
                                type="text"
                                placeholder="Last Name"
                                minLength="3"
                                maxLength="30"
                                title="Only letters"
                                onChange={(e) => {setLastName(e.target.value);}}
                                value={lastName}
                            />
                        </label></>}

                     
                        <label className="input validator mb-4">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect
                                        width="20"
                                        height="16"
                                        x="2"
                                        y="4"
                                        rx="2"
                                    ></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <legend className="fieldset-legend">Email</legend>
                            <input
                                type="email"
                                placeholder="mail@site.com"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                required
                            />
                        </label>

                     
                        <label className="input validator mb-4">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                    <circle
                                        cx="16.5"
                                        cy="7.5"
                                        r=".5"
                                        fill="currentColor"
                                    ></circle>
                                </g>
                            </svg>
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter, and special character"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </label>

                        <p className="text-red-400 mt-2">{error}</p>
                    </div>
                    
                       <div className="flex justify-center">
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                {isLoginForm ? "Login" : "Sign Up"}
                            </button>
                        </div>
                        <div className="flex justify-center mt-2">{isLoginForm ? "New User? " : "Existing User? "} 
                            <button onClick={()=> {setIsLoginForm((value)=> !value)}} className="ml-2 cursor-pointer"><b>{isLoginForm ? " Sign Up here." : " Login here."}</b></button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;