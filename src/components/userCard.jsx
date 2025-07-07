import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { addConnection } from "../utils/connectionSlice";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
    if (!user) return null;

    const { _id, firstName, lastName, photoUrl, age, skills, about, gender } = user;
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSubmit = async (status) => {
        setIsAnimating(true);

        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + user._id, {}, { withCredentials: true });

            setTimeout(() => {
                dispatch(removeUserFromFeed({ _id: user._id }));
                setIsAnimating(false);
                if (status === "interested") {
                    dispatch(addConnection(user));
                }
            }, 300);
        }
        catch (err) {
            setError(err?.message || "Something went wrong, please try again.");
            setIsAnimating(false);
        }
    };

    return (
        user && (
            <div className={`card bg-base-300 w-96 shadow-sm ${isAnimating ? 'fade-out' : ''}`}>
                <figure>
                    <img
                        src={photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                        alt="Profile Picture"
                        className="w-full h-48 object-cover"
                    />
                </figure>
                <div className="card-body flex flex-col items-center">
                    {/* Name */}
                    <h2 className="card-title text-center text-lg font-bold">
                        {firstName + " " + lastName}
                    </h2>

                    {/* Age */}
                    {age && (
                        <p className="text-center text-sm">
                            Age: <span className="font-medium">{age}</span>
                        </p>
                    )}

                    {/* Gender */}
                    {gender && (
                        <p className="text-center text-sm">
                            Gender: <span className="font-medium">{gender}</span>
                        </p>
                    )}

                    {/* About Me */}
                    {about && (
                        <p className="text-center text-sm mt-2">
                            <span className="font-semibold">About Me:</span> {about}
                        </p>
                    )}

                    {/* Skills */}
                    {skills?.length > 0 && ( // Add null check for skills
                        <div className="mt-4">
                            <p className="text-center text-sm font-semibold">Skills:</p>
                            <div className="flex flex-wrap justify-center mt-2">
                                {skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="badge badge-secondary badge-outline m-1"
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary" onClick={() => handleSubmit("ignored")}>Ignore</button>
                        <button className="btn btn-secondary" onClick={() => handleSubmit("interested")}>Interested</button>
                    </div>
                    {error && (
                        <div className="text-red-400 mt-2 text-center">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default UserCard;