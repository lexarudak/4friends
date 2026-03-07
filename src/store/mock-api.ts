import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { STATUS_TYPE } from "./matchdays/matchdays.slice";
import type { CountryKey } from "./next-matches/next-matches.slice";
import type {
  MatchdaysData,
  NMTimeData,
  GetNextMatchesData,
  NMRequest,
} from "./types";
import { GROUPS } from "../components/euro-tabs/mock";

const ok = <T>(DATA: T, MESSAGE = "") => ({
  SUCCESS: true as const,
  DATA,
  MESSAGE,
});

const fail = (MESSAGE = "Mock error", ERRORFIELD = "") => ({
  SUCCESS: false as const,
  ERRORFIELD,
  MESSAGE,
});

const NM_LS_KEY = "mock_nm_bets";

type SavedBet = {
  TEAM1_SCORE: number | "";
  TEAM2_SCORE: number | "";
  WINNER: string;
};

const readBets = (): Record<string, SavedBet> => {
  try {
    return JSON.parse(localStorage.getItem(NM_LS_KEY) || "{}");
  } catch {
    return {};
  }
};

const writeBets = (bets: Record<string, SavedBet>) => {
  localStorage.setItem(NM_LS_KEY, JSON.stringify(bets));
};

// ── Текущий этап турнира ──
// "group" | "1/8" | "1/4" | "1/2" | "final"
const CURRENT_STAGE = "group" as const;

const STAGE_INFO: Record<string, [string, string, boolean]> = {
  //              [INFO матча 1,  INFO матча 2,  EXTRA]
  group: ["Group A", "Group B", false],
  "1/8": ["1/8 Final", "1/8 Final", true],
  "1/4": ["1/4 Final", "1/4 Final", true],
  "1/2": ["1/2 Final", "1/2 Final", true],
  final: ["Final", "3rd Place", true],
};

const [INFO_1, INFO_2, HAS_EXTRA] = STAGE_INFO[CURRENT_STAGE];

const DEFAULT_MATCHES: GetNextMatchesData = {
  1: {
    TEAM1: { CODE: "GER", SCORE: "" },
    TEAM2: { CODE: "SCO", SCORE: "" },
    USERID: 1,
    MATCHID: 1,
    INFO: INFO_1,
    TIME: "",
    EXTRA: HAS_EXTRA,
    WINNER: "",
  },
  2: {
    TEAM1: { CODE: "ESP", SCORE: "" },
    TEAM2: { CODE: "ITA", SCORE: "" },
    USERID: 1,
    MATCHID: 2,
    INFO: INFO_2,
    TIME: "",
    EXTRA: HAS_EXTRA,
    WINNER: "",
  },
};

const buildNextMatches = (): GetNextMatchesData => {
  const now = new Date();
  const match1 = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();
  const match2 = new Date(now.getTime() + 26 * 60 * 60 * 1000).toISOString();
  const times: Record<number, string> = { 1: match1, 2: match2 };

  const saved = readBets();
  const result: GetNextMatchesData = {};

  for (const [key, match] of Object.entries(DEFAULT_MATCHES)) {
    const bet = saved[key];
    result[Number(key)] = {
      ...match,
      TIME: times[Number(key)] || match.TIME,
      TEAM1: { ...match.TEAM1, SCORE: bet?.TEAM1_SCORE ?? match.TEAM1.SCORE },
      TEAM2: { ...match.TEAM2, SCORE: bet?.TEAM2_SCORE ?? match.TEAM2.SCORE },
      WINNER: bet?.WINNER ?? match.WINNER,
    };
  }

  return result;
};

const saveNextMatches = (body: string): GetNextMatchesData => {
  const request: NMRequest = JSON.parse(body);
  const saved = readBets();

  for (const match of request.DATA) {
    saved[match.MATCHID] = {
      TEAM1_SCORE: match.TEAM1.SCORE,
      TEAM2_SCORE: match.TEAM2.SCORE,
      WINNER: match.WINNER,
    };
  }

  writeBets(saved);
  return buildNextMatches();
};

