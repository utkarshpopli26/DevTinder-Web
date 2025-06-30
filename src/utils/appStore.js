import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
        connections: connectionSlice
    }
});

export default store;