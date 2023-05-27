import { api } from "./api";
import { TMDB } from "../../types/tmdb";
import queryString from "query-string";
import { Movies, MoviesGenre, MoviesID } from "../../types/movie";
import { TvGenre, TvID, TvSeries } from "../../types/tv";

export const mediaApi = api.injectEndpoints({
  endpoints: (build) => ({
    getList: build.query<Movies | TvSeries, Pick<TMDB, "mediaType" | "mediaCategory" | "page">>({
      query: ({ mediaType, mediaCategory, page }) => {
        const params = queryString.stringify({ page });
        return `/media/list/${mediaType}/${mediaCategory}?${params}`;
      },
    }),
    getGenre: build.query<MoviesGenre | TvGenre, Pick<TMDB, "mediaType">>({
      query: ({ mediaType }) => {
        return `/media/genre/${mediaType}`;
      },
    }),
    search: build.query<Movies | TvSeries, Pick<TMDB, "mediaType" | "page" | "query">>({
      query: ({ mediaType, page, query }) => {
        const params = queryString.stringify({ page, query });
        return `/media/search/${mediaType}?${params}`;
      },
    }),
    getDetail: build.query<MoviesID | TvID, Pick<TMDB, "mediaType" | "mediaId">>({
      query: ({ mediaType, mediaId }) => {
        return `/media/detail/${mediaType}/${mediaId}`;
      },
      providesTags: ["Medias"],
    }),
  }),
});

export const { useGetListQuery, useGetGenreQuery, useSearchQuery, useGetDetailQuery } = mediaApi;
