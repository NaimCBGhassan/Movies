import { TMDB } from "../types/tmdb";
import getUrl from "./tmdb.config";

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }: Pick<TMDB, "mediaType" | "mediaCategory" | "page">) =>
    getUrl(`${mediaType}/${mediaCategory}`, { page }),

  mediaSearch: ({ mediaType, query, page }: Pick<TMDB, "mediaType" | "query" | "page">) =>
    getUrl(`search/${mediaType}`, { query, page }),

  mediaDetail: ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) => getUrl(`${mediaType}/${mediaId}`),

  mediaCredits: ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    getUrl(`${mediaType}/${mediaId}/credits`),

  mediaVideos: ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    getUrl(`${mediaType}/${mediaId}/videos`),

  mediaRecommend: ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    getUrl(`${mediaType}/${mediaId}/recommendations`),

  mediaImages: ({ mediaType, mediaId }: Pick<TMDB, "mediaType" | "mediaId">) =>
    getUrl(`${mediaType}/${mediaId}/images`),

  mediaGenres: ({ mediaType }: Pick<TMDB, "mediaType">) => getUrl(`genre/${mediaType}/list`),

  personDetail: ({ personId }: Pick<TMDB, "personId">) => getUrl(`person/${personId}`),

  personMedias: ({ personId }: Pick<TMDB, "personId">) => getUrl(`person/${personId}/combined_credits`),
};

export default tmdbEndpoints;
