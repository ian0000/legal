import Notification from "../../models/Notifications";

import type {
  CreateNotificationDTO,
  UpdateNotificationDTO,
} from "@legal/shared/src/schemas/notifications.schema";

import { CreateError } from "../../utils/CreateError";
export const createNotification = async (data: CreateNotificationDTO) => {
  return await Notification.create(data);
};

export const getUserNotifications = async (userId: string) => {
  return await Notification.find({
    userId,
  })
    .sort({
      createdAt: -1,
    })
    .lean();
};

export const getNotificationById = async (notificationId: string, userId: string) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw CreateError("Notificación no encontrada", 404);
  }

  return notification;
};

export const updateNotification = async (
  notificationId: string,
  userId: string,
  data: UpdateNotificationDTO,
) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw CreateError("Notificación no encontrada", 404);
  }

  Object.assign(notification, data);

  if (data.isRead === true && !notification.readAt) {
    notification.readAt = new Date();
  }

  if (data.isRead === false) {
    notification.readAt = undefined;
  }

  await notification.save();

  return notification;
};

export const markAsRead = async (notificationId: string, userId: string) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw CreateError("Notificación no encontrada", 404);
  }

  notification.isRead = true;

  notification.readAt = new Date();

  await notification.save();

  return notification;
};

export const markAllAsRead = async (userId: string) => {
  await Notification.updateMany(
    {
      userId,
      isRead: false,
    },
    {
      isRead: true,
      readAt: new Date(),
    },
  );

  return {
    success: true,
  };
};

export const deleteNotification = async (notificationId: string, userId: string) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw CreateError("Notificación no encontrada", 404);
  }

  await notification.deleteOne();

  return {
    success: true,
  };
};

export const getUnreadCount = async (userId: string) => {
  const count = await Notification.countDocuments({
    userId,
    isRead: false,
  });

  return {
    count,
  };
};
