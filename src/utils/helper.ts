import { VALIDATION_LIMITS } from "../config/validation";
import type { Request } from "express";
import { iCreatePost } from "../types/iPosts";

export const truncateContent = (
  content: string,
  limit: number = VALIDATION_LIMITS.POST_PREVIEW.TRUNCATE_LENGTH,
): string => {
  return content.length > limit ? content.slice(0, limit) + "..." : content;
};

export const formatDate = (date: string): string => {
  return new Date(date).toDateString();
};

export const getValidatedData = (req: Request) => {
  return req.validated as { body: iCreatePost; params: { id: number } };
};
