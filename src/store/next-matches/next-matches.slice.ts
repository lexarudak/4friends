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
  SAVEDSCORE: number[]; // счет если поставлен, массивом [1, 0]. если ставки нет, то пустой массив []
  TEAM1: Team; // тип описан выше (4 строчка)
  TEAM2: Team; // тип описан выше (4 строчка)
  USERID: number;
  MATCHID: number;
};

// const mockedNextMatches: NextMatch[] = [
//   {
//     EXTRA: true,
//     WINNER: 1,
//     INFO: "Group A",
//     TIME: 1718388000000,
//     SAVEDSCORE: [1, 0],
//     TEAM1: {
//       CODE: "CZE",
//       SCORE: 1,
//     },
//     TEAM2: {
//       CODE: "SCO",
//       SCORE: 0,
//     },
//     MATCHID: 1,
//     USERID: 2,
//   },
//   {
//     EXTRA: true,
//     WINNER: 0,
//     INFO: "Group B",
//     TIME: 1718398800000,
//     SAVEDSCORE: [],
//     TEAM1: {
//       CODE: "SUI",
//       SCORE: "",
//     },
//     TEAM2: {
//       CODE: "NED",
//       SCORE: "",
//     },
//     MATCHID: 2,
//     USERID: 2,
//   },
//   {
//     EXTRA: true,
//     WINNER: 0,
//     INFO: "Group C",
//     TIME: 1718409600000,
//     SAVEDSCORE: [],
//     TEAM1: {
//       CODE: "HUN",
//       SCORE: "",
//     },
//     TEAM2: {
//       CODE: "GER",
//       SCORE: "",
//     },
//     MATCHID: 3,
//     USERID: 2,
//   },
// ];

const initialState = {
  nextMatches: [] as NextMatch[],
  isFetching: false,
};

const nextMatchesSlice = createSlice({
  name: "next-matches",
  initialState,
  reducers: {
    setNMIsFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getNextMatches.matchFulfilled,
      (state, { payload }) => {
        if (payload.SUCCESS) {
          state.nextMatches = payload.DATA;
          console.log("NM success", payload);
        } else {
          console.log("NM other fail", payload);
        }
      },
    );
  },
});

export const { setNMIsFetching } = nextMatchesSlice.actions;

export default nextMatchesSlice.reducer;
