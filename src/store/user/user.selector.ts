import type { RootState } from "../store";

export const activeRoomSelector = (state: RootState): string =>
  state.userSlice.activeRoom;

export const roomsSelector = (state: RootState): string[] =>
  state.userSlice.rooms;
