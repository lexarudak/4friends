import { RootState } from "../store";
import { User } from "./statistic.slice";

export const tableSelector = (state: RootState): User[] =>
  state.statisticSlice.table;
