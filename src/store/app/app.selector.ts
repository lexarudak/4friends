import type { RootState } from "../store";

export const isMenuOpenSelector = (state: RootState): boolean =>
  state.appSlice.isMenuOpen;

export const nextMatchSelector = (state: RootState): number =>
  state.appSlice.nextMatch;
