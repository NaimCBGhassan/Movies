import { Review } from "./review";

// FOR MEDIA TYPE AND TV RECOMENDATION
export interface TvSeries {
  page: number;
  results: TvSerieResult[];
  total_pages: number;
  total_results: number;
}

export interface TvSerieResult {
  backdrop_path: null | string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

// FOR MEDIA ID
export interface TvID {
  adult: boolean;
  backdrop_path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  created_by: any[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: TEpisodeToAir;
  name: string;
  next_episode_to_air: TEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits?: TvIDCredits;
  videos?: TvIDVideo;
  recommend?: TvSerieResult[]; // This is different
  images: TvIDImages;
  isFavorite?: boolean;
  reviews?: Review[];
}

interface Genre {
  id: number;
  name: string;
}

interface TEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  production_code: string;
  runtime: null;
  season_number: number;
  show_id: number;
  still_path: null;
}

interface Network {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: null;
  season_number: number;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// MEDIAID CREDITS

export interface TvIDCredits {
  cast: Cast[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  crew: any[];
  id: number;
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

//MEDIAID VIDEOS
export interface TvIDVideo {
  id: number;
  results: Result[];
}

interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

// MOVIEID IMAGES

export interface TvIDImages {
  backdrops: Backdrop[];
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logos: any[];
  posters: Backdrop[];
}

interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

// GENRE

export interface TvGenre {
  genres: Genre[]; //BEFORE
}
