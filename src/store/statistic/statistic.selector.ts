import { RootState } from "../store";
import { UserPoints } from "./statistic.slice";

export const tableSelector = (state: RootState): UserPoints[] =>
  state.statisticSlice.table;
