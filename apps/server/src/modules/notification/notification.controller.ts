// src/modules/notifications/notifications.controller.ts

import { NextFunction, Request, Response } from "express";

import * as notificationsService from "./notification.service";

export const createNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await notificationsService.createNotification(req.body);

    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

export const getUserNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await notificationsService.getUserNotifications(req.user!.id);

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const getNotificationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await notificationsService.getNotificationById(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

export const updateNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await notificationsService.updateNotification(
      req.params.id as string,
      req.user!.id,
      req.body,
    );

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await notificationsService.markAsRead(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await notificationsService.markAllAsRead(req.user!.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await notificationsService.deleteNotification(
      req.params.id as string,
      req.user!.id,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUnreadCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await notificationsService.getUnreadCount(req.user!.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
