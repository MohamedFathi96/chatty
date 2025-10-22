import { createFileRoute } from "@tanstack/react-router";
import { ChatLayout } from "@/components/layout/ChatLayout";

export const Route = createFileRoute("/_autherized/_chat")({
  component: ChatLayout,
});