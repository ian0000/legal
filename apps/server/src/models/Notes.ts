import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Note {
  caseId: Types.ObjectId;

  stageId?: Types.ObjectId;

  userId: Types.ObjectId;

  content: string;

  visibleToClient: boolean;

  attachments?: string[];
}

const NoteSchema = new Schema<Note>(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },

    stageId: {
      type: Schema.Types.ObjectId,
      ref: "CaseStage",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    visibleToClient: {
      type: Boolean,
      default: false,
    },

    attachments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model<Note>("Note", NoteSchema);

export type NoteDocument = HydratedDocument<Note>;

export default Note;
