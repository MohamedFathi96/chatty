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
