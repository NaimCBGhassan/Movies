import { Router } from "express";
import { body } from "express-validator";
import validate from "../handlers/request.handler";
import { signup, signin, updatePassword, getInfo } from "../controllers/user.controller";
import { auth } from "../middlewares/token";
import UserModel from "../models/User.model";

const router = Router();

//[POST] SignUp
router.post(
  "/signup",
  [
    body("username")
      .exists()
      .withMessage("username is required")
      .isLength({ min: 8 })
      .withMessage("Username minimum 8 characters")
      .custom(async (value) => {
        const user = await UserModel.findOne({ username: value });
        if (user) throw new Error("username already exist");
        return false;
      }),

    body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password minimun 8 characters"),

    body("confirmPassword")
      .exists()
      .withMessage("confirmPassword is required")
      .isLength({ min: 8 })
      .withMessage("confirmPassword minimun 8 characters")
      .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("confirmPassword not match");
        return true;
      }),

    body("displayName")
      .exists()
      .withMessage("displayName is required")
      .isLength({ min: 8 })
      .withMessage("displayName minimun 8 characters"),
    validate,
  ],
  signup
);

//[POST] SignIn
router.post(
  "/signin",
  [
    body("username")
      .exists()
      .withMessage("username is required")
      .isLength({ min: 8 })
      .withMessage("Username minimum 8 characters")
      .custom(async (value) => {
        const user = await UserModel.findOne({ username: value });
        if (!user) throw new Error("username not exist");
        return true;
      }),

    body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password minimun 8 characters"),
    validate,
  ],
  signin
);

//[PUT] Update Password
router.put(
  "/updatePassword",
  [
    auth,
    body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password minimun 8 characters"),
    body("newPassword")
      .exists()
      .withMessage("newPassword is required")
      .isLength({ min: 8 })
      .withMessage("newPassword minimun 8 characters"),
    body("confirmNewPassword")
      .exists()
      .withMessage("confirmNewPassword is required")
      .isLength({ min: 8 })
      .withMessage("confirmNewPassword minimun 8 characters")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) throw new Error("confirmPassword not match");
        return true;
      }),
    validate,
  ],
  updatePassword
);

//[GET] GetInfo User
router.get("/getinfo", [auth], getInfo);

export { router };
