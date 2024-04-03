import { RootState } from "../store";
import { NextMatch } from "./next-matches.slice";

export const nextMatchesSelector = (state: RootState): NextMatch[] =>
  state.nextMatchesSlice.nextMatches;
