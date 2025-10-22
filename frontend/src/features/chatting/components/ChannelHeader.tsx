import { Hash, MoreVertical, Users } from "lucide-react";
import type { Channel } from "../types";

interface ChannelHeaderProps {
  channel: Channel;
}

export function ChannelHeader({ channel }: ChannelHeaderProps) {
  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Hash className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 flex items-center">#{channel.name}</h1>
            <p className="text-sm text-gray-600 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {channel.members} members
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Channel Topic */}
      {channel.topic && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Topic:</span> {channel.topic}
          </p>
        </div>
      )}
    </div>
  );
}
