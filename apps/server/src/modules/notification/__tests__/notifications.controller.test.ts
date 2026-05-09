// src/modules/notifications/__tests__/notifications.controller.test.ts

import * as controller from "../notification.controller";

import * as notificationsService from "../notification.service";

jest.mock("../notification.service");

describe("Notifications Controller", () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // =====================================
  // CREATE NOTIFICATION
  // =====================================

  describe("createNotification", () => {
    it("should create notification", async () => {
      const req: any = {
        body: {
          title: "Nueva",
        },
      };

      await controller.createNotification(req, res, next);

      expect(notificationsService.createNotification).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  // =====================================
  // GET USER NOTIFICATIONS
  // =====================================

  describe("getUserNotifications", () => {
    it("should get notifications", async () => {
      const req: any = {
        user: {
          id: "1",
        },
      };

      await controller.getUserNotifications(req, res, next);

      expect(notificationsService.getUserNotifications).toHaveBeenCalledWith("1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // GET NOTIFICATION BY ID
  // =====================================

  describe("getNotificationById", () => {
    it("should get notification by id", async () => {
      const req: any = {
        params: {
          id: "1",
        },

        user: {
          id: "1",
        },
      };

      await controller.getNotificationById(req, res, next);

      expect(notificationsService.getNotificationById).toHaveBeenCalledWith("1", "1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // UPDATE NOTIFICATION
  // =====================================

  describe("updateNotification", () => {
    it("should update notification", async () => {
      const req: any = {
        params: {
          id: "1",
        },

        user: {
          id: "1",
        },

        body: {
          isRead: true,
        },
      };

      await controller.updateNotification(req, res, next);

      expect(notificationsService.updateNotification).toHaveBeenCalledWith("1", "1", req.body);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // MARK AS READ
  // =====================================

  describe("markAsRead", () => {
    it("should mark as read", async () => {
      const req: any = {
        params: {
          id: "1",
        },

        user: {
          id: "1",
        },
      };

      await controller.markAsRead(req, res, next);

      expect(notificationsService.markAsRead).toHaveBeenCalledWith("1", "1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // MARK ALL AS READ
  // =====================================

  describe("markAllAsRead", () => {
    it("should mark all as read", async () => {
      const req: any = {
        user: {
          id: "1",
        },
      };

      await controller.markAllAsRead(req, res, next);

      expect(notificationsService.markAllAsRead).toHaveBeenCalledWith("1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // DELETE NOTIFICATION
  // =====================================

  describe("deleteNotification", () => {
    it("should delete notification", async () => {
      const req: any = {
        params: {
          id: "1",
        },

        user: {
          id: "1",
        },
      };

      await controller.deleteNotification(req, res, next);

      expect(notificationsService.deleteNotification).toHaveBeenCalledWith("1", "1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // GET UNREAD COUNT
  // =====================================

  describe("getUnreadCount", () => {
    it("should get unread count", async () => {
      const req: any = {
        user: {
          id: "1",
        },
      };

      await controller.getUnreadCount(req, res, next);

      expect(notificationsService.getUnreadCount).toHaveBeenCalledWith("1");

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  // =====================================
  // ERROR HANDLING
  // =====================================

  describe("error handling", () => {
    it("should call next on error", async () => {
      const error = new Error("fail");

      (notificationsService.getUnreadCount as jest.Mock).mockRejectedValue(error);

      const req: any = {
        user: {
          id: "1",
        },
      };

      await controller.getUnreadCount(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
