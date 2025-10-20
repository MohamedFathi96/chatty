import type { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await registerUser(req.body);
  res.status(201).json({ success: true, data: result });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await loginUser(req.body);
  res.status(200).json({ success: true, data: result });
});
