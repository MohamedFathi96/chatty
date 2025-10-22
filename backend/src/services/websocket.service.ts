import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";
import { config } from "../config/index.ts";
import { logger } from "../lib/logger.ts";
import { Chat } from "../models/Chat.ts";
import { Channel } from "../models/Channel.ts";
import { User } from "../models/User.ts";
import {
  AuthenticatedSocket,
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "../types/websocket.ts";

export class WebSocketService {
  private io: SocketIOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
  private connectedUsers: Map<string, Set<string>> = new Map(); // userId -> Set of socketIds

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"],
      },
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  private setupMiddleware() {
    // Authentication middleware
    this.io.use(async (socket: AuthenticatedSocket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace("Bearer ", "");
        
        if (!token) {
          return next(new Error("Authentication token required"));
        }

        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
        const user = await User.findById(decoded.userId).select("name email");
        
        if (!user) {
          return next(new Error("User not found"));
        }

        socket.userId = decoded.userId;
        socket.data.userId = decoded.userId;
        socket.data.userName = user.name;
        
        logger.info(`User ${user.name} connected via WebSocket`, { userId: decoded.userId, socketId: socket.id });
        next();
      } catch (error) {
        logger.error("WebSocket authentication failed", { error });
        next(new Error("Authentication failed"));
      }
    });
  }

  private setupEventHandlers() {
    this.io.on("connection", (socket: AuthenticatedSocket) => {
      const userId = socket.userId!;
      const userName = socket.data.userName;

      // Track connected user
      if (!this.connectedUsers.has(userId)) {
        this.connectedUsers.set(userId, new Set());
      }
      this.connectedUsers.get(userId)!.add(socket.id);

      // Handle joining a chat room
      socket.on("join:chat", async (chatId: string) => {
        try {
          // Verify user is a participant in the chat
          const chat = await Chat.findById(chatId);
          if (!chat) {
            socket.emit("connection:error", "Chat not found");
            return;
          }

          if (!chat.participants.some(p => p.toString() === userId)) {
            socket.emit("connection:error", "Access denied: You are not a participant in this chat");
            return;
          }

          // Leave previous chat room if any
          if (socket.chatId) {
            socket.leave(`chat:${socket.chatId}`);
          }

          // Join the new chat room
          socket.chatId = chatId;
          socket.join(`chat:${chatId}`);
          
          // Notify other participants that user joined
          socket.to(`chat:${chatId}`).emit("user:joined", { userId, userName });
          
          logger.info(`User ${userName} joined chat ${chatId}`, { userId, chatId, socketId: socket.id });
        } catch (error) {
          logger.error("Error joining chat", { error, userId, chatId });
          socket.emit("connection:error", "Failed to join chat");
        }
      });

      // Handle leaving a chat room
      socket.on("leave:chat", (chatId: string) => {
        if (socket.chatId === chatId) {
          socket.leave(`chat:${chatId}`);
          socket.to(`chat:${chatId}`).emit("user:left", { userId, userName });
          socket.chatId = undefined;
          logger.info(`User ${userName} left chat ${chatId}`, { userId, chatId, socketId: socket.id });
        }
      });

      // Handle joining a channel room
      socket.on("join:channel", async (channelId: string) => {
        try {
          // Verify user is a member of the channel
          const channel = await Channel.findById(channelId);
          if (!channel) {
            socket.emit("connection:error", "Channel not found");
            return;
          }

          if (!channel.members.some(m => m.toString() === userId)) {
            socket.emit("connection:error", "Access denied: You are not a member of this channel");
            return;
          }

          // Leave previous channel room if any
          if (socket.channelId) {
            socket.leave(`channel:${socket.channelId}`);
          }

          // Join the new channel room
          socket.channelId = channelId;
          socket.join(`channel:${channelId}`);
          
          // Notify other members that user joined
          socket.to(`channel:${channelId}`).emit("user:joined", { userId, userName });
          
          logger.info(`User ${userName} joined channel ${channelId}`, { userId, channelId, socketId: socket.id });
        } catch (error) {
          logger.error("Error joining channel", { error, userId, channelId });
          socket.emit("connection:error", "Failed to join channel");
        }
      });

      // Handle leaving a channel room
      socket.on("leave:channel", (channelId: string) => {
        if (socket.channelId === channelId) {
          socket.leave(`channel:${channelId}`);
          socket.to(`channel:${channelId}`).emit("user:left", { userId, userName });
          socket.channelId = undefined;
          logger.info(`User ${userName} left channel ${channelId}`, { userId, channelId, socketId: socket.id });
        }
      });

      // Handle typing events
      socket.on("typing:start", (data) => {
        const { chatId, channelId } = data;
        const room = chatId ? `chat:${chatId}` : channelId ? `channel:${channelId}` : null;
        
        if (room) {
          socket.to(room).emit("user:typing", { userId, userName });
        }
      });

      socket.on("typing:stop", (data) => {
        const { chatId, channelId } = data;
        const room = chatId ? `chat:${chatId}` : channelId ? `channel:${channelId}` : null;
        
        if (room) {
          socket.to(room).emit("user:stop-typing", { userId });
        }
      });

      // Handle disconnection
      socket.on("disconnect", (reason) => {
        logger.info(`User ${userName} disconnected`, { userId, socketId: socket.id, reason });
        
        // Remove from connected users
        const userSockets = this.connectedUsers.get(userId);
        if (userSockets) {
          userSockets.delete(socket.id);
          if (userSockets.size === 0) {
            this.connectedUsers.delete(userId);
          }
        }

        // Notify rooms about user leaving
        if (socket.chatId) {
          socket.to(`chat:${socket.chatId}`).emit("user:left", { userId, userName });
        }
        if (socket.channelId) {
          socket.to(`channel:${socket.channelId}`).emit("user:left", { userId, userName });
        }
      });
    });
  }

  // Method to emit new message to chat participants
  public emitNewMessageToChat(chatId: string, message: any) {
    this.io.to(`chat:${chatId}`).emit("message:new", message);
    logger.info(`Emitted new message to chat ${chatId}`, { messageId: message._id });
  }

  // Method to emit new message to channel members
  public emitNewMessageToChannel(channelId: string, message: any) {
    this.io.to(`channel:${channelId}`).emit("message:new", message);
    logger.info(`Emitted new message to channel ${channelId}`, { messageId: message._id });
  }

  // Method to emit message updates
  public emitMessageUpdate(chatId: string | undefined, channelId: string | undefined, message: any) {
    const room = chatId ? `chat:${chatId}` : channelId ? `channel:${channelId}` : null;
    if (room) {
      this.io.to(room).emit("message:updated", message);
      logger.info(`Emitted message update to ${room}`, { messageId: message._id });
    }
  }

  // Method to emit message deletion
  public emitMessageDeletion(chatId: string | undefined, channelId: string | undefined, messageId: string) {
    const room = chatId ? `chat:${chatId}` : channelId ? `channel:${channelId}` : null;
    if (room) {
      this.io.to(room).emit("message:deleted", messageId);
      logger.info(`Emitted message deletion to ${room}`, { messageId });
    }
  }

  // Get connected users count
  public getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  // Check if user is online
  public isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  // Get Socket.IO server instance
  public getIO() {
    return this.io;
  }
}

// Singleton instance
let webSocketService: WebSocketService | null = null;

export const initializeWebSocketService = (server: HTTPServer): WebSocketService => {
  if (webSocketService) {
    throw new Error("WebSocket service already initialized");
  }
  webSocketService = new WebSocketService(server);
  return webSocketService;
};

export const getWebSocketService = (): WebSocketService => {
  if (!webSocketService) {
    throw new Error("WebSocket service not initialized");
  }
  return webSocketService;
};
