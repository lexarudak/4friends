import { PlayOffMatch } from "./play-off/play-off";

type Resp = {
  eight: PlayOffMatch[][];
  four: PlayOffMatch[][];
  two: PlayOffMatch[][];
  final: PlayOffMatch[][];
};

export const mockResponse: Resp = {
  eight: [
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
  ],
  four: [
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
  ],
  two: [
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
  ],
  final: [
    [
      { team: "EUR", score: "-" },
      { team: "EUR", score: "-" },
    ],
  ],
};

type TeamDetails = {
  id: number;
  name: string;
  logo: string;
};

type GoalDetails = {
  for: number | null;
  against: number | null;
};

type HomeAwayGoals = {
  played: number | null;
  win: number | null;
  draw: number | null;
  lose: number | null;
  goals: GoalDetails;
};

export type StandingsDetails = {
  rank: number;
  team: TeamDetails;
  points: number;
  goalsDiff: number;
  group: string;
  form: string | null;
  status: string;
  description: string | null;
  all: HomeAwayGoals;
  home: HomeAwayGoals;
  away: HomeAwayGoals;
  update: string;
};

export type Standings = StandingsDetails[][];

type LeagueDetails = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: null | string;
  season: number;
  standings: Standings;
};

type ResponseData = {
  league: LeagueDetails;
}[];

type Paging = {
  current: number;
  total: number;
};

export type StandingsData = {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: string[];
  results: number;
  paging: Paging;
  response: ResponseData;
};
