import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  prepareNMData,
  transformMatchdays,
  transformNM,
  transformNMTime,
} from "./helpers";

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
      transformResponse: transformNM,
    }),
    setNextMatches: query({
      query: (nmData) => ({
        url: "cfc/suggest.cfc?method=Save",
        method: "POST",
        headers,
        body: JSON.stringify(prepareNMData(nmData)),
      }),
      transformResponse: transformNM,
    }),
    getNMTime: query({
      query: () => "cfc/suggest.cfc?method=getAllMatches",
      transformResponse: transformNMTime,
    }),
    getMatchdays: query({
      query: (dateRange) => ({
        url: "cfc/getUserBets.cfc?method=getUsersBets",
        method: "POST",
        headers,
        body: JSON.stringify(dateRange),
      }),
      transformResponse: transformMatchdays,
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
  useLazySetNextMatchesQuery,
  useLazyGetNMTimeQuery,
  useLazyGetMatchdaysQuery,
  useGetMatchdaysQuery,
} = apiSlice;
