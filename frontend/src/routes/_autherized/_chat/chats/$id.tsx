import { createFileRoute } from "@tanstack/react-router";
import { ChatPage } from "@/features/chatting/pages";

export const Route = createFileRoute("/_autherized/_chat/chats/$id")({
  component: ChatPageWrapper,
});

function ChatPageWrapper() {
  const { id } = Route.useParams();
  return <ChatPage chatId={id} />;
}
