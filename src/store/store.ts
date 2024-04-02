import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/app.slice";
import statisticSlice from "./statistic/statistic.slice";

const store = configureStore({
  reducer: {
    appSlice,
    statisticSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
