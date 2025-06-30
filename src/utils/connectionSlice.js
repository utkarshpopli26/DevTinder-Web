import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: [],
    reducers: {
        setConnections: (state, action) => {
            return action.payload;
        },
        addConnection: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { setConnections, addConnection } = connectionsSlice.actions;
export default connectionsSlice.reducer;