import { Router } from "express";
import { query, body } from "express-validator";
import validate from "../handlers/request.handler";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorite.controller";
import { auth } from "../middlewares/token";

const router = Router();

//[POST] addFavorite
router.post(
  "/",
  [
    auth,
    body("mediaType")
      .exists()
      .withMessage("mediaType is required")
      .custom((type) => ["movie", "tv"].includes(type))
      .withMessage("mediaType invalid"),
    body("mediaId")
      .exists()
      .withMessage("mediaId is required")
      .isLength({ min: 1 })
      .withMessage("mediaId can not be empty"),

    body("mediaTitle").exists().withMessage("mediaTitle is required"),

    body("mediaPoster").exists().withMessage("mediaPoster is required"),

    body("mediaRate").exists().withMessage("mediaRate is required"),

    validate,
  ],
  addFavorite
);

//[DELETE] removeFavorite
router.delete("/:favoriteId", [auth], removeFavorite);

//[GET] Get Favorites
router.get("/", [auth, validate], getFavorites);

export { router };
