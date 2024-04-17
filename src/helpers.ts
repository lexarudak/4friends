import { MAX_DATE, MIN_DATE } from "./const/const";
import countries from "./const/countries";
import { BREAKPOINTS } from "./hooks";
import { NextMatch } from "./store/next-matches/next-matches.slice";

export const getTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  return time;
};

export const getDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(2);
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const validateDate = (from: number, to: number) => {
  const isValid = (value: number) =>
    new Date(value) >= new Date(MIN_DATE) &&
    new Date(value) <= new Date(MAX_DATE);
  return isValid(from) && isValid(to);
};

export const getFlag = (code: keyof typeof countries) =>
  code in countries ? countries[code].code2 : "---";

export const getName = (code: keyof typeof countries, BP: number) =>
  code in countries
    ? BP === BREAKPOINTS.xl
      ? countries[code].name
      : code
    : code;

export const isScoreSaved = (nm: NextMatch[]) => {
  let isSaved = true;

  nm.forEach(({ TEAM1, TEAM2, SAVEDSCORE: [score1, score2] }) => {
    if (TEAM1.SCORE !== score1) isSaved = false;
    if (TEAM2.SCORE !== score2) isSaved = false;
    console.log(TEAM1.SCORE === score1);
    console.log(TEAM2.SCORE === score2);
  });
  console.log({ isSaved });
  return isSaved;
};
