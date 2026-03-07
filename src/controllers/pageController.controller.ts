import { Request, Response } from "express";
import { ERROR_MESSAGES } from "../config/validation";
import { getPostByID, getPosts } from "../models/post.model";
import type { ValidatedParams, iPost } from "../types/iPosts";
import { AppError } from "../utils/appError";
import captureAsyncError from "../utils/captureAsyncError";
import { formatDate, truncateContent } from "../utils/helper";

export const home = captureAsyncError(async (_req: Request, res: Response) => {
  const posts = await getPosts();

  const formattedPosts = posts.map((post: iPost) => ({
    ...post,
    content: truncateContent(post.content),
    createdAt: formatDate(post.created_at),
  }));

  res.render("home", { posts: formattedPosts });
});

export const detail = captureAsyncError(async (req: Request, res: Response) => {
  const { id } = (req.validated as ValidatedParams).params;
  const post = await getPostByID(id);

  if (!post) {
    throw new AppError(ERROR_MESSAGES.POST_NOT_FOUND, 404);
  }

  return res.render("detail", {
    id: post.id,
    title: post.title,
    author: post.author,
    content: post.content,
    createdAt: formatDate(post.created_at),
    views: post.views,
  });
});

export const create = captureAsyncError(async (_req: Request, res: Response) => {
  res.render("create-blog-page");
});

export const edit = captureAsyncError(async (req: Request, res: Response) => {
  const { id } = (req.validated as ValidatedParams).params;
  const post = await getPostByID(id);

  if (!post) {
    throw new AppError(ERROR_MESSAGES.POST_NOT_FOUND, 404);
  }

  res.render("edit-blog-page", {
    id: post.id,
    title: post.title,
    author: post.author,
    content: post.content,
  });
});

export const notFound = (_req: Request, res: Response) => {
  res.status(404).render("not-found");
};
