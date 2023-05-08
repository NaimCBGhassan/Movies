import { param } from "express-validator";
import { TMDB_BASE_URL as baseUrl, TMDB_TOKEN as token } from "../env";
import { TMDB } from "../types/tmdb/tmdb";

const getUrl = (endpoint: string, params?: Pick<TMDB, "page"> | Pick<TMDB, "query" | "page">) => {
  let qs: URLSearchParams | undefined;

  if (params) {
    if ("query" in params) {
      qs = new URLSearchParams(params.query);
    }
  }
  return `${baseUrl}${endpoint}?api_key=${token}&${qs}`;
};

export default getUrl;
