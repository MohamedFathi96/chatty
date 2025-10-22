import { Router } from "express";
import {
  getChatMessages,
  getChannelMessages,
  getMessage,
  createChatMessageController,
  createChannelMessageController,
} from "../controllers/messages.controller.ts";
import { z } from "zod";
import { validate } from "../middleware/validate.ts";

const router = Router();

// Validation schemas
const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 50)),
});

const messageIdSchema = z.object({
  messageId: z.string().min(1, "Message ID is required"),
});

const chatIdSchema = z.object({
  chatId: z.string().min(1, "Chat ID is required"),
});

const channelIdSchema = z.object({
  channelId: z.string().min(1, "Channel ID is required"),
});

const createMessageSchema = z.object({
  text: z.string().min(1, "Message text is required").max(1000, "Message text too long"),
});

// Routes
router.get("/chat/:chatId", validate(chatIdSchema, "params"), validate(paginationSchema, "query"), getChatMessages);
router.post(
  "/chat/:chatId",
  validate(chatIdSchema, "params"),
  validate(createMessageSchema, "body"),
  createChatMessageController
);

router.get(
  "/channel/:channelId",
  validate(channelIdSchema, "params"),
  validate(paginationSchema, "query"),
  getChannelMessages
);
router.post(
  "/channel/:channelId",
  validate(channelIdSchema, "params"),
  validate(createMessageSchema, "body"),
  createChannelMessageController
);

router.get("/:messageId", validate(messageIdSchema, "params"), getMessage);

export default router;
