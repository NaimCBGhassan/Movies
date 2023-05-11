import { Router } from "express";
import { personDetail } from "../controllers/person.controller";
import { createReview, getReview, removeReview } from "../controllers/review.controllers";
import { auth } from "../middlewares/token";

const router = Router();

/*-----AUTH MIDDLEWARE-----*/
router.post("/:mediaId", [auth], createReview); //[POST] Create Review
router.delete("/:reviewId", [auth], removeReview); //[DELETE] Delete Review
router.get("/", [auth], getReview); //[GET]s Get revies

export { router };
