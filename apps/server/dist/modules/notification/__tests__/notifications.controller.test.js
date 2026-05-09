"use strict";
// src/modules/notifications/__tests__/notifications.controller.test.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const controller = __importStar(require("../notification.controller"));
const notificationsService = __importStar(require("../notification.service"));
jest.mock("../notification.service");
describe("Notifications Controller", () => {
    const res = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            const req = {
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
            notificationsService.getUnreadCount.mockRejectedValue(error);
            const req = {
                user: {
                    id: "1",
                },
            };
            await controller.getUnreadCount(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
//# sourceMappingURL=notifications.controller.test.js.map