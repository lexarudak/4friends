import { createSlice } from "@reduxjs/toolkit";
import countries from "../../const/countries";

export type Team = {
  code: keyof typeof countries;
  score: number | "";
};

export type NextMatch = {
  id: number;
  extra: boolean;
  winner: number;
  info: string;
  time: number;
  savedScore: [number, number] | [];
  team1: Team;
  team2: Team;
};

const mockedNextMatches: NextMatch[] = [
  {
    id: 1,
    extra: true,
    winner: 0,
    info: "Group A",
    time: 1718388000000,
    savedScore: [1, 0],
    team1: {
      code: "CZE",
      score: 1,
    },
    team2: {
      code: "SCO",
      score: 0,
    },
  },
  {
    id: 2,
    extra: true,
    winner: 0,
    info: "Group B",
    time: 1718398800000,
    savedScore: [],
    team1: {
      code: "SUI",
      score: "",
    },
    team2: {
      code: "NED",
      score: "",
    },
  },
  {
    id: 3,
    extra: true,
    winner: 0,
    info: "Group C",
    time: 1718409600000,
    savedScore: [],
    team1: {
      code: "HUN",
      score: "",
    },
    team2: {
      code: "GER",
      score: "",
    },
  },
];

const initialState = {
  nextMatches: mockedNextMatches,
};

const nextMatchesSlice = createSlice({
  name: "next-matches",
  initialState,
  reducers: {},
});

// export const {} = nextMatchesSlice.actions;

export default nextMatchesSlice.reducer;
