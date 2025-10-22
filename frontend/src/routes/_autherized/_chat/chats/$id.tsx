import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, Send, MoreVertical } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_autherized/_chat/chats/$id")({
  component: ChatPage,
});

// Mock messages data
const mockMessages = [
  {
    id: "1",
    content: "Hey there! How are you doing?",
    sender: { id: "2", name: "John Doe", avatar: "JD" },
    timestamp: "2024-10-22T10:30:00Z",
    isOwn: false,
  },
  {
    id: "2",
    content: "I'm doing great! Just working on some new features. How about you?",
    sender: { id: "1", name: "You", avatar: "ME" },
    timestamp: "2024-10-22T10:32:00Z",
    isOwn: true,
  },
  {
    id: "3",
    content: "That sounds awesome! I'd love to hear more about what you're building.",
    sender: { id: "2", name: "John Doe", avatar: "JD" },
    timestamp: "2024-10-22T10:35:00Z",
    isOwn: false,
  },
  {
    id: "4",
    content: "Sure! It's a real-time chat application with channels and direct messages. Pretty excited about it!",
    sender: { id: "1", name: "You", avatar: "ME" },
    timestamp: "2024-10-22T10:37:00Z",
    isOwn: true,
  },
];

function ChatPage() {
  const { id } = Route.useParams();
  const [newMessage, setNewMessage] = useState("");

  // Mock user data - in real app, this would come from context/API
  const chatUser = { id: "2", name: "John Doe", avatar: "JD", status: "online" };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would send the message to your API
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-white">{chatUser.avatar}</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{chatUser.name}</h1>
            <p className="text-sm text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {chatUser.status}
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((message) => (
          <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-xs lg:max-w-md ${message.isOwn ? "flex-row-reverse" : "flex-row"}`}>
              {!message.isOwn && (
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                  <span className="text-xs font-semibold text-white">{message.sender.avatar}</span>
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.isOwn ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? "text-indigo-200" : "text-gray-500"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
