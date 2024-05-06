import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const matchdaysDateSelector = createSelector(
  (state: RootState) => state.matchdaysSlice,
  ({ from, to }) => ({ from, to }),
);

export const matchdaysMatchesSelector = (state: RootState) =>
  state.matchdaysSlice.matches;

export const countrySelector = (state: RootState) =>
  state.matchdaysSlice.country;
