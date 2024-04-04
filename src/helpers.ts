import { MAX_DATE, MIN_DATE } from "./const/const";

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
