import { RootState } from "../store";
import { StatisticState, UserPoints } from "./statistic.slice";

export const tableSelector = (state: RootState): UserPoints[] =>
  state.statisticSlice.table;

export const statisticSelector = (state: RootState): StatisticState =>
  state.statisticSlice;
