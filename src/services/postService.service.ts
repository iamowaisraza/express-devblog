import fs from "fs/promises";
import { join } from "path";
import iPost from "../types/iPosts";
import { posts, originalPosts } from "../utils/filesReader";

const DATA_FILE = join(process.cwd(), "data", "posts.json");

const generateUniqueId = (): number => {
  return Number(
    Date.now().toString() +
      Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, "0"),
  );
};

export const getAllPosts = (): iPost[] => {
  return posts;
};

export const getPostById = (id: number): iPost | undefined => {
  return posts.find((post: iPost) => post.id === id);
};

export const createPost = async (data: any): Promise<iPost> => {
  const newPost: iPost = {
    id: generateUniqueId(),
    title: data.title,
    content: data.content,
    author: data.author,
    createdAt: new Date().toISOString(),
    views: 0,
  };

  posts.push(newPost);

  await savePosts();

  return newPost;
};

export const updatePost = async (id: number, data: iPost): Promise<iPost | null> => {
  const index = posts.findIndex((post: iPost) => post.id === id);

  if (index === -1) return null;

  const updatedPost: iPost = {
    ...posts[index],
    title: data.title,
    content: data.content,
    author: data.author,
  };

  posts[index] = updatedPost;

  await savePosts();

  return updatedPost;
};

export const deletePost = async (id: number): Promise<boolean> => {
  const index = posts.findIndex((post: iPost) => post.id === id);

  if (index === -1) return false;

  posts.splice(index, 1);

  await savePosts();

  return true;
};

export const reloadPosts = async (): Promise<void> => {
  posts.splice(0, posts.length, ...originalPosts);

  await fs.writeFile(DATA_FILE, JSON.stringify(originalPosts));
};

const savePosts = async () => {
  await fs.writeFile(DATA_FILE, JSON.stringify(posts));
};
