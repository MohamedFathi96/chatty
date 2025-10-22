import { createFileRoute } from "@tanstack/react-router";
import { Radio } from "lucide-react";

export const Route = createFileRoute("/_autherized/channels")({
  component: ChannelsPage,
});

function ChannelsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Radio className="w-7 h-7 mr-3 text-indigo-600" />
          Channels
        </h1>
        <p className="mt-2 text-sm text-gray-600">Join and participate in group channels</p>
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Radio className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No channels yet</h3>
          <p className="text-gray-500">Join or create a channel to get started</p>
        </div>
      </div>
    </div>
  );
}
