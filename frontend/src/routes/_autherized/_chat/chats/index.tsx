import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_autherized/_chat/chats/")({
  component: ChatsPage,
});

function ChatsPage() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <MessageSquare className="w-7 h-7 mr-3 text-indigo-600" />
          Select a Chat
        </h1>
        <p className="mt-2 text-sm text-gray-600">Choose a conversation from the sidebar to start chatting</p>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No chat selected</h3>
          <p className="text-gray-500">Select a chat from the sidebar to start messaging</p>
        </div>
      </div>
    </div>
  );
}
