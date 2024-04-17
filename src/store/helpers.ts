import { NextMatch } from "./next-matches/next-matches.slice";
import { NMRequest, NMResponse } from "./types";

export const transformNM = (response: NMResponse) => {
  if (!response.SUCCESS) return response;

  return {
    ...response,
    DATA: Object.values(response.DATA).map(
      ({ WINNER, TEAM1, TEAM2, TIME, ...rest }) => {
        return {
          ...rest,
          WINNER: ((WINNER === TEAM1.CODE && 1) ||
            (WINNER === TEAM2.CODE && 2) ||
            0) as 0 | 1 | 2,
          TEAM1,
          TEAM2,
          TIME: new Date(TIME).valueOf(),
          SAVEDSCORE:
            TEAM1.SCORE === "" || TEAM2.SCORE === ""
              ? []
              : [TEAM1.SCORE, TEAM2.SCORE],
        };
      },
    ),
  };
};

export const prepareNMData = ({
  nmData,
  username,
  activeroomID,
  userid,
}: {
  nmData: NextMatch[];
  username: string;
  activeroomID: number;
  userid: number;
}): NMRequest => {
  return {
    userid,
    data: nmData.map(({ MATCHID, USERID, TEAM1, TEAM2, WINNER }) => ({
      matchid: MATCHID,
      userid: USERID,
      team1: {
        code: TEAM1.CODE,
        score: TEAM1.SCORE,
      },
      team2: {
        code: TEAM2.CODE,
        score: TEAM2.SCORE,
      },
      winner:
        (WINNER === 1 && TEAM1.CODE) || (WINNER === 2 && TEAM2.CODE) || "",
      username,
      activeroomID,
    })),
  };
};
