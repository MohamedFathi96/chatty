export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  status?: 'online' | 'offline' | 'away';
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: string;
  isOwn: boolean;
  chatId?: string;
  channelId?: string;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  unread: number;
  avatar: string;
  participants: User[];
  status?: 'online' | 'offline' | 'away';
  createdAt: string;
  updatedAt: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  members: number;
  unread: number;
  topic?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChatRequest {
  participantId: string;
}

export interface CreateChannelRequest {
  name: string;
  description: string;
  topic?: string;
}

export interface SendMessageRequest {
  content: string;
  chatId?: string;
  channelId?: string;
}

export interface ChatsResponse {
  chats: Chat[];
  total: number;
}

export interface ChannelsResponse {
  channels: Channel[];
  total: number;
}

export interface MessagesResponse {
  messages: Message[];
  total: number;
  hasMore: boolean;
}
