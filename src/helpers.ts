import { DATE_AFTER, MIN_DATE } from "./const/const";
import { CountriesType } from "./const/countries";
import { BREAKPOINTS } from "./hooks";
import { CountryKey, NextMatch } from "./store/next-matches/next-matches.slice";

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

export const validateDate = (from: string, to: string) => {
  const isValid = (value: string) =>
    new Date(value) >= new Date(MIN_DATE) &&
    new Date(value) <= new Date(DATE_AFTER);
  return isValid(from) && isValid(to);
};

export const getFlag = (code: CountryKey, countries: CountriesType) =>
  code in countries ? countries[code].code2 : "eu";

export const getName = (
  code: CountryKey,
  countries: CountriesType,
  BP: number,
) =>
  code in countries
    ? BP === BREAKPOINTS.xl
      ? countries[code].name
      : countries[code].code3
    : code;

export const isScoreChanged = (nm: NextMatch[]) => {
  let isChanged = false;

  nm.forEach(({ TEAM1, TEAM2, SAVEDSCORE: [score1, score2, win], WINNER }) => {
    if (TEAM1.SCORE !== score1) isChanged = true;
    if (TEAM2.SCORE !== score2) isChanged = true;
    if (WINNER !== win) isChanged = true;
  });
  return isChanged;
};

export const isScoreEmpty = (nm: NextMatch[]) => {
  let isEmpty = true;

  nm.forEach(({ TEAM1, TEAM2, WINNER }) => {
    if (TEAM1.SCORE !== "") isEmpty = false;
    if (TEAM2.SCORE !== "") isEmpty = false;
    if (WINNER !== 0) isEmpty = false;
  });
  return isEmpty;
};
