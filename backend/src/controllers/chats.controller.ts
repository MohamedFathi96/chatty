import type { Request, Response, NextFunction } from "express";
import { startDirectChat, getUserChats } from "../services/chats.service.ts";
import { catchAsync } from "../utils/catchAsync.ts";
import { ApiResponseHelper } from "../utils/responceHelper.ts";

export const startChat = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  const currentUserId = (req as any).user.sub;

  const result = await startDirectChat(currentUserId, userId);

  const statusCode = result.isNew ? 201 : 200;
  res.status(statusCode).json(ApiResponseHelper.success(result, result.message, statusCode));
});

export const getChats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const currentUserId = (req as any).user.sub; // From JWT middleware

  const chats = await getUserChats(currentUserId);

  res.status(200).json(ApiResponseHelper.success({ chats }, "Chats retrieved successfully"));
});
