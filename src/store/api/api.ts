import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_BASE_URL as string;

export const api = createApi({
  reducerPath: "users",
  tagTypes: ["Users", "Medias", "Favorites", "Reviews"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("actkn")}`);
      headers.set("Content-Type", "application/json");
    },
  }),
  endpoints: () => ({}),
});
