import { Router } from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorite.controller";
import { auth } from "../middlewares/token";

const router = Router();

/*-----AUTH MIDDLEWARE-----*/
router.post("/", [auth], addFavorite); //[POST] addFavorite
router.delete("/:favoriteId", [auth], removeFavorite); //[DELETE] removeFavorite
router.get("/", [auth], getFavorites); //[GET] Get Favorites

export { router };
