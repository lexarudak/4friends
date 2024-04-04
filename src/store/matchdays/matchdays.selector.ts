import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const matchdaysDateSelector = createSelector(
  (state: RootState) => state.matchdaysSlice,
  ({ from, to }) => ({ from, to }),
);
