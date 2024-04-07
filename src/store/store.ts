import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/app.slice";
import statisticSlice from "./statistic/statistic.slice";
import nextMatchesSlice from "./next-matches/next-matches.slice";
import matchdaysSlice from "./matchdays/matchdays.slice";
import userSlice from "./user/user.slice";

const store = configureStore({
  reducer: {
    appSlice,
    nextMatchesSlice,
    statisticSlice,
    matchdaysSlice,
    userSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
