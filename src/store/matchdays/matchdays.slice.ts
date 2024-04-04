import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  from: number;
  to: number;
};

const initialState: InitialState = {
  from: Date.now().valueOf(),
  to: Date.now().valueOf(),
};

const matchdaysSlice = createSlice({
  name: "matchdays",
  initialState,
  reducers: {
    setFrom(state, action) {
      state.from = action.payload;
    },
    setTo(state, action) {
      state.to = action.payload;
    },
  },
});

export const { setFrom, setTo } = matchdaysSlice.actions;

export default matchdaysSlice.reducer;
