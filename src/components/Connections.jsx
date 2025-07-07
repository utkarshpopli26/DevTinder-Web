import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("Something Went Wrong");
    const usersPerPage = 10;

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(setConnections(res.data.data));
        } catch (err) {
            setError(err?.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentConnections = connections.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(connections.length / usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="p-6 bg-base-200 min-h-screen min-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-neutral-content">Connections</h1>
            {currentConnections.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentConnections.map((connection, index) => (
                        connection && typeof connection === 'object' ? (
                            <div
                                key={index}
                                className="card bg-base-300 shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                            >
                                <figure>
                                    <img
                                        src={connection.photoUrl || "https://geographyandyou.com/images/user-profile.png"}
                                        alt={connection.name}
                                        className="w-full h-48 object-cover"
                                    />
                                </figure>
                                <h2 className="text-xl font-semibold text-white mb-2">
                                    {connection.firstName + " " + connection.lastName}
                                </h2>
                                <div className="text-neutral-content text-sm mb-4">
                                    {connection.skills && connection.skills.length > 0 ? (
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {connection.skills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="badge badge-secondary badge-outline"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span>No skills provided</span>
                                    )}
                                </div>
                                <button className="btn btn-primary w-full">View Profile</button>
                            </div>
                        ) : null
                    ))}
                </div>
            ) : (
                <div className="text-center text-neutral-content">No connections found.</div>
            )}

            {/* Pagination Controls */}
            {connections.length > usersPerPage && (
                <div className="flex justify-center items-center mt-8 gap-4">
                    <button
                        className="btn btn-secondary"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-neutral-content font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn btn-secondary"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Connections;