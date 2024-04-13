import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

export type Rooms = {
  [key: string]: string;
};

type UserInfo = {
  username: string;
  activeRoom: string;
  rooms: Rooms;
  userId: number;
};

const initialState: UserInfo = {
  username: "",
  activeRoom: "",
  rooms: {},
  userId: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveRoom(state, action) {
      state.activeRoom = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.user.matchFulfilled,
      (state, { payload }) => {
        if (payload.SUCCESS) {
          state.activeRoom = payload.DATA.ACTIVEROOM.toString();
          state.rooms = payload.DATA.ROOMS;
          console.log("success", payload, state);
        }
        console.log("other fail", payload);
      },
    );
  },
});

export const { setActiveRoom } = userSlice.actions;

export default userSlice.reducer;
