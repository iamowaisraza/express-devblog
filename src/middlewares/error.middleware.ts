import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { logger } from "../utils/logger";
import { notFound } from "../controllers/pageController.controller";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  // Log error
  logger.error("Unhandled error", err);

  if (err instanceof AppError) {
    const statusCode = err.statusCode || 500;
    if (statusCode === 404) {
      return notFound(req, res);
    }
    return res.status(statusCode).json({
      status: statusCode < 500 ? "fail" : "error",
      message: err.message,
    });
  }

  res.status(500).json({
    status: "error",
    message: process.env.NODE_ENV === "production" ? "Internal server error" : String(err),
  });
};
