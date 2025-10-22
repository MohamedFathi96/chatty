import { Chat } from "@/models/Chat.ts";
import { User } from "@/models/User.ts";
import { BadRequestError, NotFoundError } from "@/errors/AppError.ts";

export async function startDirectChat(currentUserId: string, targetUserId: string) {
  const targetUser = await User.findById(targetUserId);
  if (!targetUser) throw new NotFoundError("Target user not found");

  if (currentUserId === targetUserId) throw new BadRequestError("Cannot start a chat with yourself");

  const existingChat = await Chat.findOne({
    type: "",
    participants: { $all: [currentUserId, targetUserId], $size: 2 },
  });

  if (existingChat) {
    return {
      chatId: (existingChat._id as any).toString(),
      message: "Chat already exists",
      isNew: false,
    };
  }

  const newChat = await Chat.create({
    participants: [currentUserId, targetUserId],
    lastMessage: "",
    lastMessageAt: new Date(),
  });

  return {
    chatId: (newChat._id as any).toString(),
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

  return chats.map((chat) => {
    const otherParticipant = chat.participants.find((participant: any) => participant._id.toString() !== userId);

    return {
      id: chat._id.toString(),
      participant: otherParticipant,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageAt?.toISOString(),
    };
  });
}
