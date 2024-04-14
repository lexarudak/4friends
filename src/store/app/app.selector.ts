import type { RootState } from "../store";

export const appSelector = (state: RootState) => state.appSlice;

export const isMenuOpenSelector = (state: RootState): boolean =>
  state.appSlice.isMenuOpen;

export const nextMatchSelector = (state: RootState): number =>
  state.appSlice.nextMatch;

export const isModalOpenSelector = (state: RootState): boolean =>
  state.appSlice.isModalOpen;

export const isRoomSelectorOpenSelector = (state: RootState): boolean =>
  state.appSlice.isRoomSelectorOpen;

export const isServerErrorSelector = (state: RootState) =>
  state.appSlice.serverError;
