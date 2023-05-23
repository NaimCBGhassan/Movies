import { api } from "./api";
import { Favorite } from "../../types/favorite";

export const favoriteApi = api.injectEndpoints({
  endpoints: (build) => ({
    addFavorite: build.mutation<Favorite, Omit<Favorite, "userId" | "id">>({
      query: (body) => ({
        url: `/favorite`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favorites"],
    }),
    getFavorite: build.query<Favorite[], void>({
      query: () => `/favorite`,
      providesTags: ["Favorites"],
    }),
    deleteFavorite: build.mutation<{ message: string }, Pick<Favorite, "id">>({
      query: ({ id }) => ({
        url: `/favorite/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoriteQuery } = favoriteApi;
