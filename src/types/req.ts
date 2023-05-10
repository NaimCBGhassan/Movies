import { Request } from "express";
import { User } from "./models";

export type UserRequestExt = Request & {
  user: User;
};
