import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Notification {
  userId: Types.ObjectId;

  title: string;

  message: string;

  type: string;

  isRead: boolean;

  relatedCaseId?: Types.ObjectId;

  relatedStageId?: Types.ObjectId;
}

const NotificationSchema = new Schema<Notification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "info",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    relatedCaseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
    },

    relatedStageId: {
      type: Schema.Types.ObjectId,
      ref: "CaseStage",
    },
  },
  {
    timestamps: true,
  },
);

const Notification = mongoose.model<Notification>("Notification", NotificationSchema);

export type NotificationDocument = HydratedDocument<Notification>;

export default Notification;
