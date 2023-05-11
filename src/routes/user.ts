import { Router } from "express";
import { signup, signin, updatePassword, getInfo } from "../controllers/user.controller";
import { auth } from "../middlewares/token";

const router = Router();

router.post("/signup", signup); //[POST] SignUp
router.post("/signin", signin); //[POST] SignIn
router.put("/updatePassword", [auth], updatePassword); //[PUT] Update Password
router.get("/getinfo", [auth], getInfo); //[GET] GetInfo User

export { router };
