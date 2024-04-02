import { createSlice } from "@reduxjs/toolkit";

export type User = {
  name: string;
  points: number;
};

const mockedTable: User[] = [
  { name: "Val", points: 101 },
  { name: "kam", points: 94 },
  { name: "valera", points: 5 },
  { name: "Man with real long username username username username", points: 0 },
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
