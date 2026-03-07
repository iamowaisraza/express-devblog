import { z } from "zod";
import { VALIDATION_LIMITS, ERROR_MESSAGES } from "../config/validation";

export const postSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(VALIDATION_LIMITS.TITLE.MIN, ERROR_MESSAGES.TITLE_SHORT)
      .max(VALIDATION_LIMITS.TITLE.MAX, ERROR_MESSAGES.TITLE_LONG),
    content: z
      .string()
      .min(VALIDATION_LIMITS.CONTENT.MIN, ERROR_MESSAGES.CONTENT_SHORT)
      .max(VALIDATION_LIMITS.CONTENT.MAX, ERROR_MESSAGES.CONTENT_LONG),
    author: z
      .string()
      .min(VALIDATION_LIMITS.AUTHOR.MIN, ERROR_MESSAGES.AUTHOR_SHORT)
      .max(VALIDATION_LIMITS.AUTHOR.MAX, ERROR_MESSAGES.AUTHOR_LONG),
  }),
});

export const idSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(ERROR_MESSAGES.INVALID_ID),
  }),
});

export const editSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(VALIDATION_LIMITS.TITLE.MIN, ERROR_MESSAGES.TITLE_SHORT)
      .max(VALIDATION_LIMITS.TITLE.MAX, ERROR_MESSAGES.TITLE_LONG),
    content: z
      .string()
      .min(VALIDATION_LIMITS.CONTENT.MIN, ERROR_MESSAGES.CONTENT_SHORT)
      .max(VALIDATION_LIMITS.CONTENT.MAX, ERROR_MESSAGES.CONTENT_LONG),
    author: z
      .string()
      .min(VALIDATION_LIMITS.AUTHOR.MIN, ERROR_MESSAGES.AUTHOR_SHORT)
      .max(VALIDATION_LIMITS.AUTHOR.MAX, ERROR_MESSAGES.AUTHOR_LONG),
  }),
  params: z.object({
    id: z.coerce.number().int().positive(ERROR_MESSAGES.INVALID_ID),
  }),
});
