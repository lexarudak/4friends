import { createSlice } from "@reduxjs/toolkit";
import countries from "../../const/countries";

export type Team = {
  code: keyof typeof countries; // код из 3 букв
  score: number | ""; // если счет не поставлен, то пустую строку. если поставлен - число
};

export type NextMatch = {
  id: number;
  extra: boolean; // есть ли в матче дополнительное время
  winner: 0 | 1 | 2; // 0 - если победитель не выбран или если его нет (ничья в матче без доп времени)
  info: string; // название группы или стадии, типа Group B
  time: number; // дата и время начала матча. на самом деле шли в том формате, который тебе удобен. я у себя поменяю
  savedScore: [number, number] | []; // счет если поставлен, массивом [1, 0]. если ставки нет, то пустой массив []
  team1: Team; // тип описан выше (4 строчка)
  team2: Team; // тип описан выше (4 строчка)
};

const mockedNextMatches: NextMatch[] = [
  {
    id: 1,
    extra: true,
    winner: 1,
    info: "Group A",
    time: 1718388000000,
    savedScore: [1, 0],
    team1: {
      code: "CZE",
      score: 1,
    },
    team2: {
      code: "SCO",
      score: 0,
    },
  },
  {
    id: 2,
    extra: true,
    winner: 0,
    info: "Group B",
    time: 1718398800000,
    savedScore: [],
    team1: {
      code: "SUI",
      score: "",
    },
    team2: {
      code: "NED",
      score: "",
    },
  },
  {
    id: 3,
    extra: true,
    winner: 0,
    info: "Group C",
    time: 1718409600000,
    savedScore: [],
    team1: {
      code: "HUN",
      score: "",
    },
    team2: {
      code: "GER",
      score: "",
    },
  },
];

const initialState = {
  nextMatches: mockedNextMatches,
};

const nextMatchesSlice = createSlice({
  name: "next-matches",
  initialState,
  reducers: {},
});

// export const {} = nextMatchesSlice.actions;

export default nextMatchesSlice.reducer;
