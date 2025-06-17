const UserCard = ({ user }) => {
    if(!user) return null;
    const { firstName, lastName, photoUrl, age, skills, about } = user;
    return (
        user && (
            <div className="card bg-base-300 w-96 shadow-sm">
                <figure>
                    <img
                        src={photoUrl}
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
                        <p className="text-center text-sm text-gray-500">
                            Age: <span className="font-medium">{age}</span>
                        </p>
                    )}

                    {/* About Me */}
                    {about && (
                        <p className="text-center text-sm mt-2">
                            <span className="font-semibold">About Me:</span> {about}
                        </p>
                    )}

                    {/* Skills */}
                    {skills.length > 0 && (
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
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Interested</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default UserCard;