"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnreadCount = exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.updateNotification = exports.getNotificationById = exports.getUserNotifications = exports.createNotification = void 0;
const Notifications_1 = __importDefault(require("../../models/Notifications"));
const CreateError_1 = require("../../utils/CreateError");
const createNotification = async (data) => {
    return await Notifications_1.default.create(data);
};
exports.createNotification = createNotification;
const getUserNotifications = async (userId) => {
    return await Notifications_1.default.find({
        userId,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
};
exports.getUserNotifications = getUserNotifications;
const getNotificationById = async (notificationId, userId) => {
    const notification = await Notifications_1.default.findOne({
        _id: notificationId,
        userId,
    });
    if (!notification) {
        throw (0, CreateError_1.CreateError)("Notificación no encontrada", 404);
    }
    return notification;
};
exports.getNotificationById = getNotificationById;
const updateNotification = async (notificationId, userId, data) => {
    const notification = await Notifications_1.default.findOne({
        _id: notificationId,
        userId,
    });
    if (!notification) {
        throw (0, CreateError_1.CreateError)("Notificación no encontrada", 404);
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
exports.updateNotification = updateNotification;
const markAsRead = async (notificationId, userId) => {
    const notification = await Notifications_1.default.findOne({
        _id: notificationId,
        userId,
    });
    if (!notification) {
        throw (0, CreateError_1.CreateError)("Notificación no encontrada", 404);
    }
    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();
    return notification;
};
exports.markAsRead = markAsRead;
const markAllAsRead = async (userId) => {
    await Notifications_1.default.updateMany({
        userId,
        isRead: false,
    }, {
        isRead: true,
        readAt: new Date(),
    });
    return {
        success: true,
    };
};
exports.markAllAsRead = markAllAsRead;
const deleteNotification = async (notificationId, userId) => {
    const notification = await Notifications_1.default.findOne({
        _id: notificationId,
        userId,
    });
    if (!notification) {
        throw (0, CreateError_1.CreateError)("Notificación no encontrada", 404);
    }
    await notification.deleteOne();
    return {
        success: true,
    };
};
exports.deleteNotification = deleteNotification;
const getUnreadCount = async (userId) => {
    const count = await Notifications_1.default.countDocuments({
        userId,
        isRead: false,
    });
    return {
        count,
    };
};
exports.getUnreadCount = getUnreadCount;
//# sourceMappingURL=notification.service.js.map