import type { RootState } from "../store";
import { Rooms } from "./user.slice";

export const userSelector = (state: RootState) => state.userSlice;

export const activeRoomSelector = (state: RootState): string =>
  state.userSlice.activeRoom;

export const roomsSelector = (state: RootState): Rooms => state.userSlice.rooms;

export const userIdSelector = (state: RootState): number =>
  state.userSlice.userId;

export const userNameSelector = (state: RootState): string =>
  state.userSlice.username;
