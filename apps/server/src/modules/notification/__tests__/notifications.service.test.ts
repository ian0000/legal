// src/modules/notifications/__tests__/notifications.service.test.ts

import Notification from "../../../models/Notifications";
import * as notificationsService from "../notification.service";

jest.mock("../../../models/Notifications");

describe("Notifications Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE NOTIFICATION
  // =====================================

  describe("createNotification", () => {
    it("should create notification", async () => {
      (Notification.create as jest.Mock).mockResolvedValue({
        _id: "1",
      });

      const result = await notificationsService.createNotification({
        userId: "1",
        title: "Nueva notificación",
        message: "Mensaje",
        type: "info",
      });

      expect(Notification.create).toHaveBeenCalled();

      expect(result).toBeDefined();
    });
  });

  // =====================================
  // GET USER NOTIFICATIONS
  // =====================================

  describe("getUserNotifications", () => {
    it("should return notifications", async () => {
      const leanMock = jest.fn().mockResolvedValue([]);

      const sortMock = jest.fn().mockReturnValue({
        lean: leanMock,
      });

      (Notification.find as jest.Mock).mockReturnValue({
        sort: sortMock,
      });

      const result = await notificationsService.getUserNotifications("1");

      expect(Notification.find).toHaveBeenCalledWith({
        userId: "1",
      });

      expect(sortMock).toHaveBeenCalledWith({
        createdAt: -1,
      });

      expect(result).toEqual([]);
    });
  });

  // =====================================
  // GET NOTIFICATION BY ID
  // =====================================

  describe("getNotificationById", () => {
    it("should return notification", async () => {
      (Notification.findOne as jest.Mock).mockResolvedValue({
        _id: "1",
      });

      const result = await notificationsService.getNotificationById("1", "1");

      expect(Notification.findOne).toHaveBeenCalledWith({
        _id: "1",
        userId: "1",
      });

      expect(result).toBeDefined();
    });

    it("should throw if notification not exists", async () => {
      (Notification.findOne as jest.Mock).mockResolvedValue(null);

      await expect(notificationsService.getNotificationById("1", "1")).rejects.toThrow(
        "Notificación no encontrada",
      );
    });
  });

  // =====================================
  // UPDATE NOTIFICATION
  // =====================================

  describe("updateNotification", () => {
    it("should update notification", async () => {
      const saveMock = jest.fn();

      (Notification.findOne as jest.Mock).mockResolvedValue({
        isRead: false,
        readAt: null,
        save: saveMock,
      });

      const result = await notificationsService.updateNotification("1", "1", {
        isRead: true,
      });

      expect(Notification.findOne).toHaveBeenCalled();

      expect(saveMock).toHaveBeenCalled();

      expect(result).toBeDefined();
    });

    it("should clear readAt when unread", async () => {
      const saveMock = jest.fn();

      const notificationMock = {
        isRead: true,
        readAt: new Date(),
        save: saveMock,
      };

      (Notification.findOne as jest.Mock).mockResolvedValue(notificationMock);

      await notificationsService.updateNotification("1", "1", {
        isRead: false,
      });

      expect(notificationMock.readAt).toBeUndefined();

      expect(saveMock).toHaveBeenCalled();
    });

    it("should throw if notification not exists", async () => {
      (Notification.findOne as jest.Mock).mockResolvedValue(null);

      await expect(notificationsService.updateNotification("1", "1", {})).rejects.toThrow(
        "Notificación no encontrada",
      );
    });
  });

  // =====================================
  // MARK AS READ
  // =====================================

  describe("markAsRead", () => {
    it("should mark notification as read", async () => {
      const saveMock = jest.fn();

      const notificationMock = {
        isRead: false,
        readAt: null,
        save: saveMock,
      };

      (Notification.findOne as jest.Mock).mockResolvedValue(notificationMock);

      const result = await notificationsService.markAsRead("1", "1");

      expect(notificationMock.isRead).toBe(true);

      expect(notificationMock.readAt).toBeDefined();

      expect(saveMock).toHaveBeenCalled();

      expect(result).toBeDefined();
    });

    it("should throw if notification not exists", async () => {
      (Notification.findOne as jest.Mock).mockResolvedValue(null);

      await expect(notificationsService.markAsRead("1", "1")).rejects.toThrow(
        "Notificación no encontrada",
      );
    });
  });

  // =====================================
  // MARK ALL AS READ
  // =====================================

  describe("markAllAsRead", () => {
    it("should mark all notifications as read", async () => {
      (Notification.updateMany as jest.Mock).mockResolvedValue({});

      const result = await notificationsService.markAllAsRead("1");

      expect(Notification.updateMany).toHaveBeenCalledWith(
        {
          userId: "1",
          isRead: false,
        },
        {
          isRead: true,
          readAt: expect.any(Date),
        },
      );

      expect(result).toEqual({
        success: true,
      });
    });
  });

  // =====================================
  // DELETE NOTIFICATION
  // =====================================

  describe("deleteNotification", () => {
    it("should delete notification", async () => {
      const deleteMock = jest.fn();

      (Notification.findOne as jest.Mock).mockResolvedValue({
        deleteOne: deleteMock,
      });

      const result = await notificationsService.deleteNotification("1", "1");

      expect(deleteMock).toHaveBeenCalled();

      expect(result).toEqual({
        success: true,
      });
    });

    it("should throw if notification not exists", async () => {
      (Notification.findOne as jest.Mock).mockResolvedValue(null);

      await expect(notificationsService.deleteNotification("1", "1")).rejects.toThrow(
        "Notificación no encontrada",
      );
    });
  });

  // =====================================
  // GET UNREAD COUNT
  // =====================================

  describe("getUnreadCount", () => {
    it("should return unread count", async () => {
      (Notification.countDocuments as jest.Mock).mockResolvedValue(5);

      const result = await notificationsService.getUnreadCount("1");

      expect(Notification.countDocuments).toHaveBeenCalledWith({
        userId: "1",
        isRead: false,
      });

      expect(result).toEqual({
        count: 5,
      });
    });
  });
});
