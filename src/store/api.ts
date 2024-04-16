import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NMResponse } from "./types";

const ORIGIN = "https://api.4friends.live/rest4friends";

const headers = {
  "Content-Type": "application/json",
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: ORIGIN, credentials: "include" }),
  endpoints: ({ query }) => ({
    register: query({
      query: (regData) => ({
        url: "/cfc/registerUser.cfc?method=registerUser",
        method: "POST",
        headers,
        body: JSON.stringify(regData),
      }),
    }),
    login: query({
      query: (loginData) => ({
        url: "cfc/loginUserMain.cfc?method=loginUser",
        method: "POST",
        headers,
        body: JSON.stringify(loginData),
      }),
    }),
    user: query({
      query: () => ({
        url: "/getUserInfo.cfc?method=getUserInfo",
        method: "GET",
      }),
    }),
    addRoom: query({
      query: (roomData) => ({
        url: "cfc/suggest.cfc?method=addRoomUser",
        method: "POST",
        headers,
        body: JSON.stringify(roomData),
      }),
    }),
    setRoom: query({
      query: (roomData) => ({
        url: "cfc/suggest.cfc?method=changeActiveRoom",
        method: "POST",
        headers,
        body: JSON.stringify(roomData),
      }),
    }),
    totalScore: query({
      query: () => "cfc/getTotalPoints.cfc?method=getTotalPoints",
    }),
    getNextMatches: query({
      query: () => "cfc/getNextMatches.cfc?method=getNextMatches",
      transformResponse: (response: NMResponse) => {
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
      },
    }),
  }),
});

export const {
  useLazyRegisterQuery,
  useLazyLoginQuery,
  useUserQuery,
  useLazyUserQuery,
  useLazyAddRoomQuery,
  useLazySetRoomQuery,
  useLazyTotalScoreQuery,
  useLazyGetNextMatchesQuery,
} = apiSlice;
