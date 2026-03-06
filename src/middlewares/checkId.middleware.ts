import { NextFunction, Request, Response } from "express";
import iPost from "../types/iPosts";
import { AppError } from "../utils/appError";
import { posts } from "../utils/filesReader";

export const checkIdHandler = (req: Request, res: Response, next: NextFunction, val: string) => {
  const postID = Number(val);

  if (isNaN(postID)) {
    return next(new AppError("Invalid post ID", 400));
  }

  const post = posts.find((el: iPost) => el.id === postID);

  if (!post) {
    return next(new AppError("Post not found with this ID", 404));
  }

  next();
};
