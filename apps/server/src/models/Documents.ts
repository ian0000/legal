import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Document {
  caseId: Types.ObjectId;

  uploadedBy: Types.ObjectId;

  stageId?: Types.ObjectId;

  name: string;

  originalName: string;

  mimeType: string;

  size: number;

  url: string;

  visibility: string;

  tags?: string[];

  version?: number;
}

const DocumentSchema = new Schema<Document>(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stageId: {
      type: Schema.Types.ObjectId,
      ref: "CaseStage",
    },

    name: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },

    visibility: {
      type: String,
      default: "internal",
    },

    tags: [
      {
        type: String,
      },
    ],

    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const Document = mongoose.model<Document>("Document", DocumentSchema);

export type DocumentDocument = HydratedDocument<Document>;

export default Document;
