import { CASE_STATUS, CaseStatus } from "@legal/shared/src/types/cases";
import mongoose, { HydratedDocument, Schema, Types } from "mongoose";
// src/modules/cases/dto/create-case.dto.ts

// src/modules/cases/dto/update-case.dto.ts

// src/modules/cases/dto/get-cases.dto.ts
export interface Case {
  code: string;

  title: string;
  description?: string;

  type?: string;

  clientId: Types.ObjectId;

  createdBy: Types.ObjectId;

  principalLawyerId: Types.ObjectId;

  assignedUsers: Types.ObjectId[];

  status: CaseStatus;

  priority?: string;

  startDate?: Date;
  estimatedEndDate?: Date;
  completedAt?: Date;

  currentStageId?: Types.ObjectId;

  tags?: string[];

  financialSummary: {
    totalCost: number;
    totalPaid: number;
    pendingAmount: number;
    expenses: number;
  };
  isDeleted: boolean;

  deletedAt?: Date;

  deletedBy?: Types.ObjectId;
}

const CaseSchema = new Schema<Case>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    type: {
      type: String,
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      index: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    principalLawyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    assignedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: Object.values(CASE_STATUS),
      default: CASE_STATUS.ACTIVE,
      index: true,
    },

    priority: {
      type: String,
    },

    startDate: {
      type: Date,
    },

    estimatedEndDate: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    currentStageId: {
      type: Schema.Types.ObjectId,
      ref: "CaseStage",
    },

    tags: [
      {
        type: String,
      },
    ],

    financialSummary: {
      totalCost: {
        type: Number,
        default: 0,
      },

      totalPaid: {
        type: Number,
        default: 0,
      },

      pendingAmount: {
        type: Number,
        default: 0,
      },

      expenses: {
        type: Number,
        default: 0,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
    },

    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

CaseSchema.index({
  clientId: 1,
  principalLawyerId: 1,
  status: 1,
});

const Case = mongoose.model<Case>("Case", CaseSchema);

export type CaseDocument = HydratedDocument<Case>;

export default Case;
