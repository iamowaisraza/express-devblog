import type { NextFunction, Request, Response } from "express";
import express from "express";
import { join } from "path";
import { globalErrorHandler } from "./middlewares/error.middleware";
import pageRouter from "./routes/page.route";
import postRouter from "./routes/post.route";
import { AppError } from "./utils/appError";

const app = express();

// Template engine configuration
app.set("view engine", "ejs");
app.set("views", join(process.cwd(), "views"));

// Pre-defined Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(process.cwd(), "public")));

// Routes
app.use("/", pageRouter);
app.use("/api/posts", postRouter);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("Route not found!", 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;
