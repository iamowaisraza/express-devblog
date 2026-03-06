import fs from "fs";
import { join } from "path";

// Data Files👇🏻
export let posts = JSON.parse(fs.readFileSync(join(process.cwd(), "data", "posts.json"), "utf-8")) || [];

export const originalPosts =
  JSON.parse(fs.readFileSync(join(process.cwd(), "data", "original-posts.json"), "utf-8")) || [];

export const reloadPost = () => {
  posts = JSON.parse(JSON.stringify(originalPosts));
};
