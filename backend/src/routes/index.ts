import { Router } from "express";
import authRoutes from "./auth.routes.ts";
import usersRoutes from "./users.routes.ts";
import chatsRoutes from "./chats.routes.ts";
import { authMiddleware } from "@/lib/jwt.ts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, usersRoutes);
router.use("/chats", authMiddleware, chatsRoutes);

export default router;
