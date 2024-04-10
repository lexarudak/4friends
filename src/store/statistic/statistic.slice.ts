import { createSlice } from "@reduxjs/toolkit";

export type UserPoints = {
  username: string;
  points: number;
};

const mockedTable: UserPoints[] = [
  { username: "Val", points: 101 },
  { username: "kam", points: 94 },
  { username: "valera", points: 5 },
  {
    username: "Man with real long username username username username",
    points: 0,
  },
];

const initialState = {
  table: mockedTable,
};

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {},
});

// export const { toggleMenu, closeMenu } = statisticSlice.actions;

export default statisticSlice.reducer;
