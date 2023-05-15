import { Review } from "./review";

// FOR MEDIA TYPE AND MOVIEID RECOMENDATION
export interface Movies {
  dates?: Dates;
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

interface Dates {
  maximum: Date;
  minimum: Date;
}

interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: "movie"; // TO /reccomendattions
}

// FOR MEDIA ID
export interface MoviesID {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits?: MoviesIDCredit;
  videos?: MoviesIDVideo;
  recommend?: MovieResult[];
  images: MoviesIDImages;
  isFavorite?: boolean;
  reviews?: Review[];
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// MEDIAID CREDITS
export interface MoviesIDCredit {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

//MEDIAID VIDEOS
export interface MoviesIDVideo {
  id: number;
  results: VideoResults[];
}

interface VideoResults {
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
export interface MoviesIDImages {
  backdrops: Backdrop[];
  id: number;
  logos: Backdrop[];
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
export interface MoviesGenre {
  genres: Genre[]; //Already exist
}
