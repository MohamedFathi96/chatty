import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { ChatMessagesResponse, ChatsResponse } from "../types";

export function useChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async (): Promise<ChatsResponse> => {
      const response = await apiClient.get("/chats");
      return response.data;
    },
  });
}

export const useMessages = (chatId: string) => {
  return useQuery({
    queryKey: ["messages", "chat", chatId],
    queryFn: async (): Promise<ChatMessagesResponse> => {
      const response = await apiClient.get(`/messages/chat/${chatId}`);
      return response.data;
    },
  });
};