const buildNMTime = (): NMTimeData => {
  const now = new Date();
  return [
    {
      match_id: 1,
      datetime: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
      servertime: now.toISOString(),
    },
    {
      match_id: 2,
      datetime: new Date(now.getTime() + 26 * 60 * 60 * 1000).toISOString(),
      servertime: now.toISOString(),
    },
  ];
};

const matchday = (daysOffset: number, hours: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  d.setHours(hours, 0, 0, 0);
  return d.toISOString();
};

const finished = (short = "FT"): MatchdaysData[string]["STATUS"] => ({
  LONG: "Finished",
  SHORT: short,
  TYPE: STATUS_TYPE.finished,
});

const scheduled: MatchdaysData[string]["STATUS"] = {
  LONG: "Scheduled",
  SHORT: "NS",
  TYPE: STATUS_TYPE.notStarted,
};

const inPlay = (half: "1H" | "2H"): MatchdaysData[string]["STATUS"] => ({
  LONG: "In Play",
  SHORT: half,
  TYPE: STATUS_TYPE.inProgress,
});

const mockBets = (
  t1Code: CountryKey,
  t2Code: CountryKey,
): MatchdaysData[string]["USER BETS"] => [
  {
    TEAM1: { CODE: t1Code, SCORE: 2 },
    TEAM2: { CODE: t2Code, SCORE: 1 },
    WINNER: t1Code,
    POINTS: 2,
    USERNAME: "Val",
  },
  {
    TEAM1: { CODE: t1Code, SCORE: 1 },
    TEAM2: { CODE: t2Code, SCORE: 1 },
    WINNER: "",
    POINTS: 3,
    USERNAME: "kam",
  },
  {
    TEAM1: { CODE: t1Code, SCORE: 0 },
    TEAM2: { CODE: t2Code, SCORE: 2 },
    WINNER: t2Code,
    POINTS: 0,
    USERNAME: "valera",
  },
];

const periods = (s: MatchdaysData[string]["STATUS"]) => {
  const now = new Date();
  return {
    PERIODS_FIRST: s.TYPE === STATUS_TYPE.inProgress ? 0 : 45 * 60,
    PERIODS_SECOND: s.SHORT === "2H" ? 0 : 45 * 60,
    SERVER_TIME: now.toISOString(),
  };
};

