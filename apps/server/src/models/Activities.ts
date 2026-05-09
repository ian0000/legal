import { ACTIVITY_ACTIONS, ActivityAction } from "@legal/shared/src/types/activities";
import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Activity {
  userId: Types.ObjectId;

  caseId?: Types.ObjectId;

  stageId?: Types.ObjectId;

  action: ActivityAction;

  description?: string;

  metadata?: Record<string, any>;

  isDeleted: boolean;

  deletedAt?: Date | null;
}

const ActivitySchema = new Schema<Activity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
      index: true,
    },

    stageId: {
      type: Schema.Types.ObjectId,
      ref: "CaseStage",
      index: true,
    },

    action: {
      type: String,
      enum: Object.values(ACTIVITY_ACTIONS),
      required: true,
      index: true,
    },

    description: {
      type: String,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
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

ActivitySchema.index({
  caseId: 1,
  createdAt: -1,
});

ActivitySchema.index({
  userId: 1,
  createdAt: -1,
});

const Activity = mongoose.model<Activity>("Activity", ActivitySchema);

export type ActivityDocument = HydratedDocument<Activity>;

export default Activity;
