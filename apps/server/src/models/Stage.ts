import mongoose, { Document, Schema, Types } from "mongoose";

export interface IStage {
  name: string;
  status: string;
  estimatedHours: number;
  actualHours: number;
  responsibleUser: Types.ObjectId;
  case: Types.ObjectId;
  completedAt: Date | null;
  completedBy: Types.ObjectId | null;
  dueDate: Date;
  history: {
    action: string;
    by: Types.ObjectId;
    at: Date;
  }[];
  delegatedTo?: Types.ObjectId;
  delegatedBy?: Types.ObjectId;
  delegatedAt?: Date;
  returnedToOriginalUser?: boolean;
}

const stageSchema = new Schema<IStage>(
  {
    name: {
      type: String,
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
    case: {
      type: Schema.Types.ObjectId,
      ref: "Case",
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
    delegatedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    delegatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    delegatedAt: {
      type: Date,
    },
    returnedToOriginalUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Stage = mongoose.model<IStage>("Stage", stageSchema);

export default Stage;
