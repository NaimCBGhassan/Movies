import { Model, ObjectId } from "mongoose";

//Users
export interface User {
  username: string;
  displayName: string;
  password: string;
  salt: string;
  id?: string;
}

export interface UserMethods {
  setPassword: (password: string) => void;
  validPassword: (password: string) => boolean;
}

export type UserModel = Model<User, {}, UserMethods>;

//Reviews
export interface Review {
  userId: ObjectId;
  content: string;
  mediaType: string;
  mediaId: string;
  mediaTitle: string;
  mediaPoster: string;
  reviewId?: string;
}

//Favorites
export interface Favorite {
  userId: ObjectId;
  mediaType: string;
  mediaId: string;
  mediaTitle: string;
  mediaPoster: string;
  mediaRate: number;
}

export interface FavoriteMethods {
  remove: () => Promise<void>;
}

export type FavoriteModel = Model<Favorite, {}, FavoriteMethods>;
