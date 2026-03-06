import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { notFound } from "../controllers/pageController.controller";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    err.statusCode = err.statusCode || 500;
    if (err.statusCode === 404) {
      return notFound(req, res);
    }
    return res.status(err.statusCode).json({
      status: `${err.statusCode}`.startsWith("4") ? "fail" : "error",
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: "something went wrong!",
  });
};
