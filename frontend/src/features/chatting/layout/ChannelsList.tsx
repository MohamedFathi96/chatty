import { Link } from "@tanstack/react-router";
import { Plus, Hash, User } from "lucide-react";
import { useChannels } from "../services/channels";

export function ChannelsList() {
  // Fetch channels
  const { data: channelsData, isLoading: channelsLoading } = useChannels();
  const channels = channelsData?.data?.channels || [];

  return (
    <div className="p-4">
      {/* New Channel Button */}
      <button className="w-full flex items-center justify-center px-4 py-2 mb-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
        <Plus className="w-4 h-4 mr-2" />
        Create Channel
      </button>

      {/* Channels List */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Channels</h3>
        {channelsLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No channels yet</p>
          </div>
        ) : (
          channels.map((channel) => (
            <Link
              key={channel.id}
              to="/channels/$id"
              params={{ id: channel.id }}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                <Hash className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">#{channel.name}</p>
                  {channel.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1 ml-2">
                      {channel.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <User className="w-3 h-3 text-gray-400 mr-1" />
                  <p className="text-xs text-gray-500">{channel.members} members</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
