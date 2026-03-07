import type { Request, Response } from "express";
import { ERROR_MESSAGES } from "../config/validation";
import { createPost, deletePost, getPostByID, getPosts, updatePost } from "../models/post.model";
import { AppError } from "../utils/appError";
import captureAsyncError from "../utils/captureAsyncError";
import { getValidatedData } from "../utils/helper";
import { successResponse } from "../utils/response";

export const getPost = captureAsyncError(async (req: Request, res: Response) => {
  const { params } = getValidatedData(req);
  const { id } = params;
  const post = await getPostByID(id);

  if (!post) {
    throw new AppError(ERROR_MESSAGES.POST_NOT_FOUND, 404);
  }

  successResponse(res, 200, "Post retrieved successfully", post);
});

export const getAllPosts = captureAsyncError(async (_req: Request, res: Response) => {
  const posts = await getPosts();

  successResponse(res, 200, "Posts retrieved successfully", posts);
});

export const addPost = captureAsyncError(async (req: Request, res: Response) => {
  const { body } = getValidatedData(req);
  const { title, content, author } = body;

  const postId = await createPost({ title, content, author });
  const post = await getPostByID(postId);

  successResponse(res, 201, "Post added successfully", post);
});

export const editPost = captureAsyncError(async (req: Request, res: Response) => {
  const validated = getValidatedData(req);
  const { title, content, author } = validated.body;
  const { id } = validated.params;

  const updated = await updatePost(id, { title, author, content });

  if (!updated) {
    throw new AppError(ERROR_MESSAGES.POST_NOT_FOUND, 404);
  }

  const updatedPost = await getPostByID(id);

  successResponse(res, 200, "Post updated successfully", updatedPost);
});

export const removePost = captureAsyncError(async (req: Request, res: Response) => {
  const { params } = getValidatedData(req);
  const { id } = params;

  const deleted = await deletePost(id);

  if (!deleted) {
    throw new AppError(ERROR_MESSAGES.POST_NOT_FOUND, 404);
  }

  successResponse(res, 204, "Post removed successfully");
});
