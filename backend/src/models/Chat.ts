import mongoose, { Schema, model } from "mongoose";

export interface IChat {
  participants: string[]; // Array of user IDs
  type: "direct" | "group";
  name?: string; // For group chats
  lastMessage?: string;
  lastMessageAt?: Date;
}

export interface IChatDocument extends IChat, mongoose.Document {}

const ChatSchema = new Schema<IChatDocument>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    type: { type: String, enum: ["direct", "group"], default: "direct" },
    name: { type: String, trim: true }, // Optional, mainly for group chats
    lastMessage: { type: String },
    lastMessageAt: { type: Date },
  },
  { timestamps: true }
);

// Index for efficient queries
ChatSchema.index({ participants: 1 });
ChatSchema.index({ lastMessageAt: -1 });

export const Chat = model<IChatDocument>("Chat", ChatSchema);
