import { createSlice } from "@reduxjs/toolkit";
import countries from "../../const/countries";
import { apiSlice } from "../api";

export type Team = {
  CODE: keyof typeof countries; // код из 3 букв
  SCORE: number | ""; // если счет не поставлен, то пустую строку. если поставлен - число
};

export type NextMatch = {
  EXTRA: boolean; // есть ли в матче дополнительное время
  WINNER: 0 | 1 | 2; // 0 - если победитель не выбран или если его нет (ничья в матче без доп времени)
  INFO: string; // название группы или стадии, типа Group B
  TIME: number; // дата и время начала матча. на самом деле шли в том формате, который тебе удобен. я у себя поменяю
  SAVEDSCORE: (number | "")[]; // счет если поставлен, массивом [1, 0]. если ставки нет, то пустой массив []
  TEAM1: Team; // тип описан выше (4 строчка)
  TEAM2: Team; // тип описан выше (4 строчка)
  USERID: number;
  MATCHID: number;
};

const initialState = {
  nextMatches: [] as NextMatch[],
  isFetching: false,
  isSetting: false,
};

const nextMatchesSlice = createSlice({
  name: "next-matches",
  initialState,
  reducers: {
    setNMIsFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
    setNMIsSetting: (state, { payload }) => {
      state.isSetting = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getNextMatches.matchFulfilled,
      (state, { payload }) => {
        if (payload.SUCCESS) {
          state.nextMatches = payload.DATA;
        }
      },
    );
    builder.addMatcher(
      apiSlice.endpoints.setNextMatches.matchFulfilled,
      (state, { payload }) => {
        if (payload.SUCCESS) {
          state.nextMatches = payload.DATA;
        }
      },
    );
  },
});

export const { setNMIsFetching, setNMIsSetting } = nextMatchesSlice.actions;

export default nextMatchesSlice.reducer;
