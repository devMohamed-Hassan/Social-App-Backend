import { NextFunction, Request, Response } from "express";
import { AppError, ValidationError } from "../utils/AppError";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: Record<string, any> | undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    if (err instanceof ValidationError) {
      errors = err.details;
    }
  } 
 
  else if (err instanceof TokenExpiredError) {
    statusCode = 401;
    message = "Token expired";
  } else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid token.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};
