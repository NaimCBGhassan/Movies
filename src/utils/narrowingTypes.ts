import { MovieResult } from "../types/movie";
import { TvSerieResult } from "../types/tv";
import { Favorite } from "../types/favorite";
import { ReviewPopulate } from "../types/review";

//MEDIAS

export function isMovie(media: unknown): media is MovieResult {
  return "title" in (media as MovieResult);
}

export function isTvSerie(media: unknown): media is TvSerieResult {
  return "name" in (media as MovieResult);
}

//isFavorite
export function isFavoriteType(favorite: unknown): favorite is { data: Favorite } {
  const { data } = favorite as { data: Favorite };
  const flag1 = "userId" in data;
  const flag2 = "id" in data;

  return flag1 && flag2;
}

//isReview
export function isReviewType(review: unknown): review is { data: ReviewPopulate } {
  const { data } = review as { data: ReviewPopulate };
  const flag1 = "userId" in data;
  const flag2 = "id" in data;
  const flag3 = "content" in data;

  return flag1 && flag2 && flag3;
}

//isFavorite
export function isFavorite(favorite: unknown): favorite is Favorite {
  const flag1 = "mediaPoster" in (favorite as Favorite);
  const flag2 = "mediaTitle" in (favorite as Favorite);
  const flag3 = "mediaRate" in (favorite as Favorite);

  return flag1 && flag2 && flag3;
}
