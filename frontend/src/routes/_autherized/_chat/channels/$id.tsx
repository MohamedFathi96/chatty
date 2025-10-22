import { createFileRoute } from "@tanstack/react-router";
import { Hash, Send, MoreVertical, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_autherized/_chat/channels/$id")({
  component: ChannelPage,
});

// Mock messages data for channel
const mockChannelMessages = [
  {
    id: "1",
    content: "Welcome everyone to the general channel! 🎉",
    sender: { id: "1", name: "Alice Johnson", avatar: "AJ" },
    timestamp: "2024-10-22T09:00:00Z",
    isOwn: false,
  },
  {
    id: "2",
    content: "Thanks Alice! Excited to be here.",
    sender: { id: "2", name: "Bob Smith", avatar: "BS" },
    timestamp: "2024-10-22T09:15:00Z",
    isOwn: false,
  },
  {
    id: "3",
    content: "Hey everyone! Just joined the team. Looking forward to working with you all! 😊",
    sender: { id: "3", name: "You", avatar: "ME" },
    timestamp: "2024-10-22T10:00:00Z",
    isOwn: true,
  },
  {
    id: "4",
    content: "Welcome to the team! If you have any questions, feel free to ask here.",
    sender: { id: "1", name: "Alice Johnson", avatar: "AJ" },
    timestamp: "2024-10-22T10:05:00Z",
    isOwn: false,
  },
  {
    id: "5",
    content: "Does anyone know when the next team meeting is scheduled?",
    sender: { id: "4", name: "Carol Davis", avatar: "CD" },
    timestamp: "2024-10-22T10:30:00Z",
    isOwn: false,
  },
  {
    id: "6",
    content: "It's scheduled for Friday at 2 PM. I'll send out calendar invites shortly.",
    sender: { id: "3", name: "You", avatar: "ME" },
    timestamp: "2024-10-22T10:32:00Z",
    isOwn: true,
  },
];

function ChannelPage() {
  const { id } = Route.useParams();
  const [newMessage, setNewMessage] = useState("");

  // Mock channel data - in real app, this would come from context/API
  const channel = {
    id: id,
    name: "general",
    description: "General team discussions",
    members: 24,
    topic: "Welcome to our team chat! Please keep discussions professional and friendly.",
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would send the message to your API
      console.log("Sending message to channel:", newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Channel Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Hash className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 flex items-center">#{channel.name}</h1>
              <p className="text-sm text-gray-600 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {channel.members} members
              </p>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Topic */}
        {channel.topic && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Topic:</span> {channel.topic}
            </p>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockChannelMessages.map((message, index) => {
          const showDate =
            index === 0 || formatDate(message.timestamp) !== formatDate(mockChannelMessages[index - 1].timestamp);

          return (
            <div key={message.id}>
              {/* Date Separator */}
              {showDate && (
                <div className="flex items-center justify-center my-4">
                  <div className="bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-gray-600">{formatDate(message.timestamp)}</span>
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-white">{message.sender.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-sm font-medium text-gray-900">{message.sender.name}</span>
                    <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                  </div>
                  <div
                    className={`mt-1 px-3 py-2 rounded-lg ${
                      message.isOwn ? "bg-indigo-50 border border-indigo-200" : "bg-gray-50"
                    }`}
                  >
                    <p className="text-sm text-gray-900">{message.content}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message #${channel.name}`}
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
