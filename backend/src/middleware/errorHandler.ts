import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger.js";
import { AppError } from "../errors/AppError.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError("Route not found", 404));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error(err.message, { stack: err.stack });
    } else {
      logger.warn(err.message);
    }
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  // Unknown error
  const error = err as Error;
  logger.error("Unexpected error", { message: error?.message, stack: error?.stack });
  return res.status(500).json({ success: false, message: "Internal server error" });
}
