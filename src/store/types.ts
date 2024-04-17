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

export type ReqTeam = {
  code: string;
  score: number | "";
};

export type Match = {
  matchid: number;
  userid: number;
  team1: ReqTeam;
  team2: ReqTeam;
  winner: string;
};

export type NMRequest = {
  data: Match[];
  userid: number;
};
