import { OldMatchInfo } from "./matchdays/matchdays.slice";
import { NextMatch, Team } from "./next-matches/next-matches.slice";
import {
  MatchdaysResponse,
  NMRequest,
  NMResponse,
  NMTimeResponse,
} from "./types";

export const getNumberTime = (dateString: string) => {
  return new Date(dateString).valueOf();
};

const getNumWinner = (WINNER: string, TEAM1: Team, TEAM2: Team) =>
  ((WINNER === TEAM1.CODE && 1) || (WINNER === TEAM2.CODE && 2) || 0) as
    | 0
    | 1
    | 2;

export const transformNM = (response: NMResponse) => {
  if (!response.SUCCESS) return response;

  return {
    ...response,
    DATA: Object.values(response.DATA).map(
      ({ WINNER: StrWin, TEAM1, TEAM2, TIME, ...rest }) => {
        const WINNER = getNumWinner(StrWin, TEAM1, TEAM2);
        return {
          ...rest,
          WINNER,
          TEAM1,
          TEAM2,
          TIME: getNumberTime(TIME),
          SAVEDSCORE: [TEAM1.SCORE, TEAM2.SCORE, WINNER],
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
    DATA: NMDATA.map(({ MATCHID, USERID, TEAM1, TEAM2, WINNER, EXTRA }) => ({
      MATCHID,
      USERID,
      TEAM1,
      TEAM2,
      WINNER:
        !EXTRA && TEAM1.SCORE === TEAM2.SCORE
          ? ""
          : (WINNER === 1 && TEAM1.CODE) || (WINNER === 2 && TEAM2.CODE) || "",
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

export const transformMatchdays = (response: MatchdaysResponse) => {
  if (!response.SUCCESS) return response;

  const DATA: OldMatchInfo[] = Object.entries(response.DATA).map(
    ([ID, data]) => {
      const { EXTRA, WINNER, TEAM1, TEAM2, INFO, TIME, STATUS } = data;
      return {
        ID,
        EXTRA,
        TEAM1,
        TEAM2,
        WINNER: getNumWinner(WINNER, TEAM1, TEAM2),
        INFO,
        TIME: getNumberTime(TIME),
        USERBETS: data["USER BETS"].map(
          ({ TEAM1, TEAM2, POINTS, USERNAME, WINNER }) => ({
            USERNAME,
            WINNER: getNumWinner(WINNER, TEAM1, TEAM2),
            SCORE: [TEAM1.SCORE, TEAM2.SCORE],
            POINTS,
          }),
        ),
        STATUS,
      };
    },
  );
  return {
    ...response,
    DATA,
  };
};

export const getInitLocale = () => {
  let lang = localStorage.getItem("lang");
  if (!lang) {
    const browserLocale = navigator.language;
    switch (browserLocale) {
      case "ru-RU":
        lang = "ru";
        localStorage.setItem("lang", "ru");
        break;

      default:
        lang = "en";
        localStorage.setItem("lang", "en");
        break;
    }
  }
  return lang;
};
