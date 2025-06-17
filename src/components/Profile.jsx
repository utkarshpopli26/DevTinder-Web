import { useState } from "react";
import UserCard from "./userCard";
import { useSelector } from "react-redux";

const Profile = () => {
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const user = useSelector((store) => store.user);

    const handleAddSkill = () => {
        if (skillInput.trim() === "") return;
        if (skills.length >= 10) return;
        setSkills([...skills, skillInput.trim()]);
        setSkillInput("");
    };

    const handleDeleteSkill = (index) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
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
                            <input type="text" className="input w-full" placeholder="First Name" />
                        </fieldset>

                        <fieldset className="fieldset mt-2">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input w-full" placeholder="Last Name" />
                        </fieldset>

                        <fieldset className="fieldset mt-2">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="text" className="input w-full" placeholder="Age" />
                        </fieldset>

                        <fieldset className="fieldset mt-2">
                            <legend className="fieldset-legend">Profile Pic Url</legend>
                            <input type="text" className="input w-full" placeholder="URL" />
                        </fieldset>

                        <legend className="fieldset-legend mt-2 justify-center">Gender</legend>
                        <select defaultValue="Gender" className="select w-full">
                            <option disabled={true}>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                        </select>

                        <legend className="fieldset-legend mt-2 justify-center">About</legend>
                        <textarea
                            className="textarea max-h-32 w-full"
                            maxLength={250}
                            placeholder="About"
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
                                    disabled={skills.length >= 10}
                                >
                                    Add
                                </button>
                            </div>
                            {skills.length >= 10 && (
                                <p className="text-sm text-red-500 mt-1">
                                    You can only add up to 10 skills.
                                </p>
                            )}
                        </fieldset>

                        {/* Display Added Skills */}
                        {skills.length > 0 && (
                            <div className="mt-4">
                                <p className="text-center text-sm font-semibold">Added Skills:</p>
                                <div className="flex flex-wrap justify-center mt-2">
                                    {skills.map((skill, index) => (
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
                        <button className="btn btn-primary">Save Profile</button>
                    </div>
                </div>
            </div>

            {/* UserCard */}
            <div className="ml-10 flex-grow flex items-center">
                {user && <UserCard user={user} />}
            </div>
        </div>
    );
}

export default Profile;