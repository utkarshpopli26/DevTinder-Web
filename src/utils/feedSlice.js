import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: [],
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeUserFromFeed: (state, action) => {
            return state.filter(item => item._id !== action.payload._id);
        },
        removeFeed: (state) => {
            return [];
        }
    }
});

export const {addFeed, removeFeed,removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;