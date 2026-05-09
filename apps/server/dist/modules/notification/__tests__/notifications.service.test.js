"use strict";
// src/modules/notifications/__tests__/notifications.service.test.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Notifications_1 = __importDefault(require("../../../models/Notifications"));
const notificationsService = __importStar(require("../notification.service"));
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
            Notifications_1.default.create.mockResolvedValue({
                _id: "1",
            });
            const result = await notificationsService.createNotification({
                userId: "1",
                title: "Nueva notificación",
                message: "Mensaje",
                type: "info",
            });
            expect(Notifications_1.default.create).toHaveBeenCalled();
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
            Notifications_1.default.find.mockReturnValue({
                sort: sortMock,
            });
            const result = await notificationsService.getUserNotifications("1");
            expect(Notifications_1.default.find).toHaveBeenCalledWith({
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
            Notifications_1.default.findOne.mockResolvedValue({
                _id: "1",
            });
            const result = await notificationsService.getNotificationById("1", "1");
            expect(Notifications_1.default.findOne).toHaveBeenCalledWith({
                _id: "1",
                userId: "1",
            });
            expect(result).toBeDefined();
        });
        it("should throw if notification not exists", async () => {
            Notifications_1.default.findOne.mockResolvedValue(null);
            await expect(notificationsService.getNotificationById("1", "1")).rejects.toThrow("Notificación no encontrada");
        });
    });
    // =====================================
    // UPDATE NOTIFICATION
    // =====================================
    describe("updateNotification", () => {
        it("should update notification", async () => {
            const saveMock = jest.fn();
            Notifications_1.default.findOne.mockResolvedValue({
                isRead: false,
                readAt: null,
                save: saveMock,
            });
            const result = await notificationsService.updateNotification("1", "1", {
                isRead: true,
            });
            expect(Notifications_1.default.findOne).toHaveBeenCalled();
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
            Notifications_1.default.findOne.mockResolvedValue(notificationMock);
            await notificationsService.updateNotification("1", "1", {
                isRead: false,
            });
            expect(notificationMock.readAt).toBeUndefined();
            expect(saveMock).toHaveBeenCalled();
        });
        it("should throw if notification not exists", async () => {
            Notifications_1.default.findOne.mockResolvedValue(null);
            await expect(notificationsService.updateNotification("1", "1", {})).rejects.toThrow("Notificación no encontrada");
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
            Notifications_1.default.findOne.mockResolvedValue(notificationMock);
            const result = await notificationsService.markAsRead("1", "1");
            expect(notificationMock.isRead).toBe(true);
            expect(notificationMock.readAt).toBeDefined();
            expect(saveMock).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
        it("should throw if notification not exists", async () => {
            Notifications_1.default.findOne.mockResolvedValue(null);
            await expect(notificationsService.markAsRead("1", "1")).rejects.toThrow("Notificación no encontrada");
        });
    });
    // =====================================
    // MARK ALL AS READ
    // =====================================
    describe("markAllAsRead", () => {
        it("should mark all notifications as read", async () => {
            Notifications_1.default.updateMany.mockResolvedValue({});
            const result = await notificationsService.markAllAsRead("1");
            expect(Notifications_1.default.updateMany).toHaveBeenCalledWith({
                userId: "1",
                isRead: false,
            }, {
                isRead: true,
                readAt: expect.any(Date),
            });
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
            Notifications_1.default.findOne.mockResolvedValue({
                deleteOne: deleteMock,
            });
            const result = await notificationsService.deleteNotification("1", "1");
            expect(deleteMock).toHaveBeenCalled();
            expect(result).toEqual({
                success: true,
            });
        });
        it("should throw if notification not exists", async () => {
            Notifications_1.default.findOne.mockResolvedValue(null);
            await expect(notificationsService.deleteNotification("1", "1")).rejects.toThrow("Notificación no encontrada");
        });
    });
    // =====================================
    // GET UNREAD COUNT
    // =====================================
    describe("getUnreadCount", () => {
        it("should return unread count", async () => {
            Notifications_1.default.countDocuments.mockResolvedValue(5);
            const result = await notificationsService.getUnreadCount("1");
            expect(Notifications_1.default.countDocuments).toHaveBeenCalledWith({
                userId: "1",
                isRead: false,
            });
            expect(result).toEqual({
                count: 5,
            });
        });
    });
});
//# sourceMappingURL=notifications.service.test.js.map