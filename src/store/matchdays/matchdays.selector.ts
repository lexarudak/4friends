import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialState } from "./matchdays.slice";

export const matchdaysDateSelector = createSelector(
  (state: RootState) => state.matchdaysSlice,
  ({ from, to }) => ({ from, to }),
);

export const matchdaysMatchesSelector = (state: RootState) =>
  state.matchdaysSlice.matches;

export const countrySelector = (state: RootState) =>
  state.matchdaysSlice.country;

export const initMatchdaysSelector = (state: RootState) =>
  state.matchdaysSlice.from === initialState.from &&
  state.matchdaysSlice.to === initialState.to &&
  state.matchdaysSlice.country === initialState.country;
