import { Router } from "express";
import { personDetail } from "../controllers/person.controller";

const router = Router();

/*-----AUTH MIDDLEWARE-----*/
router.get("/:personId", personDetail); //[GET] Person Detail
router.get("/:personId/combined_credits", personDetail); //[GET] Person Combined Credits

export { router };
