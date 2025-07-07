import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {addFeed} from "../utils/feedSlice";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";

const Feed = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/feed", {withCredentials: true});
            dispatch(addFeed(res.data));
        } catch(err){
            setError(err.message);
        }
    }

    useEffect(() => {
        getFeed();
    },[]);  

    return (
        <div className="flex justify-center items-center">
            {(error || !feed) && <div className="flex justify-center items-center">
                <div className="text-red-400">Something went wrong. Please try again.</div>
            </div>}
            
            <div className="">
                <UserCard user={feed[0]}/>
            </div>
        </div>
    );
};

export default Feed;