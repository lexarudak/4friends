import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api";

export type Rooms = {
  [key: string]: string;
};

type UserInfo = {
  USERNAME: string;
  ACTIVEROOMID: string;
  ROOMS: Rooms;
  USERID: number;
};

const initialState: UserInfo = {
  USERNAME: "",
  ACTIVEROOMID: "",
  ROOMS: {},
  USERID: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveRoom(state, action) {
      state.ACTIVEROOMID = action.payload;
    },
    clearUser(state) {
      state.ACTIVEROOMID = initialState.ACTIVEROOMID;
      state.USERID = initialState.USERID;
      state.USERNAME = initialState.USERNAME;
      state.ROOMS = initialState.ROOMS;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.user.matchFulfilled,
      (state, { payload }) => {
        if (payload.SUCCESS) {
          state.ACTIVEROOMID = payload.DATA.ACTIVEROOM.toString();
          state.ROOMS = payload.DATA.ROOMS;
          state.USERID = payload.USERID;
          state.USERNAME = payload.DATA.USERNAME;
        }
      },
    );
  },
});

export const { setActiveRoom, clearUser } = userSlice.actions;

export default userSlice.reducer;