const buildMatchdays = (): MatchdaysData => {
  const now = new Date();

  const s = {
    // ── сегодня: 1 live + 1 запланирован ──
    "101": {
      TEAM1: { CODE: "FRA" as const, SCORE: 1 },
      TEAM2: { CODE: "NED" as const, SCORE: 1 },
      INFO: "Group D",
      TIME: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
      EXTRA: false,
      WINNER: "",
      STATUS: inPlay("1H"),
      "USER BETS": mockBets("FRA", "NED"),
      PERIODS: {
        PERIODS_FIRST: 0,
        PERIODS_SECOND: 20000000,
        SERVER_TIME: now.toISOString(),
      },
    },
    "102": {
      TEAM1: { CODE: "ENG" as const, SCORE: 0 },
      TEAM2: { CODE: "DEN" as const, SCORE: 0 },
      INFO: "Group C",
      TIME: matchday(0, 21),
      EXTRA: false,
      WINNER: "",
      STATUS: scheduled,
      "USER BETS": mockBets("ENG", "DEN"),
      PERIODS: periods(scheduled),
    },
    // ── вчера: 2 завершённых ──
    "103": {
      TEAM1: { CODE: "GER" as const, SCORE: 2 },
      TEAM2: { CODE: "SCO" as const, SCORE: 0 },
      INFO: "Group A",
      TIME: matchday(-1, 18),
      EXTRA: false,
      WINNER: "GER",
      STATUS: finished(),
      "USER BETS": mockBets("GER", "SCO"),
      PERIODS: periods(finished()),
    },
    "104": {
      TEAM1: { CODE: "ESP" as const, SCORE: 3 },
      TEAM2: { CODE: "CRO" as const, SCORE: 0 },
      INFO: "Group B",
      TIME: matchday(-1, 21),
      EXTRA: false,
      WINNER: "ESP",
      STATUS: finished(),
      "USER BETS": mockBets("ESP", "CRO"),
      PERIODS: periods(finished()),
    },
    // ── 2 дня назад ──
    "105": {
      TEAM1: { CODE: "ITA" as const, SCORE: 2 },
      TEAM2: { CODE: "ALB" as const, SCORE: 1 },
      INFO: "Group B",
      TIME: matchday(-2, 18),
      EXTRA: false,
      WINNER: "ITA",
      STATUS: finished(),
      "USER BETS": mockBets("ITA", "ALB"),
      PERIODS: periods(finished()),
    },
    "106": {
      TEAM1: { CODE: "HUN" as const, SCORE: 1 },
      TEAM2: { CODE: "SUI" as const, SCORE: 3 },
      INFO: "Group A",
      TIME: matchday(-2, 15),
      EXTRA: false,
      WINNER: "SUI",
      STATUS: finished(),
      "USER BETS": mockBets("HUN", "SUI"),
      PERIODS: periods(finished()),
    },
    // ── 3 дня назад ──
    "107": {
      TEAM1: { CODE: "POL" as const, SCORE: 1 },
      TEAM2: { CODE: "AUT" as const, SCORE: 3 },
      INFO: "Group D",
      TIME: matchday(-3, 18),
      EXTRA: false,
      WINNER: "AUT",
      STATUS: finished(),
      "USER BETS": mockBets("POL", "AUT"),
      PERIODS: periods(finished()),
    },
    "108": {
      TEAM1: { CODE: "SRB" as const, SCORE: 0 },
      TEAM2: { CODE: "ENG" as const, SCORE: 1 },
      INFO: "Group C",
      TIME: matchday(-3, 21),
      EXTRA: false,
      WINNER: "ENG",
      STATUS: finished(),
      "USER BETS": mockBets("SRB", "ENG"),
      PERIODS: periods(finished()),
    },
    // ── 4 дня назад ──
    "109": {
      TEAM1: { CODE: "TUR" as const, SCORE: 3 },
      TEAM2: { CODE: "GEO" as const, SCORE: 1 },
      INFO: "Group F",
      TIME: matchday(-4, 18),
      EXTRA: false,
      WINNER: "TUR",
      STATUS: finished(),
      "USER BETS": mockBets("TUR", "GEO"),
      PERIODS: periods(finished()),
    },
    "110": {
      TEAM1: { CODE: "POR" as const, SCORE: 2 },
      TEAM2: { CODE: "CZE" as const, SCORE: 1 },
      INFO: "Group F",
      TIME: matchday(-4, 21),
      EXTRA: false,
      WINNER: "POR",
      STATUS: finished(),
      "USER BETS": mockBets("POR", "CZE"),
      PERIODS: periods(finished()),
    },
    // ── завтра ──
    "111": {
      TEAM1: { CODE: "BEL" as const, SCORE: 0 },
      TEAM2: { CODE: "SVK" as const, SCORE: 0 },
      INFO: "Group E",
      TIME: matchday(1, 18),
      EXTRA: false,
      WINNER: "",
      STATUS: scheduled,
      "USER BETS": mockBets("BEL", "SVK"),
      PERIODS: periods(scheduled),
    },
    "112": {
      TEAM1: { CODE: "ROU" as const, SCORE: 0 },
      TEAM2: { CODE: "UKR" as const, SCORE: 0 },
      INFO: "Group E",
      TIME: matchday(1, 21),
      EXTRA: false,
      WINNER: "",
      STATUS: scheduled,
      "USER BETS": mockBets("ROU", "UKR"),
      PERIODS: periods(scheduled),
    },
  };

  return s;
};

