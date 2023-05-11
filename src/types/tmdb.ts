/***** GENERAL *****/
export interface TMDB {
  personId: string;
  mediaId: string;
  mediaType: "movie" | "tv" | "people" | "person";
  mediaCategory: "now_playing" | "popular" | "top_rated" | "upcoming" | "airing_today" | "on_the_air";
  query: string;
  page: string;
}
