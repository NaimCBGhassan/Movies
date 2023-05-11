/// <reference path="../types/custom.d.ts" />
import { Request, Response } from "express";
import { created, error, notfound, ok } from "../handlers/response.handler";
import ReviewModel from "../models/Review.model";
import { Review } from "../types/models";

// [POST] Create Review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { mediaId }: Pick<Partial<Review>, "mediaId"> = req.params;

    const review = new ReviewModel({
      userId: req.user?.id,
      mediaId,
      ...req.body,
    });

    console.log(review);
    await review.save();

    return created(res, {
      ...review.toObject(),
    });
  } catch (e) {
    error(res);
  }
};

// [DELETE] Remove Review
export const removeReview = async (req: Request, res: Response) => {
  try {
    const { reviewId }: Pick<Partial<Review>, "reviewId"> = req.params;

    const review = await ReviewModel.findOne({
      _id: reviewId,
      userId: req.user?.id,
    });

    if (!review) return notfound(res);

    return ok(res, { message: "Review succesfully deleted" });
  } catch (e) {
    error(res);
  }
};

// [GET] Get Review
export const getReview = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewModel.find({ userId: req.user?.id }).sort("-createdAt");
    return ok(res, reviews);
  } catch (e) {
    error(res);
  }
};
