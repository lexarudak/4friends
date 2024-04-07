import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ORIGIN = "http://176.57.70.40:8080/rest4friends/cfc";

const headers = {
  "Content-Type": "application/json",
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: ORIGIN }),
  endpoints: ({ query }) => ({
    register: query({
      query: (regData) => ({
        url: "/registerUser.cfc?method=registerUser",
        method: "POST",
        headers,
        body: JSON.stringify(regData),
      }),
    }),
  }),
});

export const { useLazyRegisterQuery } = apiSlice;
