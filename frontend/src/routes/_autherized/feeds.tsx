import { createFileRoute } from "@tanstack/react-router";
import { Rss } from "lucide-react";

export const Route = createFileRoute("/_autherized/feeds")({
  component: FeedsPage,
});

function FeedsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Rss className="w-7 h-7 mr-3 text-indigo-600" />
          Feeds
        </h1>
        <p className="mt-2 text-sm text-gray-600">Stay updated with your activity feeds</p>
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rss className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
          <p className="text-gray-500">Your activity feed will appear here</p>
        </div>
      </div>
    </div>
  );
}
