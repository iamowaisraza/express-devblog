import type { NextFunction, Request, Response } from "express";
import * as postService from "../services/postService.service";
import iPost from "../types/iPosts";
import { AppError } from "../utils/appError";
import captureAsyncError from "../utils/captureAsyncError";

export const getAllPost = captureAsyncError(async (req: Request, res: Response) => {
  const posts = postService.getAllPosts();

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: { posts },
  });
});

export const addPost = captureAsyncError(async (req: Request, res: Response) => {
  const body = req.body;
  await postService.createPost(body);

  res.redirect("/?success=1");
});

export const updatePost = captureAsyncError(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const updated = await postService.updatePost(Number(id), body as iPost);

  if (!updated) {
    throw new AppError("Update failed!", 500);
  }

  res.status(200).json({
    status: "success",
    message: "post has been updated successfully!",
  });
});

export const deletePost = captureAsyncError(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleted = await postService.deletePost(Number(id));

  if (!deleted) {
    throw new AppError("Delete failed!", 500);
  }

  res.status(200).json({
    status: "success",
    message: "post has been deleted successfully!",
  });
});

export const reload = captureAsyncError(async (req: Request, res: Response) => {
  await postService.reloadPosts();

  res.redirect("/?success=1");
});
