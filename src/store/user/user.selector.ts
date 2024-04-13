import type { RootState } from "../store";
import { Rooms } from "./user.slice";

export const activeRoomSelector = (state: RootState): string =>
  state.userSlice.activeRoom;

export const roomsSelector = (state: RootState): Rooms => state.userSlice.rooms;

export const userIdSelector = (state: RootState): number =>
  state.userSlice.userId;
