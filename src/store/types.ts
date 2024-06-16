import { MatchStatus } from "./matchdays/matchdays.slice";
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

export type Match = {
  MATCHID: number;
  USERID: number;
  TEAM1: Team;
  TEAM2: Team;
  WINNER: string;
};

export type NMRequest = {
  DATA: Match[];
  USERID: number;
};

export type NMTime = {
  match_id: number;
  datetime: string;
  servertime: string;
};

export type MatchdaysData = {
  [key: string]: {
    TEAM1: Team;
    TEAM2: Team;
    INFO: string;
    TIME: string;
    EXTRA: boolean;
    WINNER: string;
    STATUS: MatchStatus;
    "USER BETS": {
      TEAM1: Team;
      TEAM2: Team;
      WINNER: string;
      POINTS: number;
      USERNAME: string;
    }[];
  };
};

export type NMTimeData = NMTime[];

export type NMTimeResponse = SuccessResponse<NMTimeData> | ErrorResponse;
export type MatchdaysResponse = SuccessResponse<MatchdaysData> | ErrorResponse;

export type StandingsResponse = SuccessResponse<string> | ErrorResponse;
