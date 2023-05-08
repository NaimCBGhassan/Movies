import "dotenv/config";

export const PORT = process.env.PORT as string;
export const MONGODB_URL = process.env.MONGODB_URL as string; //MONGODB
export const SECRET_TOKEN = process.env.TOKEN_SECRET as string; //JWT

export const TMDB_BASE_URL = process.env.TMDB_BASE_URL as string; //TMDB
export const TMDB_TOKEN = process.env.TMDB_TOKEN as string; //TMDB
