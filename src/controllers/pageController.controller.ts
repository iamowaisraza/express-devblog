import { Request, Response } from "express";
import iPost from "../types/iPosts";
import captureAsyncError from "../utils/captureAsyncError";
import { posts } from "../utils/filesReader";

// Helper function to truncate content
const truncateContent = (content: string, limit: number = 110): string => {
  return content.length > limit ? content.slice(0, limit) + "..." : content;
};

// Helper function to format date
const formatDate = (date: string | Date): string => {
  return new Date(date).toDateString();
};

export const home = captureAsyncError(async (req: Request, res: Response) => {
  const formattedPosts = posts.map((post: iPost) => ({
    ...post,
    content: truncateContent(post.content),
    createdAt: formatDate(post.createdAt),
  }));

  res.render("home", { posts: formattedPosts });
});

export const detail = captureAsyncError(async (req: Request, res: Response) => {
  const postID = Number(req.params.id);
  const post = posts.find((p: iPost) => p.id === postID);

  if (!post) return notFound(req, res);

  res.render("detail", {
    id: post.id,
    title: post.title,
    author: post.author,
    content: post.content,
    createdAt: formatDate(post.createdAt),
    views: post.views,
  });
});

export const create = captureAsyncError(async (req: Request, res: Response) => {
  res.render("create-blog-page");
});

export const edit = captureAsyncError(async (req: Request, res: Response) => {
  const postID = Number(req.params.id);
  const post = posts.find((p: iPost) => p.id === Number(postID));

  if (!post) return notFound(req, res);

  res.render("edit-blog-page", {
    id: post.id,
    title: post.title,
    author: post.author,
    content: post.content,
  });
});

export const notFound = (req: Request, res: Response) => {
  res.status(404).render("not-found");
};
