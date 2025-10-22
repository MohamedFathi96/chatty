import type { SuccessResponse } from "@/types/api.type";

export type ChatsResponse = SuccessResponse<{
  chats: Array<{
    id: string;
    participant: {
      _id: string;
      email: string;
      name: string;
    };
    lastMessage: string;
    lastMessageAt: string;
  }>;
}>;

export type ChatMessagesResponse = SuccessResponse<{
  messages: Array<{
    id: string;
    content: string;
    senderId: {
      id: string;
      name: string;
      email: string;
    };
  }>;
}>;
