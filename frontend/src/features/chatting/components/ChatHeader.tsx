import { MoreVertical } from "lucide-react";
import type { Chat } from "../types";

interface ChatHeaderProps {
  chat: Chat;
  otherParticipant?: {
    id: string;
    name: string;
    avatar: string;
    status?: "online" | "offline" | "away";
  };
}

export function ChatHeader({ chat, otherParticipant }: ChatHeaderProps) {
  return (
    <div className="border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-white">{otherParticipant?.avatar || chat.avatar}</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{otherParticipant?.name || chat.name}</h1>
          <p
            className={`text-sm flex items-center ${
              chat.status === "online" ? "text-green-600" : chat.status === "away" ? "text-yellow-600" : "text-gray-500"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                chat.status === "online" ? "bg-green-500" : chat.status === "away" ? "bg-yellow-500" : "bg-gray-400"
              }`}
            ></span>
            {chat.status || "offline"}
          </p>
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
}
