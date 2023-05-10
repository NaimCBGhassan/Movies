import UserModel from "../models/User";
import { sign } from "jsonwebtoken";
import { badRequest, created, error, notfound, ok, unauthorize } from "../handlers/response";
import { Request, Response, response } from "express";
import { SECRET_TOKEN } from "../env";

export const signup = async ({ body }: Request, res: Response) => {
  try {
    const { username, password, displayName } = body;
    const checkUser = (await UserModel.findOne({ username }))?.toObject();

    if (checkUser) return badRequest(res, "Username already exist");

    const user = new UserModel({ username, displayName });
    user.setPassword(password);
    await user.save();

    const token = sign({ data: user.id }, SECRET_TOKEN, { expiresIn: "24h" });

    return created(res, { token, ...user.toObject() });
  } catch (e) {
    error(res);
  }
};

export const signin = async ({ body }: Request, res: Response) => {
  try {
    const { username, password } = body;

    let user = await UserModel.findOne({ username }, "username password salt id displayName");

    if (!user) return badRequest(res, "User not exist");
    console.log({ ...user });

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

export const updatePassword = async ({ body, user }: Request, res: Response) => {
  try {
    const { password, newPassword } = body;

    const updatedUser = await UserModel.findById(user?.id).select("password id salt");

    if (!updatedUser) return unauthorize(res);
    if (!updatedUser.validPassword(password)) return badRequest(res, "Wrong password");

    updatedUser.setPassword(newPassword);
    return ok(res, { message: "Password changed successfully" });
  } catch (e) {
    error(res);
  }
};

export const getInfo = async ({ user }: Request, res: Response) => {
  try {
    const userInfo = await UserModel.findById(user?.id);
    if (!userInfo) return notfound(res);
    ok(res, userInfo);
  } catch (e) {
    error(res);
  }
};
