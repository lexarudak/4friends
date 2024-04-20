import { NextMatch } from "./next-matches/next-matches.slice";
import { NMRequest, NMResponse, NMTimeResponse } from "./types";

export const getNumberTime = (dateString: string) => {
  return new Date(dateString).valueOf();
};

export const transformNM = (response: NMResponse) => {
  if (!response.SUCCESS) return response;

  return {
    ...response,
    DATA: Object.values(response.DATA).map(
      ({ WINNER, TEAM1, TEAM2, TIME, ...rest }) => {
        const numWinner = ((WINNER === TEAM1.CODE && 1) ||
          (WINNER === TEAM2.CODE && 2) ||
          0) as 0 | 1 | 2;
        return {
          ...rest,
          WINNER: numWinner,
          TEAM1,
          TEAM2,
          TIME: getNumberTime(TIME),
          SAVEDSCORE: [TEAM1.SCORE, TEAM2.SCORE, numWinner],
        };
      },
    ),
  };
};

export const prepareNMData = ({
  NMDATA,
  USERNAME,
  ACTIVEROOMID,
  USERID,
}: {
  NMDATA: NextMatch[];
  USERNAME: string;
  ACTIVEROOMID: number;
  USERID: number;
}): NMRequest => {
  return {
    USERID,
    DATA: NMDATA.map(({ MATCHID, USERID, TEAM1, TEAM2, WINNER }) => ({
      MATCHID,
      USERID,
      TEAM1,
      TEAM2,
      WINNER:
        (WINNER === 1 && TEAM1.CODE) || (WINNER === 2 && TEAM2.CODE) || "",
      USERNAME,
      ACTIVEROOMID,
    })),
  };
};

const getNextTime = (arr: number[], serverTime: number) => {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] > serverTime) return arr[i];
    i++;
  }
  return 0;
};

export const transformNMTime = (response: NMTimeResponse) => {
  if (!response.SUCCESS) return response;
  const dates = response.DATA.map(({ datetime }) => getNumberTime(datetime));
  const serverTime = getNumberTime(response.DATA[0].servertime);
  const serverTimeDif = new Date().valueOf() - serverTime;
  const sortedDates = [...dates].sort((a, b) => a - b);
  const DATA = {
    nmTime: getNextTime(sortedDates, serverTime),
    serverTimeDif,
  };

  return {
    ...response,
    DATA,
  };
};
