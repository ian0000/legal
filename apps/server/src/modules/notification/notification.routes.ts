// src/modules/notifications/notifications.routes.ts

import { Router } from "express";

import * as NotificationsController from "./notification.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

router.post("/", NotificationsController.createNotification);

router.get("/", NotificationsController.getUserNotifications);

router.get("/unread-count", NotificationsController.getUnreadCount);

router.put("/mark-all-read", NotificationsController.markAllAsRead);

router.get("/:id", NotificationsController.getNotificationById);

router.put("/:id", NotificationsController.updateNotification);

router.put("/:id/read", NotificationsController.markAsRead);

router.delete("/:id", NotificationsController.deleteNotification);

export default router;
