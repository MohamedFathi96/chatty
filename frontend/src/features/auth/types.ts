import type { User } from "../../types/app.type";

export type AuthResponse = {
  user: User;
  token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};
