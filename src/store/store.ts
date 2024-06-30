import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/app.slice";
import statisticSlice from "./statistic/statistic.slice";
import nextMatchesSlice from "./next-matches/next-matches.slice";
import matchdaysSlice from "./matchdays/matchdays.slice";
import userSlice from "./user/user.slice";
import { apiSlice } from "./api";

const store = configureStore({
  reducer: {
    appSlice,
    nextMatchesSlice,
    statisticSlice,
    matchdaysSlice,
    userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
