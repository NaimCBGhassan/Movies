import { ObjectId } from "mongoose";

//Users
export interface User {
  username: string;
  displayName: string;
  password: string;
  salt: string;
}

//Reviews
export interface Review {
  userId: ObjectId;
  content: string;
  mediaType: string;
  mediaId: string;
  mediaTitle: string;
  mediaPoster: string;
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
