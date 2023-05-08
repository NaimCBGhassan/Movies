import { Schema, model } from "mongoose";
import modelOptions from "./modelOptions";
import crypto from "crypto";
import { User } from "../types/models";

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  modelOptions
);

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

UserSchema.methods.validPassword = function (password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");

  return this.password === hash;
};

const UserModel = model("User", UserSchema);
export default UserModel;
