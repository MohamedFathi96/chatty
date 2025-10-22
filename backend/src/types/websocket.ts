import { Socket } from "socket.io";
import { IMessageDocument } from "../models/Message.ts";

export interface AuthenticatedSocket extends Socket {
  userId?: string;
  chatId?: string;
  channelId?: string;
}

export interface ServerToClientEvents {
  // Chat events
  "message:new": (message: IMessageDocument) => void;
  "message:updated": (message: IMessageDocument) => void;
  "message:deleted": (messageId: string) => void;
  
  // User events
  "user:typing": (data: { userId: string; userName: string }) => void;
  "user:stop-typing": (data: { userId: string }) => void;
  "user:joined": (data: { userId: string; userName: string }) => void;
  "user:left": (data: { userId: string; userName: string }) => void;
  
  // Connection events
  "connection:error": (error: string) => void;
}

export interface ClientToServerEvents {
  // Connection events
  "join:chat": (chatId: string) => void;
  "leave:chat": (chatId: string) => void;
  "join:channel": (channelId: string) => void;
  "leave:channel": (channelId: string) => void;
  
  // Typing events
  "typing:start": (data: { chatId?: string; channelId?: string }) => void;
  "typing:stop": (data: { chatId?: string; channelId?: string }) => void;
}

export interface InterServerEvents {
  // For scaling across multiple servers (future use)
}

export interface SocketData {
  userId: string;
  userName: string;
}
