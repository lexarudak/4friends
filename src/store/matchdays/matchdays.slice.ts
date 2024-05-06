import { createSlice } from "@reduxjs/toolkit";
import { Team } from "../next-matches/next-matches.slice";
import { apiSlice } from "../api";
import dayjs from "dayjs";
import { MIN_DATE } from "../../const/const";

export type UserBetInfo = {
  USERNAME: string;
  SCORE: (number | string)[];
  WINNER: 0 | 1 | 2;
  POINTS: number;
};

export type OldMatchInfo = {
  ID: string;
  EXTRA: boolean;
  WINNER: 0 | 1 | 2;
  INFO: string;
  TIME: number;
  TEAM1: Team;
  TEAM2: Team;
  USERBETS: UserBetInfo[];
};

// const mockedMatches: OldMatchInfo[] = [
//   {
//     id: 1,
//     extra: true,
//     winner: 1,
//     info: "1/4 Final",
//     time: new Date("04/03/2024").valueOf(),
//     team1: {
//       CODE: "CZE",
//       SCORE: 1,
//     },
//     team2: {
//       CODE: "SCO",
//       SCORE: 0,
//     },
//     usersBets: [
//       {
//         name: "Val",
//         score: [1, 0],
//         winner: 1,
//         points: 4,
//       },
//       {
//         name: "kam",
//         score: [2, 0],
//         winner: 1,
//         points: 2,
//       },
//       {
//         name: "valera",
//         score: [1, 1],
//         winner: 2,
//         points: 0,
//       },
//       {
//         name: "Man with real long username username username username",
//         score: [1, 1],
//         winner: 2,
//         points: 0,
//       },
//     ],
//   },
//   {
//     id: 2,
//     extra: false,
//     winner: 0,
//     info: "Group B",
//     time: 1718398800000,
//     team1: {
//       CODE: "SUI",
//       SCORE: "",
//     },
//     team2: {
//       CODE: "NED",
//       SCORE: "",
//     },
//     usersBets: [
//       {
//         name: "Val",
//         score: [],
//         winner: 0,
//         points: null,
//       },
//       {
//         name: "kam",
//         score: [],
//         winner: 0,
//         points: null,
//       },
//       {
//         name: "valera",
//         score: [],
//         winner: 0,
//         points: null,
//       },
//       {
//         name: "Man with real long username username username username",
//         score: [],
//         winner: 0,
//         points: null,
//       },
//     ],
//   },
// ];

type InitialState = {
  from: string;
  to: string;
  matches: OldMatchInfo[];
  country: string;
};

const initialState: InitialState = {
  from: dayjs(MIN_DATE).format("YYYY-MM-DD HH:mm:ss"),
  to: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
  matches: [],
  country: "",
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
    setCountry(state, action) {
      state.country = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getMatchdays.matchFulfilled,
      (state, { payload }) => {
        if (payload.SUCCESS) {
          state.matches = payload.DATA;
        }
      },
    );
    builder.addMatcher(
      apiSlice.endpoints.getMatchdays.matchPending,
      (state) => {
        state.matches = [];
      },
    );
  },
});

export const { setFrom, setTo, setCountry } = matchdaysSlice.actions;

export default matchdaysSlice.reducer;
