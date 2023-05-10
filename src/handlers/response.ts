import { Response } from "express";

const responseWithData = (res: Response, statusCode: number, data: any) => res.status(statusCode).json(data);

export const error = (res: Response) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something wrong",
  });

export const badRequest = (res: Response, message: string) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

export const ok = (res: Response, data: any) => responseWithData(res, 201, data);

export const created = (res: Response, data: any) => responseWithData(res, 201, data);

export const unauthorize = (res: Response) =>
  responseWithData(res, 401, {
    status: 404,
    message: "Unauthorized",
  });

export const notfound = (res: Response) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource not found",
  });
