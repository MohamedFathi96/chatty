import mongoose, { Schema, model } from "mongoose";

export interface IChannel {
  name: string;
  type: "public" | "private";
  members: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}

export interface IChannelDocument extends IChannel, mongoose.Document {}

const ChannelSchema = new Schema<IChannelDocument>(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["public", "private"], required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Channel = model<IChannelDocument>("Channel", ChannelSchema);
