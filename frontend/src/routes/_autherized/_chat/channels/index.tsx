import { createFileRoute } from "@tanstack/react-router";
import { Radio, Hash } from "lucide-react";

export const Route = createFileRoute("/_autherized/_chat/channels/")({
  component: ChannelsPage,
});

function ChannelsPage() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Channel Header */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Radio className="w-7 h-7 mr-3 text-indigo-600" />
          Select a Channel
        </h1>
        <p className="mt-2 text-sm text-gray-600">Choose a channel from the sidebar to join the conversation</p>
      </div>

      {/* Main channel area */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Hash className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No channel selected</h3>
          <p className="text-gray-500">Select a channel from the sidebar to join the discussion</p>
        </div>
      </div>
    </div>
  );
}
