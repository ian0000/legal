import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Activity {
  userId: Types.ObjectId;

  caseId?: Types.ObjectId;

  stageId?: Types.ObjectId;

  action: string;

  description?: string;

  metadata?: Record<string, any>;
}

const ActivitySchema = new Schema<Activity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    caseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
    },

    stageId: {
      type: Schema.Types.ObjectId,
      ref: "CaseStage",
    },

    action: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model<Activity>("Activity", ActivitySchema);

export type ActivityDocument = HydratedDocument<Activity>;

export default Activity;
