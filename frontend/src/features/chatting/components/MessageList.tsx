import type { Message } from "../types";

interface MessageListProps {
  messages: Message[];
  type: "chat" | "channel";
  emptyStateIcon: React.ReactNode;
  emptyStateText: string;
}

export function MessageList({ messages, type, emptyStateIcon, emptyStateText }: MessageListProps) {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {emptyStateIcon}
          <p className="text-gray-500">{emptyStateText}</p>
        </div>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
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
    );
  }

  // Channel layout
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const showDate = index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

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
  );
}
