import type { RootState } from "../store";

export const appSelector = (state: RootState) => state.appSlice;

export const isMenuOpenSelector = (state: RootState): boolean =>
  state.appSlice.isMenuOpen;

export const nextMatchSelector = (state: RootState): number =>
  state.appSlice.nextMatch;
export const serverTimeDifSelector = (state: RootState): number =>
  state.appSlice.serverTimeDif;

export const isModalOpenSelector = (state: RootState): boolean =>
  state.appSlice.isModalOpen;

export const isRoomSelectorOpenSelector = (state: RootState): boolean =>
  state.appSlice.isRoomSelectorOpen;

export const isServerErrorSelector = (state: RootState) =>
  state.appSlice.serverError;

export const pageLoadingSelector = (state: RootState) =>
  state.appSlice.isPageLoading;

export const langSelector = (state: RootState) => state.appSlice.lang;
