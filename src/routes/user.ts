import { Response, Router } from "express";
import { signup, signin, updatePassword, getInfo } from "../controllers/user";
import { UserRequestExt } from "../types/req";
import { auth } from "../middlewares/token";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/updatePassword", [auth], updatePassword);
router.get("/updatePassword", [auth], getInfo);

export { router };
