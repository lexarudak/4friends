import { createSlice } from "@reduxjs/toolkit";

const mockedNextMatches = [
  { id: 1, team1: "GER", team2: "ITA" },
  { id: 2, team1: "CAN", team2: "DEN" },
  { id: 3, team1: "BLR", team2: "SPA" },
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
