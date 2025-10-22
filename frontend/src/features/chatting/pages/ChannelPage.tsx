import { Hash } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { channelServices } from "../services";
import { ChannelHeader, MessageList, MessageInput, LoadingState, NotFoundState } from "../components";

interface ChannelPageProps {
  channelId: string;
}

export function ChannelPage({ channelId }: ChannelPageProps) {
  const queryClient = useQueryClient();

  // Fetch channel details
  const { data: channel, isLoading: channelLoading } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => channelServices.getChannelById(channelId),
    enabled: !!channelId,
  });

  // Fetch channel messages
  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ["channelMessages", channelId],
    queryFn: () => channelServices.getChannelMessages(channelId),
    enabled: !!channelId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: channelServices.sendChannelMessage,
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ["channelMessages", channelId] });
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      // You could show a toast notification here
    },
  });

  const handleSendMessage = (content: string) => {
    if (channelId) {
      sendMessageMutation.mutate({
        content,
        channelId: channelId,
      });
    }
  };

  if (channelLoading || messagesLoading) {
    return <LoadingState message="Loading channel..." />;
  }

  if (!channel) {
    return (
      <NotFoundState
        icon={<Hash className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
        title="Channel not found"
        description="The channel you're looking for doesn't exist."
      />
    );
  }

  const messages = messagesData?.messages || [];

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      <ChannelHeader channel={channel} />

      <MessageList
        messages={messages}
        type="channel"
        emptyStateIcon={<Hash className="w-12 h-12 text-gray-400 mx-auto mb-2" />}
        emptyStateText="No messages yet. Start the conversation!"
      />

      <MessageInput
        onSendMessage={handleSendMessage}
        placeholder={`Message #${channel.name}`}
        disabled={sendMessageMutation.isPending}
        isLoading={sendMessageMutation.isPending}
      />
    </div>
  );
}
