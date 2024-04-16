import { Team } from "./next-matches/next-matches.slice";

export type GetNextMatchesData = {
  [key: number]: {
    TEAM1: Team;
    TEAM2: Team;
    USERID: number;
    MATCHID: number;
    INFO: string;
    TIME: string;
    EXTRA: boolean;
    WINNER: string;
  };
};

export interface SuccessResponse<T> {
  SUCCESS: true;
  DATA: T;
  MESSAGE: string;
}

export interface ErrorResponse {
  SUCCESS: false;
  ERRORFIELD: string;
  MESSAGE: string;
}

export type NMResponse = SuccessResponse<GetNextMatchesData> | ErrorResponse;
