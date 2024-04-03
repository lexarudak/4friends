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
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // месяцы начинаются с 0
  const year = date.getFullYear().toString().slice(2); // получаем последние две цифры года
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
