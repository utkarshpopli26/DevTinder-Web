import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addConnection } from "../utils/connectionSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const fetchRequests = async () => {
        try {
            const res = await axios.get("http://localhost:3000/user/requests/pending", { withCredentials: true });
            setRequests(res?.data?.data?.pendingRequest || []);
        } catch (err) {
            console.error("Error fetching pending requests:", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentRequests = requests.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(requests.length / usersPerPage);

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

    const handleAcceptRequest = async (requestId) => {
        try {
            const res = await axios.post(`http://localhost:3000/request/recieve/accepted/${requestId}`, {}, { withCredentials: true });
            const acceptedUser = res.data.user;
            dispatch(addConnection(acceptedUser));
            setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));
        } catch (err) {
            console.error("Error accepting request:", err);
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await axios.post(`http://localhost:3000/request/recieve/rejected/${requestId}`, {}, { withCredentials: true });
            setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));
        } catch (err) {
            console.error("Error rejecting request:", err);
        }
    };

    return (
        <div className="p-6 bg-base-200 min-h-screen min-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-neutral-content">Pending Requests</h1>
            {currentRequests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentRequests.map((request, index) => (
                        <div
                            key={index}
                            className="card bg-base-300 shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                        >
                            <figure>
                                <img
                                    src={request.photoUrl || "https://via.placeholder.com/150"}
                                    alt={request.name}
                                    className="w-full h-48 object-cover"
                                />
                            </figure>
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {request.firstName + " " + request.lastName}
                            </h2>
                            <div className="text-neutral-content text-sm mb-4">
                                {request.skills && request.skills.length > 0 ? (
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {request.skills.map((skill, skillIndex) => (
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
                            <div className="flex gap-2 w-full">
                                <button
                                    className="btn btn-success flex-grow"
                                    onClick={() => handleAcceptRequest(request.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-error flex-grow"
                                    onClick={() => handleRejectRequest(request.id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-neutral-content">No pending requests found.</p>
            )}

            {/* Pagination Controls */}
            {requests.length > usersPerPage && (
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

export default Requests;