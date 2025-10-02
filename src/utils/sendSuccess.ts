import { Response } from "express";

interface SuccessResponseOptions<T> {
  res: Response;
  message?: string;
  data?: T;
  statusCode?: number;
}

export const sendSuccess = <T>({
  res,
  message = "Success",
  data,
  statusCode = 200,
}: SuccessResponseOptions<T>) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};
