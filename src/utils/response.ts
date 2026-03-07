import { Response } from "express";

export const successResponse = (res: Response, statusCode: number, message: string, data: unknown = null) => {
  if (statusCode === 204) {
    return res.status(204).send();
  }

  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
