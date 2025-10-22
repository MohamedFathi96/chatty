import { Link } from "@tanstack/react-router";
import { MessageSquare, Radio, Plus, Hash, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { chatServices, channelServices } from "@/features/chatting/services";

interface ChatSidebarProps {
  activeSection: "chats" | "channels";
}

export function ChatSidebar({ activeSection }: ChatSidebarProps) {
  // Fetch chats
  const { data: chatsData, isLoading: chatsLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: chatServices.getChats,
    enabled: activeSection === "chats",
  });

  // Fetch channels
  const { data: channelsData, isLoading: channelsLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: channelServices.getChannels,
    enabled: activeSection === "channels",
  });

  const chats = chatsData?.chats || [];
  const channels = channelsData?.channels || [];

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
        {activeSection === "chats" && (
          <div className="p-4">
            {/* New Chat Button */}
            <button className="w-full flex items-center justify-center px-4 py-2 mb-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </button>

            {/* Chats List */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Chats</h3>
              {chatsLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : chats.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No chats yet</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <Link
                    key={chat.id}
                    to="/chats/$id"
                    params={{ id: chat.id }}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-sm font-semibold text-white">{chat.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                        {chat.unread > 0 && (
                          <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">{chat.lastMessage}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {activeSection === "channels" && (
          <div className="p-4">
            {/* New Channel Button */}
            <button className="w-full flex items-center justify-center px-4 py-2 mb-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Create Channel
            </button>

            {/* Channels List */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Channels</h3>
              {channelsLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : channels.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No channels yet</p>
                </div>
              ) : (
                channels.map((channel) => (
                  <Link
                    key={channel.id}
                    to="/channels/$id"
                    params={{ id: channel.id }}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                      <Hash className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">#{channel.name}</p>
                        {channel.unread > 0 && (
                          <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                            {channel.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <User className="w-3 h-3 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">{channel.members} members</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
