/// <reference path="../types/custom.d.ts" />
import { Request, Response } from "express";
import { badRequest, created, error, notfound, ok } from "../handlers/response.handler";
import FavoriteModel from "../models/Favorite.model";

// [POST] Add Favorite or Check if it exist
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const isFavorite = await FavoriteModel.findOne({
      userId: req.user?.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return ok(res, isFavorite);

    const favorite = new FavoriteModel({
      ...req.body,
      userId: req.user?.id,
    });

    await favorite.save();
    return created(res, favorite);
  } catch (e) {
    error(res);
  }
};

// [DELETE] Delete Favorite
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await FavoriteModel.findOne({
      userId: req.user?.id,
      _id: favoriteId,
    });

    if (!favorite) return notfound(res);

    await favorite.deleteOne();

    return ok(res, { message: "Deleted favorite" });
  } catch (e) {
    error(res);
  }
};

// [GET] Get Favorites
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorite = await FavoriteModel.find({ userId: req.user?.id }).sort("-createdAt");
    return ok(res, favorite);
  } catch (e) {
    error(res);
  }
};
