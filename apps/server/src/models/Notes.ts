import mongoose, { HydratedDocument, Schema, Types } from "mongoose";
export interface Note {
  caseId: Types.ObjectId;

  stageId?: Types.ObjectId;

  userId: Types.ObjectId;

  content: string;

  visibleToClient: boolean;

  attachments?: string[];

  isDeleted: boolean;

  deletedAt?: Date;
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
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
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

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

NoteSchema.index({
  caseId: 1,
  stageId: 1,
  createdAt: -1,
});

const Note = mongoose.model<Note>("Note", NoteSchema);

export type NoteDocument = HydratedDocument<Note>;

export default Note;
