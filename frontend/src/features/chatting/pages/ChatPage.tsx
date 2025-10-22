import { useMessages } from "../services/chats";

export const ChatPage = ({ chatId }: { chatId: string }) => {
  const { data: messagesData, isLoading: messagesLoading } = useMessages(chatId);

  if (messagesLoading) return <div>Loading...</div>;
  if (!messagesData) return <div>No messages found</div>;

  const messages = messagesData.data.messages;

  return (
    <div>
      <div>
        ChatPage {chatId} Messages: {messages.length}
      </div>
      <div>Messages: {messages.length}</div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
    </div>
  );
};
