import { MessageSquare } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatServices } from "../services";
import { ChatHeader, MessageList, MessageInput, LoadingState, NotFoundState } from "../components";

interface ChatPageProps {
  chatId: string;
}

export function ChatPage({ chatId }: ChatPageProps) {
  const queryClient = useQueryClient();

  // Fetch chat details
  const { data: chat, isLoading: chatLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => chatServices.getChatById(chatId),
    enabled: !!chatId,
  });

  // Fetch chat messages
  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ["chatMessages", chatId],
    queryFn: () => chatServices.getChatMessages(chatId),
    enabled: !!chatId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: chatServices.sendChatMessage,
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ["chatMessages", chatId] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      // You could show a toast notification here
    },
  });

  const handleSendMessage = (content: string) => {
    if (chatId) {
      sendMessageMutation.mutate({
        content,
        chatId: chatId,
      });
    }
  };

  if (chatLoading || messagesLoading) {
    return <LoadingState message="Loading chat..." />;
  }

  if (!chat) {
    return (
      <NotFoundState
        icon={<MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
        title="Chat not found"
        description="The chat you're looking for doesn't exist."
      />
    );
  }

  const messages = messagesData?.messages || [];
  const otherParticipant = chat.participants.find((p) => p.id !== "1"); // Assuming current user ID is "1"

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      <ChatHeader chat={chat} otherParticipant={otherParticipant} />

      <MessageList
        messages={messages}
        type="chat"
        emptyStateIcon={<MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-2" />}
        emptyStateText="No messages yet. Start the conversation!"
      />

      <MessageInput
        onSendMessage={handleSendMessage}
        placeholder="Type a message..."
        disabled={sendMessageMutation.isPending}
        isLoading={sendMessageMutation.isPending}
      />
    </div>
  );
}
