import { useState } from "react";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const [successMssg, setSuccessMssg] = useState(null);
    const [error, setError] = useState(null);
    const userFromStore = useSelector((store) => store.user);
    const [user, setUser] = useState({
        firstName: userFromStore?.firstName || "",
        lastName: userFromStore?.lastName || "",
        age: userFromStore?.age || "",
        gender: userFromStore?.gender || "",
        about: userFromStore?.about || "",
        photoUrl: userFromStore?.photoUrl || "",
        skills: userFromStore?.skills || [],
    });

    const [skillInput, setSkillInput] = useState("");

    const handleAddSkill = () => {
        if (skillInput.trim() === "") return;
        if (user.skills.length >= 10) return;
        setUser((prevUser) => ({
            ...prevUser,
            skills: [...prevUser.skills, skillInput.trim()],
        }));
        setSkillInput("");
    };

    const handleDeleteSkill = (index) => {
        setUser((prevUser) => ({
            ...prevUser,
            skills: prevUser.skills.filter((_, i) => i !== index),
        }));
    };

    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const saveProfile = async () => {
        try{
            const res = await axios.patch(
                "http://localhost:3000/profile/edit",
                { ...user },
                { withCredentials: true }
            );
            setSuccessMssg(res?.data?.message);
            setError(null);
        } catch(err){
            setError(err?.response?.data || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex">
            {/* Profile Editing Form */}
            <div className="card bg-base-300 w-96 shadow-sm flex-grow">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div className="justify-center text-center my-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input
                                type="text"
                                className="input w-full"
                                value={user.firstName}
                                onChange={(e) =>
                                    handleInputChange("firstName", e.target.value)
                                }
                            />
                        </fieldset>

                        <fieldset className="fieldset mt-2">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input
                                type="text"
                                className="input w-full"
                                value={user.lastName}
                                onChange={(e) =>
                                    handleInputChange("lastName", e.target.value)
                                }
                            />
                        </fieldset>

                        <fieldset className="fieldset mt-2">
                            <legend className="fieldset-legend">Age</legend>
                            <input
                                type="text"
                                className="input w-full"
                                value={user.age}
                                onChange={(e) => handleInputChange("age", e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="fieldset mt-2">
                            <legend className="fieldset-legend">Profile Pic Url</legend>
                            <input
                                type="text"
                                className="input w-full"
                                value={user.photoUrl}
                                onChange={(e) =>
                                    handleInputChange("photoUrl", e.target.value)
                                }
                            />
                        </fieldset>

                        <legend className="fieldset-legend mt-2 justify-center">Gender</legend>
                        <select
                            value={user.gender}
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                            className="select w-full"
                        >
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>

                        <legend className="fieldset-legend mt-2 justify-center">About</legend>
                        <textarea
                            className="textarea max-h-32 w-full"
                            maxLength={250}
                            value={user.about}
                            onChange={(e) => handleInputChange("about", e.target.value)}
                        ></textarea>

                        <fieldset className="fieldset mt-2">
                            <legend className="fieldset-legend">Skills</legend>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Enter a skill"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleAddSkill}
                                    disabled={user.skills.length >= 10}
                                >
                                    Add
                                </button>
                            </div>
                            {user.skills.length >= 10 && (
                                <p className="text-sm text-red-500 mt-1">
                                    You can only add up to 10 skills.
                                </p>
                            )}
                        </fieldset>

                        {/* Display Added Skills */}
                        {user.skills.length > 0 && (
                            <div className="mt-4">
                                <p className="text-center text-sm font-semibold">
                                    Added Skills:
                                </p>
                                <div className="flex flex-wrap justify-center mt-2">
                                    {user.skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="badge badge-secondary badge-outline m-1 flex items-center gap-2"
                                        >
                                            {skill}
                                            <button
                                                className="btn btn-xs btn-error p-0 h-4 w-4 flex items-center justify-center"
                                                onClick={() => handleDeleteSkill(index)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={saveProfile}>
                            Save Profile
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-400 mt-2 text-center">
                            {error}
                        </div>
                    )}
                    {successMssg && (
                        <div className="text-green-400 mt-2 text-center">
                            {successMssg}
                        </div>
                    )}
                </div>
            </div>

            {/* UserCard */}
            <div className="ml-10 flex-grow flex items-center justify-center">
                <UserCard user={user} />
            </div>
        </div>
    );
};

export default Profile;