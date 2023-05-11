import { get } from "../axios/axios.client";
import { TMDB } from "../types/tmdb";
import tmdbEndpoints from "./tmdb.enpoints";

const {
  mediaList,
  mediaSearch,
  mediaDetail,
  mediaCredits,
  mediaVideos,
  mediaRecommend,
  mediaImages,
  mediaGenres,
  personDetail,
  personMedias,
} = tmdbEndpoints;

export const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }: Pick<TMDB, "mediaType" | "mediaCategory" | "page">) =>
    get(mediaList({ mediaType, mediaCategory, page })),

  mediaDetail: async ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    get(mediaDetail({ mediaType, mediaId })),

  mediaGenres: async ({ mediaType }: Pick<TMDB, "mediaType">) => get(mediaGenres({ mediaType })),

  mediaCredits: async ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    get(mediaCredits({ mediaType, mediaId })),

  mediaVideos: async ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    get(mediaVideos({ mediaType, mediaId })),

  mediaImages: async ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    get(mediaImages({ mediaType, mediaId })),

  mediaRecommend: async ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    get(mediaRecommend({ mediaType, mediaId })),

  mediaSearch: async ({ mediaType, query, page }: Pick<TMDB, "mediaType" | "query" | "page">) =>
    get(mediaSearch({ mediaType, query, page })),

  personDetail: async ({ personId }: Pick<TMDB, "personId">) => get(personDetail({ personId })),

  personMedias: async ({ personId }: Pick<TMDB, "personId">) => get(personMedias({ personId })),
};
