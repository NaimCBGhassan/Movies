import { api } from "./api";
import { TMDB } from "../../types/tmdb";
import { PersonID, PersonIDCombined } from "../../types/person";

export const personApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPersonDetail: build.query<PersonID, Pick<TMDB, "personId">>({
      query: ({ personId }) => {
        return `/person/${personId}`;
      },
    }),
    getPersonMedia: build.query<PersonIDCombined, Pick<TMDB, "personId">>({
      query: ({ personId }) => {
        return `/person/${personId}/medias`;
      },
    }),
  }),
});

export const { useGetPersonDetailQuery, useGetPersonMediaQuery } = personApi;
