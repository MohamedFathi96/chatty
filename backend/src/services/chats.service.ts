import { Chat } from "@/models/Chat.ts";
import { User } from "@/models/User.ts";
import { BadRequestError, NotFoundError } from "@/errors/AppError.ts";

export async function startDirectChat(currentUserId: string, targetUserId: string) {
  // Validate that target user exists
  const targetUser = await User.findById(targetUserId);
  if (!targetUser) throw new NotFoundError("Target user not found");

  // Check if user is trying to chat with themselves
  if (currentUserId === targetUserId) {
    throw new BadRequestError("Cannot start a chat with yourself");
  }

  // Check if a direct chat already exists between these users
  const existingChat = await Chat.findOne({
    type: "direct",
    participants: { $all: [currentUserId, targetUserId], $size: 2 },
  });

  if (existingChat) {
    return {
      chatId: existingChat._id.toString(),
      message: "Chat already exists",
      isNew: false,
    };
  }

  // Create new direct chat
  const newChat = await Chat.create({
    participants: [currentUserId, targetUserId],
    type: "direct",
  });

  return {
    chatId: newChat._id.toString(),
    message: "Chat created successfully",
    isNew: true,
  };
}

export async function getUserChats(userId: string) {
  const chats = await Chat.find({
    participants: userId,
  })
    .populate("participants", "name email")
    .sort({ lastMessageAt: -1, createdAt: -1 })
    .lean();

  return chats.map((chat) => ({
    id: chat._id.toString(),
    type: chat.type,
    name: chat.name,
    participants: chat.participants,
    lastMessage: chat.lastMessage,
    lastMessageAt: chat.lastMessageAt,
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
  }));
}
