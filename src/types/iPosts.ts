import { RowDataPacket } from "mysql2";

export interface iPost {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  views: number;
}

export interface iCreatePost {
  title: string;
  content: string;
  author: string;
}

export interface iDBPost extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  views: number;
}

export interface ValidatedParams {
  params: { id: number };
}
