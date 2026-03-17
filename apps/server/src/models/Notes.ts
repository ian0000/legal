import mongoose, { Document, Schema, Types } from "mongoose";

export interface INote {
  content: string;
  authorType: "User" | "Client";
  author: Types.ObjectId;
  visibleToClient: boolean;
}

const noteSchema = new Schema<INote>(
  {
    content: {
      type: String,
      required: true,
    },
    authorType: {
      type: String,
      enum: ["User", "Client"],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    visibleToClient: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;
