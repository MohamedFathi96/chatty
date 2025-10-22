// import { apiClient } from "@/lib/axios"; // Will be used when implementing real API calls
import type {
  Chat,
  Channel,
  Message,
  ChatsResponse,
  ChannelsResponse,
  MessagesResponse,
  CreateChatRequest,
  CreateChannelRequest,
  SendMessageRequest,
} from "./types";

// Mock data for development - replace with real API calls
const mockChats: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    unread: 2,
    avatar: "JD",
    participants: [
      { id: "1", name: "You", avatar: "ME" },
      { id: "2", name: "John Doe", avatar: "JD", status: "online" },
    ],
    status: "online",
    createdAt: "2024-10-20T10:00:00Z",
    updatedAt: "2024-10-22T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "Thanks for the help!",
    unread: 0,
    avatar: "JS",
    participants: [
      { id: "1", name: "You", avatar: "ME" },
      { id: "3", name: "Jane Smith", avatar: "JS", status: "away" },
    ],
    status: "away",
    createdAt: "2024-10-19T15:30:00Z",
    updatedAt: "2024-10-21T14:20:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    lastMessage: "See you tomorrow",
    unread: 1,
    avatar: "MJ",
    participants: [
      { id: "1", name: "You", avatar: "ME" },
      { id: "4", name: "Mike Johnson", avatar: "MJ", status: "offline" },
    ],
    status: "offline",
    createdAt: "2024-10-18T09:15:00Z",
    updatedAt: "2024-10-22T08:45:00Z",
  },
];

const mockChannels: Channel[] = [
  {
    id: "1",
    name: "general",
    description: "General discussion",
    members: 24,
    unread: 3,
    topic: "Welcome to our team chat! Please keep discussions professional and friendly.",
    createdAt: "2024-10-15T10:00:00Z",
    updatedAt: "2024-10-22T10:30:00Z",
  },
  {
    id: "2",
    name: "random",
    description: "Random stuff",
    members: 18,
    unread: 0,
    createdAt: "2024-10-16T14:20:00Z",
    updatedAt: "2024-10-21T16:45:00Z",
  },
  {
    id: "3",
    name: "development",
    description: "Dev discussions",
    members: 12,
    unread: 5,
    topic: "Development discussions, code reviews, and technical questions.",
    createdAt: "2024-10-17T11:30:00Z",
    updatedAt: "2024-10-22T09:15:00Z",
  },
];

const mockChatMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      content: "Hey there! How are you doing?",
      sender: { id: "2", name: "John Doe", avatar: "JD" },
      timestamp: "2024-10-22T10:30:00Z",
      isOwn: false,
      chatId: "1",
    },
    {
      id: "2",
      content: "I'm doing great! Just working on some new features. How about you?",
      sender: { id: "1", name: "You", avatar: "ME" },
      timestamp: "2024-10-22T10:32:00Z",
      isOwn: true,
      chatId: "1",
    },
    {
      id: "3",
      content: "That sounds awesome! I'd love to hear more about what you're building.",
      sender: { id: "2", name: "John Doe", avatar: "JD" },
      timestamp: "2024-10-22T10:35:00Z",
      isOwn: false,
      chatId: "1",
    },
    {
      id: "4",
      content: "Sure! It's a real-time chat application with channels and direct messages. Pretty excited about it!",
      sender: { id: "1", name: "You", avatar: "ME" },
      timestamp: "2024-10-22T10:37:00Z",
      isOwn: true,
      chatId: "1",
    },
  ],
};

const mockChannelMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      content: "Welcome everyone to the general channel! 🎉",
      sender: { id: "1", name: "Alice Johnson", avatar: "AJ" },
      timestamp: "2024-10-22T09:00:00Z",
      isOwn: false,
      channelId: "1",
    },
    {
      id: "2",
      content: "Thanks Alice! Excited to be here.",
      sender: { id: "2", name: "Bob Smith", avatar: "BS" },
      timestamp: "2024-10-22T09:15:00Z",
      isOwn: false,
      channelId: "1",
    },
    {
      id: "3",
      content: "Hey everyone! Just joined the team. Looking forward to working with you all! 😊",
      sender: { id: "3", name: "You", avatar: "ME" },
      timestamp: "2024-10-22T10:00:00Z",
      isOwn: true,
      channelId: "1",
    },
    {
      id: "4",
      content: "Welcome to the team! If you have any questions, feel free to ask here.",
      sender: { id: "1", name: "Alice Johnson", avatar: "AJ" },
      timestamp: "2024-10-22T10:05:00Z",
      isOwn: false,
      channelId: "1",
    },
    {
      id: "5",
      content: "Does anyone know when the next team meeting is scheduled?",
      sender: { id: "4", name: "Carol Davis", avatar: "CD" },
      timestamp: "2024-10-22T10:30:00Z",
      isOwn: false,
      channelId: "1",
    },
    {
      id: "6",
      content: "It's scheduled for Friday at 2 PM. I'll send out calendar invites shortly.",
      sender: { id: "3", name: "You", avatar: "ME" },
      timestamp: "2024-10-22T10:32:00Z",
      isOwn: true,
      channelId: "1",
    },
  ],
};

