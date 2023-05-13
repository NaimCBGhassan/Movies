import { Router } from "express";
import { body } from "express-validator";
import validate from "../handlers/request.handler";
import { createReview, getReview, removeReview } from "../controllers/review.controllers";
import { auth } from "../middlewares/token";

const router = Router({ mergeParams: true });

//[POST] Create Review
router.post(
  "/:mediaId",
  [
    auth,

    body("content")
      .exists()
      .withMessage("content is required")
      .isLength({ min: 8 })
      .withMessage("content minimun 8 characters"),

    body("mediaType")
      .exists()
      .withMessage("mediaType is required")
      .custom((type) => ["movie", "tv"].includes(type))
      .withMessage("mediaType invalid"),

    body("mediaTitle").exists().withMessage("mediaTitle is required"),

    body("mediaPoster").exists().withMessage("mediaPoster is required"),

    validate,
  ],
  createReview
);

//[DELETE] Delete Review
router.delete("/:reviewId", [auth], removeReview);

//[GET]s Get review
router.get("/", [auth], getReview);

export { router };
