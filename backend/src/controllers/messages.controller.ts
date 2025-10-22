import { Request, Response } from "express";
import { getMessagesByChat, getMessagesByChannel, getMessageById } from "../services/messages.service.ts";
import { catchAsync } from "../utils/catchAsync.ts";
import { ApiResponseHelper } from "../utils/responceHelper.ts";

export const getChatMessages = catchAsync(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const userId = (req as any).user?.sub;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;

  const result = await getMessagesByChat(chatId, userId, page, limit);

  res.status(200).json(ApiResponseHelper.success(result, "Messages retrieved successfully"));
});

export const getChannelMessages = catchAsync(async (req: Request, res: Response) => {
  const { channelId } = req.params;
  const userId = (req as any).user?.sub;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;

  const result = await getMessagesByChannel(channelId, userId, page, limit);

  res.status(200).json(ApiResponseHelper.success(result, "Messages retrieved successfully"));
});

export const getMessage = catchAsync(async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const userId = (req as any).user?.sub;

  const message = await getMessageById(messageId, userId);

  res.status(200).json(ApiResponseHelper.success(message, "Message retrieved successfully"));
});
