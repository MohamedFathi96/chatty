import { createFileRoute } from "@tanstack/react-router";
import { ChannelPage } from "@/features/chatting/pages";

export const Route = createFileRoute("/_autherized/_chat/channels/$id")({
  component: ChannelPageWrapper,
});

function ChannelPageWrapper() {
  const { id } = Route.useParams();
  return <ChannelPage channelId={id} />;
}