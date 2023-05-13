import { Router } from "express";
import { getDetail, getGenres, getList, search } from "../controllers/media.controller";

const router = Router({ mergeParams: true });

router.get("/list/:mediaType/:mediaCategory", getList); //[GET] list
router.get("/genre/:mediaType", getGenres); //[GET] genres
router.get("/search/:mediaType", search); //[GET] search
router.get("/detail/:mediaType/:mediaId", getDetail); //[GET] getDetail

export { router };
