import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const requestBody = req.body;

  if (!requestBody?.title || !requestBody?.author || !requestBody?.content) {
    return next(new AppError("Invalid body :(", 400));
  }

  next();
};
