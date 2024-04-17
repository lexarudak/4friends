import type { RootState } from "../store";
import { Rooms } from "./user.slice";

export const userSelector = (state: RootState) => state.userSlice;

export const activeRoomIdSelector = (state: RootState): string =>
  state.userSlice.ACTIVEROOMID;

export const roomsSelector = (state: RootState): Rooms => state.userSlice.ROOMS;

export const userIdSelector = (state: RootState): number =>
  state.userSlice.USERID;

export const userNameSelector = (state: RootState): string =>
  state.userSlice.USERNAME;
