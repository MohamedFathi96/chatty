import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { apiClient, ApiError } from "../../lib/axios";
import type { LoginRequest, RegisterRequest, AuthResponse } from "./types";

// API functions
export const authApi = {
  login: async (data: LoginRequest): Promise<{ data: AuthResponse }> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<{ data: AuthResponse }> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },
};

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      login(response.data.user, response.data.token);
    },
    onError: (error: ApiError) => {
      console.error("Login failed:", error.message);
    },
  });
}

export function useRegister() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      login(response.data.user, response.data.token);
    },
    onError: (error: ApiError) => {
      console.error("Registration failed:", error.message);
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();

  return {
    logout,
  };
}
