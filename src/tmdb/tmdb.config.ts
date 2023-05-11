import { TMDB_BASE_URL as baseUrl, TMDB_TOKEN as token } from "../env";
import { TMDB } from "../types/tmdb";

const getUrl = (endpoint: string, params?: Pick<TMDB, "page"> | Pick<TMDB, "query" | "page">) => {
  let qs: URLSearchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      console.log(key, value);
      qs.append(key, value);
    });
  }
  return `${baseUrl}${endpoint}?api_key=${token}&${qs}`;
};

export default getUrl;
