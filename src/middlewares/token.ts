/// <reference path="../types/custom.d.ts" />
import { verify } from "jsonwebtoken";
import { notfound, unauthorize } from "../handlers/response.handler";
import UserModel from "../models/User.model";
import { NextFunction, Request, Response } from "express";
import { SECRET_TOKEN } from "../env";
import { User } from "../types/models";

export const tokenDecode = (req: Request) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      return verify(token, SECRET_TOKEN);
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const tokenDecoded = tokenDecode(req);
  if (!tokenDecoded) return unauthorize(res);

  let user: User | undefined;

  if (typeof tokenDecoded === "string") {
    const userDocument = await UserModel.findById(tokenDecoded);
    user = userDocument?.toObject();
  } else {
    const userDocument = await UserModel.findById(tokenDecoded.data);
    user = userDocument?.toObject();
  }

  if (!user) return notfound(res);

  req.user = user;

  next();
};
