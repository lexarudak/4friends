import { createSlice } from "@reduxjs/toolkit";

export type UserPoints = {
  USERNAME: string;
  POINTS: number;
};

// const mockedTable: UserPoints[] = [
//   { USERNAME: "Val", POINTS: 101 },
//   { USERNAME: "kam", POINTS: 94 },
//   { USERNAME: "valera", POINTS: 5 },
//   {
//     USERNAME: "Man with real long USERNAME USERNAME USERNAME USERNAME",
//     POINTS: 0,
//   },
// ];

const mockedExact: UserPoints[] = [
  { USERNAME: "Val", POINTS: 10 },
  { USERNAME: "kam", POINTS: 5 },
  { USERNAME: "valera", POINTS: 2 },
  {
    USERNAME: "Man with real long USERNAME USERNAME USERNAME USERNAME",
    POINTS: 0,
  },
];

const mockedWins: UserPoints[] = [
  { USERNAME: "Val", POINTS: 10 },
  { USERNAME: "kam", POINTS: 15 },
  { USERNAME: "valera", POINTS: 5 },
  {
    USERNAME: "Man with real long USERNAME USERNAME USERNAME USERNAME",
    POINTS: 0,
  },
];

const mockedAverage: UserPoints[] = [
  { USERNAME: "Val", POINTS: 5.34 },
  { USERNAME: "kam", POINTS: 4.33 },
  { USERNAME: "valera", POINTS: 1.2 },
  {
    USERNAME: "Man with real long USERNAME USERNAME USERNAME USERNAME",
    POINTS: 5.43,
  },
];

const initialState = {
  table: [],
  exact: mockedExact,
  wins: mockedWins,
  average: mockedAverage,
};

export type StatisticState = typeof initialState;

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setTable(state, action) {
      state.table = action.payload;
    },
  },
});

export const { setTable } = statisticSlice.actions;

export default statisticSlice.reducer;
