import { Router } from "express";
import authRoutes from "./auth.routes.ts";

const router = Router();

// Health check endpoint for Docker
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "chatty-backend",
  });
});

router.use("/auth", authRoutes);

export default router;
