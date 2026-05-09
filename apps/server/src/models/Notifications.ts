// src/models/Notification.ts

import { NOTIFICATION_PRIORITY, NotificationPriority } from "@legal/shared/src/types/notifications";
import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Notification {
  userId: Types.ObjectId;

  title: string;

  message: string;

  type: string;

  priority: NotificationPriority;

  isRead: boolean;

  readAt?: Date;

  actionUrl?: string;

  entityType?: string;

  entityId?: Types.ObjectId;

  relatedCaseId?: Types.ObjectId;

  relatedStageId?: Types.ObjectId;

  metadata?: Record<string, any>;

  expiresAt?: Date;
}

const NotificationSchema = new Schema<Notification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      index: true,
    },

    priority: {
      type: String,
      enum: Object.values(NOTIFICATION_PRIORITY),
      default: NOTIFICATION_PRIORITY.MEDIUM,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
    },

    actionUrl: {
      type: String,
    },

    entityType: {
      type: String,
    },

    entityId: {
      type: Schema.Types.ObjectId,
    },

    relatedCaseId: {
      type: Schema.Types.ObjectId,
      ref: "Case",
    },

    relatedStageId: {
      type: Schema.Types.ObjectId,
      ref: "CaseStage",
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

NotificationSchema.index({
  userId: 1,
  isRead: 1,
  createdAt: -1,
});

const Notification = mongoose.model<Notification>("Notification", NotificationSchema);

export type NotificationDocument = HydratedDocument<Notification>;

export default Notification;
