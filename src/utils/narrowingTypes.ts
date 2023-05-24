import { MovieResult } from "../types/movie";
import { TvSerieResult } from "../types/tv";
import { Cast } from "../types/person";
import { TMDB } from "../types/tmdb";
import { Favorite } from "../types/favorite";
import { Review } from "../types/review";

//MEDIAS

export function isMovie(media: unknown): media is MovieResult {
  return "title" in (media as MovieResult);
}

export function isTvSerie(media: unknown): media is TvSerieResult {
  return "name" in (media as MovieResult);
}

export function isPerson(media: unknown, mediaType: TMDB["mediaType"]): media is Cast {
  return mediaType === "people" || mediaType === "person";
}

//isFavorite
export function isFavoriteType(favorite: unknown): favorite is { data: Favorite } {
  const { data } = favorite as { data: Favorite };
  const flag1 = "userId" in data;
  const flag2 = "id" in data;

  return flag1 && flag2;
}

//isReview
export function isReviewType(review: unknown): review is { data: Review } {
  const { data } = review as { data: Review };
  const flag1 = "userId" in data;
  const flag2 = "id" in data;
  const flag3 = "content" in data;

  return flag1 && flag2;
}
