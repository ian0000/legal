import { CASE_STAGE_STATUS, CaseStageStatus } from "@legal/shared/src/types/roles";
import mongoose, { HydratedDocument, Schema, Types } from "mongoose";
export interface CreateCaseStageDTO {
  caseId: string;

  title: string;

  description?: string;

  assignedTo?: string;

  priority?: string;

  estimatedDays?: number;

  dueDate?: Date;

  dependsOn?: string[];

  isFinalStage?: boolean;
}

export interface UpdateCaseStageDTO {
  title?: string;

  description?: string;

  assignedTo?: string;

  priority?: string;

  estimatedDays?: number;

  dueDate?: Date;

  dependsOn?: string[];

  isFinalStage?: boolean;
}

export interface UpdateCaseStageStatusDTO {
  status: CaseStageStatus;

  delayReason?: string;
}

export interface AssignCaseStageDTO {
  assignedTo: string;
}

export interface ReorderCaseStageDTO {
  order: number;
}
export interface CaseStage {
  caseId: Types.ObjectId;

  title: string;

  description?: string;

  order: number;

  assignedTo?: Types.ObjectId;

  assignedBy?: Types.ObjectId;

  status: CaseStageStatus;

  priority?: string;

  estimatedDays?: number;

  startedAt?: Date;

  dueDate?: Date;

  completedAt?: Date;

  delayReason?: string;

  dependsOn?: Types.ObjectId[];

  isFinalStage?: boolean;

  isDeleted: boolean;
  deletedAt?: Date;
}

const CaseStageSchema = new Schema<CaseStage>(
  {
    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    order: {
      type: Number,
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: Object.values(CASE_STAGE_STATUS),
      default: CASE_STAGE_STATUS.PENDING,
    },

    priority: {
      type: String,
    },

    estimatedDays: {
      type: Number,
    },

    startedAt: {
      type: Date,
    },

    dueDate: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    delayReason: {
      type: String,
    },

    dependsOn: [
      {
        type: Schema.Types.ObjectId,
        ref: "CaseStage",
      },
    ],

    isFinalStage: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

CaseStageSchema.index({
  caseId: 1,
  assignedTo: 1,
  status: 1,
});

const CaseStage = mongoose.model<CaseStage>("CaseStage", CaseStageSchema);

export type CaseStageDocument = HydratedDocument<CaseStage>;

export default CaseStage;
