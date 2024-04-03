import { createSlice } from "@reduxjs/toolkit";

const mockedNextMatches = [
  {
    id: 1,
    extra: true,
    penalty: 0,
    team1: {
      code: "al",
      score: null,
      extra: null,
    },
    team2: {
      code: "ad",
      score: null,
      extra: null,
    },
  },
  {
    id: 2,
    extra: true,
    penalty: 0,
    team1: {
      code: "be",
      score: null,
      extra: null,
    },
    team2: {
      code: "ba",
      score: null,
      extra: null,
    },
  },
  {
    id: 3,
    extra: true,
    penalty: 0,
    team1: {
      code: "cz",
      score: null,
      extra: null,
    },
    team2: {
      code: "kz",
      score: null,
      extra: null,
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
