import { Router } from "express";
import { startChat, getChats } from "../controllers/chats.controller.ts";
import { z } from "zod";
import { validate } from "../middleware/validate.ts";

const router = Router();

// Validation schemas
const startChatSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

// Routes
router.post("/start", validate(startChatSchema), startChat);
router.get("/", getChats);

export default router;
