import { createSlice } from "@reduxjs/toolkit";
import { Team } from "../next-matches/next-matches.slice";

export type UserBetInfo = {
  name: string;
  score: [number, number] | [];
  winner: 0 | 1 | 2;
  points: number | null;
};

export type OldMatchInfo = {
  id: number;
  extra: boolean;
  winner: 0 | 1 | 2;
  info: string;
  time: number;
  team1: Team;
  team2: Team;
  usersBets: UserBetInfo[];
};

const mockedMatches: OldMatchInfo[] = [
  {
    id: 1,
    extra: true,
    winner: 1,
    info: "1/4 Final",
    time: new Date("04/03/2024").valueOf(),
    team1: {
      code: "CZE",
      score: 1,
    },
    team2: {
      code: "SCO",
      score: 0,
    },
    usersBets: [
      {
        name: "Val",
        score: [1, 0],
        winner: 1,
        points: 4,
      },
      {
        name: "kam",
        score: [2, 0],
        winner: 1,
        points: 2,
      },
      {
        name: "valera",
        score: [1, 1],
        winner: 2,
        points: 0,
      },
      {
        name: "Man with real long username username username username",
        score: [1, 1],
        winner: 2,
        points: 0,
      },
    ],
  },
  {
    id: 2,
    extra: false,
    winner: 0,
    info: "Group B",
    time: 1718398800000,
    team1: {
      code: "SUI",
      score: "",
    },
    team2: {
      code: "NED",
      score: "",
    },
    usersBets: [
      {
        name: "Val",
        score: [],
        winner: 0,
        points: null,
      },
      {
        name: "kam",
        score: [],
        winner: 0,
        points: null,
      },
      {
        name: "valera",
        score: [],
        winner: 0,
        points: null,
      },
      {
        name: "Man with real long username username username username",
        score: [],
        winner: 0,
        points: null,
      },
    ],
  },
];

type InitialState = {
  from: number;
  to: number;
  matches: OldMatchInfo[];
};

const initialState: InitialState = {
  from: Date.now().valueOf(),
  to: Date.now().valueOf(),
  matches: mockedMatches,
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
