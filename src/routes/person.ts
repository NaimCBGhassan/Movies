import { Router } from "express";
import { personDetail, personMedias } from "../controllers/person.controller";

const router = Router({ mergeParams: true });

router.get("/:personId", personDetail); //[GET] Person Detail
router.get("/:personId/medias", personMedias); //[GET] Person Combined Credits

export { router };
