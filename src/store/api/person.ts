import { api } from "./api";
import { TMDB } from "../../types/tmdb";
import { PersonID, PersonIDCombined } from "../../types/person";

export const personApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPersonDetail: build.query<PersonID, Pick<TMDB, "mediaId">>({
      query: ({ mediaId }) => {
        return `/person/${mediaId}`;
      },
    }),
    getPersonMedia: build.query<PersonIDCombined, Pick<TMDB, "mediaId">>({
      query: ({ mediaId }) => {
        return `/person/${mediaId}/medias`;
      },
    }),
  }),
});

export const { useGetPersonDetailQuery, useGetPersonMediaQuery } = personApi;
