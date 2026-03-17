import mongoose, { Schema, Types } from "mongoose";

export interface ICase {
  casenumber: string;
  name: string;
  description: string;
  casetype: string;
  status: string;
  estimatedHours: number;
  actualHours: number;
  responsibleUser: Types.ObjectId;
  client: Types.ObjectId;
  completedAt: Date | null;
  completedBy: Types.ObjectId | null;
  dueDate: Date;
  history: {
    action: string;
    by: Types.ObjectId;
    at: Date;
  }[];
  notes: Types.ObjectId[];
}

const caseSchema = new Schema<ICase>(
  {
    casenumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    casetype: {
      type: String,
      enum: ["civil", "criminal", "family", "corporate"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    estimatedHours: {
      type: Number,
      required: true,
    },
    actualHours: {
      type: Number,
      default: 0,
    },
    responsibleUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    completedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    history: [
      {
        action: {
          type: String,
          required: true,
        },
        by: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  { timestamps: true },
);

const Case = mongoose.model<ICase>("Case", caseSchema);

export default Case;
