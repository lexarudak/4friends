import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    user: query({ query: () => "/getUserInfo.cfc?method=getUserInfo" }),
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
  }),
});

export const {
  useLazyRegisterQuery,
  useLazyLoginQuery,
  useUserQuery,
  useLazyUserQuery,
  useLazyAddRoomQuery,
  useLazySetRoomQuery,
  useTotalScoreQuery,
} = apiSlice;
