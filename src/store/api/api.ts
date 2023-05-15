import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL as string;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjQ1ZmQ2YmExZjczMjU1YTZhNDM2ZjQ3IiwiaWF0IjoxNjg0MTYyMDc1LCJleHAiOjE2ODQyNDg0NzV9.VSdDbHSFVY5nPzkSRKcJMzhoPnEP3HvQgLiud3BjU2k";

export const api = createApi({
  reducerPath: "users",
  tagTypes: ["Users", "Medias", "Favorites", "Reviews"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    },
  }),
  endpoints: () => ({}),
});
