import { Link } from "@tanstack/react-router";
import { MessageSquare, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatsList } from "./ChatsList";
import { ChannelsList } from "./ChannelsList";

interface ChatSidebarProps {
  activeSection: "chats" | "channels";
}

export function ChatSidebar({ activeSection }: ChatSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header with tabs */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <Link
            to="/chats"
            className={cn(
              "flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              activeSection === "chats" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chats
          </Link>
          <Link
            to="/channels"
            className={cn(
              "flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              activeSection === "channels" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            <Radio className="w-4 h-4 mr-2" />
            Channels
          </Link>
        </div>
      </div>

      {/* Content based on active section */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === "chats" && <ChatsList />}
        {activeSection === "channels" && <ChannelsList />}
      </div>
    </div>
  );
}
