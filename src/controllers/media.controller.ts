import { error, ok, unauthorize } from "../handlers/response.handler";
import { tmdbApi } from "../tmdb/tmdb";
import UserModel from "../models/User.model";
import FavoriteModel from "../models/Favorite.model";
import ReviewModel from "../models/Review.model";
import { Request, Response } from "express";
import { TMDB } from "../types/tmdb";
import { Movies, MoviesGenre, MoviesID, MoviesIDCredit, MoviesIDImages, MoviesIDVideo } from "../types/movie";
import { TvID, TvIDCredits, TvGenre, TvIDImages, TvIDVideo, TvSeries } from "../types/tv";
import { tokenDecode } from "../middlewares/token";
import { User } from "../types/models";

// [GET] ./$type/$category?apy_key=...&page=...
export const getList = async (req: Request, res: Response) => {
  try {
    const { page = "1" }: Pick<Partial<TMDB>, "page"> = req.query;
    const {
      mediaType = "movie",
      mediaCategory = "popular",
    }: Pick<Partial<TMDB>, "mediaType" | "mediaCategory"> = req.params;

    const response: Movies | TvSeries = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

    return ok(res, response);
  } catch (e) {
    error(res);
  }
};

// [GET] ./genre/$type/list?apy_key=...
export const getGenres = async (req: Request, res: Response) => {
  try {
    const { mediaType = "movie" }: Pick<Partial<TMDB>, "mediaType"> = req.params;
    const response: MoviesGenre | TvGenre = await tmdbApi.mediaGenres({ mediaType });
    return ok(res, response);
  } catch (e) {
    error(res);
  }
};

// [GET] ./search/$type?apy_key=...&page=...&query
export const search = async (req: Request, res: Response) => {
  try {
    const { query = "", page = "1" }: Pick<Partial<TMDB>, "query" | "page"> = req.query;
    const { mediaType = "movie" }: Pick<Partial<TMDB>, "mediaType"> = req.params;

    const response = await tmdbApi.mediaSearch({
      mediaType: mediaType === "people" ? "person" : mediaType,
      query,
      page,
    });

    return ok(res, response);
  } catch (e) {
    error(res);
  }
};

// [GET] ./&type/$id?apy_key=...

export const getDetail = async (req: Request, res: Response) => {
  try {
    const { mediaType = "movie", mediaId = "" }: Pick<Partial<TMDB>, "mediaType" | "mediaId"> = req.params;

    const media: MoviesID | TvID = await tmdbApi.mediaDetail({ mediaType, mediaId });
    const credits: MoviesIDCredit | TvIDCredits = await tmdbApi.mediaCredits({ mediaType, mediaId });
    const videos: MoviesIDVideo | TvIDVideo = await tmdbApi.mediaVideos({ mediaType, mediaId });
    const recommend: Movies | TvSeries = await tmdbApi.mediaRecommend({ mediaType, mediaId });
    const images: MoviesIDImages | TvIDImages = await tmdbApi.mediaImages({ mediaType, mediaId });

    media.credits = credits;
    media.videos = videos;
    media.recommend = recommend.results; //This change
    media.images = images;

    const tokenDecoded = tokenDecode(req);

    let user: User | undefined;
    if (tokenDecoded) {
      if (typeof tokenDecoded === "string") {
        const documentUser = await UserModel.findById({ _id: tokenDecoded });
        user = documentUser?.toObject();
      } else {
        const documentUser = await UserModel.findById(tokenDecoded.data);
        user = documentUser?.toObject();
      }
    }

    if (user) {
      const isFavorite = await FavoriteModel.findOne({ userId: user.id, mediaId });
      isFavorite?.toObject;
      media.isFavorite = isFavorite !== null;
    }

    media.reviews = await ReviewModel.find({ mediaId }).populate("user").sort("-createdAt");

    return ok(res, media);
  } catch (e) {
    error(res);
  }
};
