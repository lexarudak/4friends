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

// const mockedExact: UserPoints[] = [
//   { USERNAME: "Val", POINTS: 10 },
//   { USERNAME: "kam", POINTS: 5 },
//   { USERNAME: "valera", POINTS: 2 },
//   {
//     USERNAME: "Man with real long USERNAME USERNAME USERNAME USERNAME",
//     POINTS: 0,
//   },
// ];

// const mockedWins: UserPoints[] = [
//   { USERNAME: "Val", POINTS: 10 },
//   { USERNAME: "kam", POINTS: 15 },
//   { USERNAME: "valera", POINTS: 5 },
//   {
//     USERNAME: "Man with real long USERNAME USERNAME USERNAME USERNAME",
//     POINTS: 0,
//   },
// ];

export const mockedAverage: UserPoints[] = [
  { USERNAME: "Val", POINTS: 2 },
  { USERNAME: "kam", POINTS: 2 },
  { USERNAME: "valera", POINTS: 1.2 },
  {
    USERNAME: "Man with real long USERNAME USERNAME USERNAME USERNAME",
    POINTS: 5.43,
  },
  { USERNAME: "Val", POINTS: 10 },
  { USERNAME: "kam", POINTS: 10 },
  { USERNAME: "valera", POINTS: 5 },
  {
    USERNAME: "Man with real long USERNAME USERNAME USERNAME USERNAME",
    POINTS: 0,
  },
];

const initialState = {
  table: [],
  exact: [],
  wins: [],
  average: [],
  globalTop: [],
};

export type StatisticState = typeof initialState;

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
    setTable(state, action) {
      state.table = action.payload;
    },
    setExact(state, action) {
      state.exact = action.payload;
    },
    setWins(state, action) {
      state.wins = action.payload;
    },
    setAverage(state, action) {
      state.average = action.payload;
    },
    setGlobalTop(state, action) {
      state.globalTop = action.payload;
    },
  },
});

export const { setTable, setGlobalTop, setExact, setWins, setAverage } =
  statisticSlice.actions;

export default statisticSlice.reducer;
