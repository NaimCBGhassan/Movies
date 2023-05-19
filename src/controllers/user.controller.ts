/// <reference path="../types/custom.d.ts" />
import UserModel from "../models/User.model";
import { sign } from "jsonwebtoken";
import { badRequest, created, error, notfound, ok, unauthorize } from "../handlers/response.handler";
import { Request, Response } from "express";
import { SECRET_TOKEN } from "../env";
import { User } from "../types/models";

// [POST] SignUp
export const signup = async ({ body }: Request, res: Response) => {
  try {
    const { username, password, displayName } = body;
    const checkUser = (await UserModel.findOne({ username }))?.toObject();

    if (checkUser) return badRequest(res, "Username already exist");

    const user = new UserModel({ username, displayName });
    user.setPassword(password);
    await user.save();

    const token = sign({ data: user.id }, SECRET_TOKEN, { expiresIn: "24h" });

    const userObj: Partial<User> = user.toObject();
    delete userObj.password;
    delete userObj.salt;

    return created(res, { token, user: { ...userObj } });
  } catch (e) {
    error(res);
  }
};

// [POST] SingIn
export const signin = async ({ body }: Request, res: Response) => {
  try {
    const { username, password } = body;

    let user = await UserModel.findOne({ username }, "username password salt id displayName");

    if (!user) return badRequest(res, "User not exist");

    if (!user.validPassword(password)) return badRequest(res, "Wrong password");

    const token = sign({ data: user.id }, SECRET_TOKEN, { expiresIn: "24h" });
    user = user.toObject();

    return ok(res, {
      token,
      user: {
        ...user,
        password: undefined,
        salt: undefined,
      },
    });
  } catch (e) {
    error(res);
  }
};

// [PUT] Password update
export const updatePassword = async ({ body, user }: Request, res: Response) => {
  try {
    const { password, newPassword } = body;

    const updatedUser = await UserModel.findById(user?.id).select("password id salt");

    if (!updatedUser) return unauthorize(res);
    if (!updatedUser.validPassword(password)) return badRequest(res, "Wrong password");

    updatedUser.setPassword(newPassword);

    await updatedUser.save();
    return ok(res, { message: "Password changed successfully" });
  } catch (e) {
    error(res);
  }
};

// [GET] Get Info
export const getInfo = async ({ user }: Request, res: Response) => {
  try {
    const userInfo = await UserModel.findById(user?.id);
    if (!userInfo) return notfound(res);
    ok(res, userInfo);
  } catch (e) {
    error(res);
  }
};