const buildTotalScore = () =>
  ok({
    MAINTABLE: [
      { USERNAME: "Val", POINTS: 101 },
      { USERNAME: "kam", POINTS: 94 },
      { USERNAME: "valera", POINTS: 5 },
    ],
    EXACT: [
      { USERNAME: "Val", POINTS: 10 },
      { USERNAME: "kam", POINTS: 5 },
      { USERNAME: "valera", POINTS: 2 },
    ],
    WINS: [
      { USERNAME: "Val", POINTS: 10 },
      { USERNAME: "kam", POINTS: 15 },
      { USERNAME: "valera", POINTS: 5 },
    ],
    AVERAGE: [
      { USERNAME: "Val", POINTS: 2 },
      { USERNAME: "kam", POINTS: 2 },
      { USERNAME: "valera", POINTS: 1.2 },
    ],
    TOPALL: [
      { USERNAME: "Val", POINTS: 101 },
      { USERNAME: "kam", POINTS: 94 },
      { USERNAME: "Alex", POINTS: 88 },
      { USERNAME: "Marina", POINTS: 82 },
      { USERNAME: "Dima", POINTS: 79 },
      { USERNAME: "Oleg", POINTS: 75 },
      { USERNAME: "Nastya", POINTS: 71 },
      { USERNAME: "Sergey", POINTS: 68 },
      { USERNAME: "Katya", POINTS: 64 },
      { USERNAME: "Pavel", POINTS: 60 },
      { USERNAME: "Anya", POINTS: 57 },
      { USERNAME: "Misha", POINTS: 53 },
      { USERNAME: "Lena", POINTS: 49 },
      { USERNAME: "Artem", POINTS: 45 },
      { USERNAME: "Vika", POINTS: 42 },
      { USERNAME: "Igor", POINTS: 38 },
      { USERNAME: "Tanya", POINTS: 34 },
      { USERNAME: "Nikita", POINTS: 30 },
      { USERNAME: "Olya", POINTS: 26 },
      { USERNAME: "Roma", POINTS: 22 },
      { USERNAME: "Sveta", POINTS: 18 },
      { USERNAME: "Kolya", POINTS: 14 },
      { USERNAME: "valera", POINTS: 5 },
    ],
  });

const buildUser = () =>
  ok(
    {
      USERNAME: "Val",
      ACTIVEROOM: 1,
      ROOMS: {
        "1": "Friends",
        "2": "Office",
      },
    },
    "OK",
  );

export const mockBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args) => {
  const url = typeof args === "string" ? args : args.url;

  switch (url) {
    case "/cfc/registerUser.cfc?method=registerUser":
      return { data: ok({}) };
    case "cfc/loginUserMain.cfc?method=loginUser":
      return { data: ok({}) };
    case "/getUserInfo.cfc?method=getUserInfo":
      return { data: { ...buildUser(), USERID: 1 } };
    case "cfc/suggest.cfc?method=addRoomUser":
      return { data: ok({}) };
    case "cfc/suggest.cfc?method=changeActiveRoom":
      return { data: ok({}) };
    case "cfc/getTotalPoints.cfc?method=getTotalPoints":
      return { data: buildTotalScore() };
    case "cfc/getNextMatches.cfc?method=getNextMatches":
      return { data: ok(buildNextMatches()) };
    case "cfc/suggest.cfc?method=Save": {
      const body = typeof args === "string" ? "{}" : (args.body as string);
      return { data: ok(saveNextMatches(body)) };
    }
    case "cfc/suggest.cfc?method=getAllMatches":
      return { data: ok(buildNMTime()) };
    case "cfc/getUserBets.cfc?method=getUsersBets":
      return { data: ok(buildMatchdays()) };
    case "cfc/getStandings.cfc?method=getStandings":
      return { data: ok(JSON.stringify(GROUPS)) };
    default:
      return { data: fail(`No mock for ${url}`) };
  }
};
