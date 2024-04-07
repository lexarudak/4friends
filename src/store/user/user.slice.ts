import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeRoom: "Test room",
  rooms: ["Test room", "Second room", "One more room"],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveRoom(state, action) {
      state.activeRoom = action.payload;
    },
  },
});

export const { setActiveRoom } = userSlice.actions;

export default userSlice.reducer;
