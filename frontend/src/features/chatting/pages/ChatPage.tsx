import { MessageCircle } from "lucide-react";
import { useMessages } from "../services/chats";
import { ChatHeader, MessageList, MessageInput, LoadingState, NotFoundState } from "../components";

export const ChatPage = ({ chatId }: { chatId: string }) => {
  const { data: messagesData, isLoading: messagesLoading } = useMessages(chatId);

  // Handle loading state
  if (messagesLoading) {
    return <LoadingState message="Loading messages..." />;
  }

  // Handle no data state
  if (!messagesData) {
    return (
      <NotFoundState
        icon={<MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
        title="No messages found"
        description="This chat doesn't exist or you don't have access to it."
      />
    );
  }

  const apiMessages = messagesData.data.messages;

  // Transform API messages to match MessageList component expectations
  const messages = apiMessages.map((msg) => ({
    id: msg.id,
    content: msg.content,
    timestamp: new Date().toISOString(), // API doesn't provide timestamp, using current time
    isOwn: false, // TODO: Compare with current user ID when available
    sender: {
      id: msg.senderId.id,
      name: msg.senderId.name,
      avatar: msg.senderId.name.charAt(0).toUpperCase(), // Generate avatar from first letter
    },
  }));

  // Mock chat data for header (in real app, this would come from a separate API call)
  const mockChat = {
    id: chatId,
    name: "Chat", // Would be determined from participants
    avatar: "C",
    status: "online" as const,
  };

  const handleSendMessage = (content: string) => {
    // TODO: Implement send message functionality
    console.log("Sending message:", content);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader chat={mockChat} />
      <MessageList
        messages={messages}
        type="chat"
        emptyStateIcon={<MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />}
        emptyStateText="No messages yet. Start the conversation!"
      />
      <MessageInput
        onSendMessage={handleSendMessage}
        placeholder="Type a message..."
        disabled={false}
        isLoading={false}
      />
    </div>
  );
};
