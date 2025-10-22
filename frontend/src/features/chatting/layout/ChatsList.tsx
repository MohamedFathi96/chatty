import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useChats } from "../services/chats";

export function ChatsList() {
  // Fetch chats
  const { data: chatsData, isLoading: chatsLoading } = useChats();
  const chats = chatsData?.chats || [];

  return (
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
                    <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1 ml-2">{chat.unread}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">{chat.lastMessage}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
