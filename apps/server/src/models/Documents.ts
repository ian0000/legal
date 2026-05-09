import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Document {
  caseId: Types.ObjectId;

  uploadedBy: Types.ObjectId;

  stageId?: Types.ObjectId;

  name: string;

  originalName: string;

  mimeType: string;

  size: number;

  file: Buffer;

  visibility: string;

  documentType?: string;

  tags?: string[];

  version?: number;

  uploadedAt?: Date;

  isDeleted: boolean;

  deletedAt?: Date;
}

// =====================================
// DTOs
// =====================================

// =====================================
// SCHEMA
// =====================================

const DocumentSchema = new Schema<Document>(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    stageId: {
      type: Schema.Types.ObjectId,
      ref: "CaseStage",
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    file: {
      type: Buffer,
      required: true,
    },

    visibility: {
      type: String,
      default: "internal",
    },

    documentType: {
      type: String,
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

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

DocumentSchema.index({
  caseId: 1,
  stageId: 1,
  uploadedBy: 1,
  isDeleted: 1,
});

const Document = mongoose.model<Document>("Document", DocumentSchema);

export type DocumentDocument = HydratedDocument<Document>;

export default Document;
