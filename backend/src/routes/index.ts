import { Router } from "express";
import authRoutes from "./auth.routes.ts";
import usersRoutes from "./users.routes.ts";
import chatsRoutes from "./chats.routes.ts";
import messagesRoutes from "./messages.routes.ts";
import { authMiddleware } from "@/lib/jwt.ts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, usersRoutes);
router.use("/chats", authMiddleware, chatsRoutes);
router.use("/messages", authMiddleware, messagesRoutes);

export default router;
