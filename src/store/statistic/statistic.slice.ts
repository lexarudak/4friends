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

const mockedExact: UserPoints[] = [
  { username: "Val", points: 10 },
  { username: "kam", points: 5 },
  { username: "valera", points: 2 },
  {
    username: "Man with real long username username username username",
    points: 0,
  },
];

const mockedWins: UserPoints[] = [
  { username: "Val", points: 10 },
  { username: "kam", points: 15 },
  { username: "valera", points: 5 },
  {
    username: "Man with real long username username username username",
    points: 0,
  },
];

const mockedAverage: UserPoints[] = [
  { username: "Val", points: 5.34 },
  { username: "kam", points: 4.33 },
  { username: "valera", points: 1.2 },
  {
    username: "Man with real long username username username username",
    points: 5.43,
  },
];

const initialState = {
  table: mockedTable,
  exact: mockedExact,
  wins: mockedWins,
  average: mockedAverage,
};

export type StatisticState = typeof initialState;

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {},
});

export default statisticSlice.reducer;
