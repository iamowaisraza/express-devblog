import "express";
import type { z } from "zod";

declare global {
  namespace Express {
    interface Request {
      validated?: unknown;
    }
  }
}
