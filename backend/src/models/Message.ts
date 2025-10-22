import mongoose, { Schema, model } from "mongoose";

export interface IMessage {
  channelId?: mongoose.Types.ObjectId;
  chatId?: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  text: string;
  type: "message" | "activity";
}

export interface IMessageDocument extends IMessage, mongoose.Document {}

const MessageSchema = new Schema<IMessageDocument>(
  {
    channelId: { type: Schema.Types.ObjectId, ref: "Channel" },
    chatId: { type: Schema.Types.ObjectId, ref: "Chat" },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
    type: { type: String, enum: ["message", "activity"], required: true, default: "message" },
  },
  { timestamps: true }
);

// Validation to ensure either channelId or chatId is provided, but not both
MessageSchema.pre("validate", function () {
  if (!this.channelId && !this.chatId) {
    this.invalidate("channelId", "Either channelId or chatId must be provided");
  }
  if (this.channelId && this.chatId) {
    this.invalidate("channelId", "Cannot have both channelId and chatId");
  }
});

export const Message = model<IMessageDocument>("Message", MessageSchema);