// Chat Services
export const chatServices = {
  // Get all chats for the current user
  getChats: async (): Promise<ChatsResponse> => {
    try {
      // In production, this would be:
      // const response = await apiClient.get('/chats');
      // return response.data;

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
      return {
        chats: mockChats,
        total: mockChats.length,
      };
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  },

  // Get a specific chat by ID
  getChatById: async (chatId: string): Promise<Chat | null> => {
    try {
      // In production:
      // const response = await apiClient.get(`/chats/${chatId}`);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockChats.find((chat) => chat.id === chatId) || null;
    } catch (error) {
      console.error("Error fetching chat:", error);
      throw error;
    }
  },

  // Create a new chat
  createChat: async (data: CreateChatRequest): Promise<Chat> => {
    try {
      // In production:
      // const response = await apiClient.post('/chats', data);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 400));
      const newChat: Chat = {
        id: Date.now().toString(),
        name: `New Chat ${Date.now()}`,
        lastMessage: "",
        unread: 0,
        avatar: "NC",
        participants: [
          { id: "1", name: "You", avatar: "ME" },
          { id: data.participantId, name: "New User", avatar: "NU" },
        ],
        status: "online",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockChats.unshift(newChat);
      return newChat;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  },

  // Get messages for a specific chat
  getChatMessages: async (chatId: string, _page = 1, _limit = 50): Promise<MessagesResponse> => {
    try {
      // In production:
      // const response = await apiClient.get(`/chats/${chatId}/messages?page=${page}&limit=${limit}`);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 300));
      const messages = mockChatMessages[chatId] || [];
      return {
        messages,
        total: messages.length,
        hasMore: false,
      };
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw error;
    }
  },

  // Send a message to a chat
  sendChatMessage: async (data: SendMessageRequest): Promise<Message> => {
    try {
      // In production:
      // const response = await apiClient.post(`/chats/${data.chatId}/messages`, data);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 200));
      const newMessage: Message = {
        id: Date.now().toString(),
        content: data.content,
        sender: { id: "1", name: "You", avatar: "ME" },
        timestamp: new Date().toISOString(),
        isOwn: true,
        chatId: data.chatId,
      };

      if (data.chatId && mockChatMessages[data.chatId]) {
        mockChatMessages[data.chatId].push(newMessage);
      }

      return newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};

// Channel Services
export const channelServices = {
  // Get all channels for the current user
  getChannels: async (): Promise<ChannelsResponse> => {
    try {
      // In production:
      // const response = await apiClient.get('/channels');
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        channels: mockChannels,
        total: mockChannels.length,
      };
    } catch (error) {
      console.error("Error fetching channels:", error);
      throw error;
    }
  },

  // Get a specific channel by ID
  getChannelById: async (channelId: string): Promise<Channel | null> => {
    try {
      // In production:
      // const response = await apiClient.get(`/channels/${channelId}`);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockChannels.find((channel) => channel.id === channelId) || null;
    } catch (error) {
      console.error("Error fetching channel:", error);
      throw error;
    }
  },

  // Create a new channel
  createChannel: async (data: CreateChannelRequest): Promise<Channel> => {
    try {
      // In production:
      // const response = await apiClient.post('/channels', data);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 400));
      const newChannel: Channel = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        members: 1,
        unread: 0,
        topic: data.topic,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockChannels.unshift(newChannel);
      return newChannel;
    } catch (error) {
      console.error("Error creating channel:", error);
      throw error;
    }
  },

  // Get messages for a specific channel
  getChannelMessages: async (channelId: string, _page = 1, _limit = 50): Promise<MessagesResponse> => {
    try {
      // In production:
      // const response = await apiClient.get(`/channels/${channelId}/messages?page=${page}&limit=${limit}`);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 300));
      const messages = mockChannelMessages[channelId] || [];
      return {
        messages,
        total: messages.length,
        hasMore: false,
      };
    } catch (error) {
      console.error("Error fetching channel messages:", error);
      throw error;
    }
  },

  // Send a message to a channel
  sendChannelMessage: async (data: SendMessageRequest): Promise<Message> => {
    try {
      // In production:
      // const response = await apiClient.post(`/channels/${data.channelId}/messages`, data);
      // return response.data;

      await new Promise((resolve) => setTimeout(resolve, 200));
      const newMessage: Message = {
        id: Date.now().toString(),
        content: data.content,
        sender: { id: "1", name: "You", avatar: "ME" },
        timestamp: new Date().toISOString(),
        isOwn: true,
        channelId: data.channelId,
      };

      if (data.channelId && mockChannelMessages[data.channelId]) {
        mockChannelMessages[data.channelId].push(newMessage);
      }

      return newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};
