import { Schema, model } from "mongoose";
import modelOptions from "./modelOptions";
import { Favorite } from "../types/models";

const FavoriteSchema = new Schema<Favorite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
    mediaPoster: {
      type: String,
      required: true,
    },
    mediaRate: {
      type: Number,
      required: true,
    },
  },
  modelOptions
);

const FavoriteModel = model("Favorite", FavoriteSchema);
export default FavoriteModel;
