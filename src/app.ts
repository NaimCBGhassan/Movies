import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import "./db";
import { PORT } from "./env";
import { router } from "./routes";

const app = express();

/* MIDDLEWARES */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//   ROUTES
app.use(router);

app.listen(PORT, () => {
  console.log(`Server runnig on PORT: ${PORT}`);
});
