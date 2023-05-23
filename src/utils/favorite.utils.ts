import { Favorite } from "../types/favorite";

interface ParamsType {
  listFavorites: Favorite[];
  mediaId: number;
}

export const favoriteUtils = {
  check: ({ listFavorites, mediaId }: ParamsType) =>
    listFavorites && listFavorites.find((e) => e.mediaId.toString() === mediaId.toString()) !== undefined,
};
