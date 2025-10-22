import { Message } from "../models/Message.ts";
import { Chat } from "../models/Chat.ts";
import { Channel } from "../models/Channel.ts";
import { AppError } from "../errors/AppError.ts";
import mongoose from "mongoose";

export const getMessagesByChat = async (chatId: string, userId: string, page: number = 1, limit: number = 50) => {
  const chat = await Chat.findById(chatId);
  if (!chat) throw new AppError("Chat not found", 404);

  if (!chat.participants.some((participant) => participant.toString() === userId))
    throw new AppError("Access denied: You are not a participant in this chat", 403);

  const skip = (page - 1) * limit;

  const messages = await Message.find({ chatId })
    .populate("senderId", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalMessages = await Message.countDocuments({ chatId });
  const totalPages = Math.ceil(totalMessages / limit);

  return {
    messages: messages.reverse(),
    pagination: {
      currentPage: page,
      totalPages,
      totalMessages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const getMessagesByChannel = async (channelId: string, userId: string, page: number = 1, limit: number = 50) => {
  // Verify channel exists and user is a member
  const channel = await Channel.findById(channelId);
  if (!channel) {
    throw new AppError("Channel not found", 404);
  }

  if (!channel.members.some((member) => member.toString() === userId)) {
    throw new AppError("Access denied: You are not a member of this channel", 403);
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  // Get messages with sender information
  const messages = await Message.find({ channelId })
    .populate("senderId", "name email")
    .sort({ createdAt: -1 }) // Most recent first
    .skip(skip)
    .limit(limit)
    .lean();

  // Get total count for pagination
  const totalMessages = await Message.countDocuments({ channelId });
  const totalPages = Math.ceil(totalMessages / limit);

  return {
    messages: messages.reverse(), // Reverse to show oldest first in the array
    pagination: {
      currentPage: page,
      totalPages,
      totalMessages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const getMessageById = async (messageId: string, userId: string) => {
  const message = await Message.findById(messageId)
    .populate("senderId", "name email")
    .populate("chatId")
    .populate("channelId")
    .lean();

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  // Check if user has access to this message
  if (message.chatId) {
    const chat = await Chat.findById(message.chatId);
    if (!chat || !chat.participants.some((participant) => participant.toString() === userId)) {
      throw new AppError("Access denied", 403);
    }
  } else if (message.channelId) {
    const channel = await Channel.findById(message.channelId);
    if (!channel || !channel.members.some((member) => member.toString() === userId)) {
      throw new AppError("Access denied", 403);
    }
  }

  return message;
};
