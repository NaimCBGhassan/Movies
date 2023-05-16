import { Favorite } from "../types/favorite";

interface ParamsType {
  listFavorite: Favorite[];
  mediaId: string;
}

export const favoriteUtils = {
  check: ({ listFavorite, mediaId }: ParamsType) =>
    listFavorite && listFavorite.find((e) => e.mediaId.toString() === mediaId.toString()) !== undefined,
};
