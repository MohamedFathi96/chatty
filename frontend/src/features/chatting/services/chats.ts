import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { ChatsResponse } from "../types";

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async (): Promise<ChatsResponse> => {
      const response = await apiClient.get("/chats");
      return response.data;
    },
  });
}
