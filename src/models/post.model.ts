import { ResultSetHeader } from "mysql2";
import pool from "../config/db";
import { iCreatePost, iDBPost } from "../types/iPosts";

export const getPostByID = async (id: number): Promise<iDBPost | null> => {
  const query = "SELECT * FROM posts WHERE id = ?";
  const [rows] = await pool.query<iDBPost[]>(query, [id]);
  return rows[0] || null;
};

export const getPosts = async (): Promise<iDBPost[]> => {
  const query = "SELECT * FROM posts";
  const [rows] = await pool.query<iDBPost[]>(query);
  return rows;
};

export const createPost = async (data: iCreatePost) => {
  const { title, author, content } = data;

  const query = "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)";
  const [results] = await pool.query<ResultSetHeader>(query, [title, content, author]);

  return results?.insertId;
};

export const updatePost = async (id: number, data: iCreatePost) => {
  const { title, author, content } = data;

  const query = "UPDATE posts SET title = ?, content = ?, author = ? WHERE id = ?";
  const [result] = await pool.query<ResultSetHeader>(query, [title, content, author, id]);

  return result.affectedRows > 0;
};

export const deletePost = async (id: number) => {
  const query = "DELETE FROM posts WHERE id = ?";
  const [result] = await pool.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};
