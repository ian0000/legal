"use strict";
// src/modules/notifications/notifications.controller.ts
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
exports.getUnreadCount = exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.updateNotification = exports.getNotificationById = exports.getUserNotifications = exports.createNotification = void 0;
const notificationsService = __importStar(require("./notification.service"));
const createNotification = async (req, res, next) => {
    try {
        const notification = await notificationsService.createNotification(req.body);
        res.status(201).json(notification);
    }
    catch (error) {
        next(error);
    }
};
exports.createNotification = createNotification;
const getUserNotifications = async (req, res, next) => {
    try {
        const notifications = await notificationsService.getUserNotifications(req.user.id);
        res.status(200).json(notifications);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserNotifications = getUserNotifications;
const getNotificationById = async (req, res, next) => {
    try {
        const notification = await notificationsService.getNotificationById(req.params.id, req.user.id);
        res.status(200).json(notification);
    }
    catch (error) {
        next(error);
    }
};
exports.getNotificationById = getNotificationById;
const updateNotification = async (req, res, next) => {
    try {
        const notification = await notificationsService.updateNotification(req.params.id, req.user.id, req.body);
        res.status(200).json(notification);
    }
    catch (error) {
        next(error);
    }
};
exports.updateNotification = updateNotification;
const markAsRead = async (req, res, next) => {
    try {
        const notification = await notificationsService.markAsRead(req.params.id, req.user.id);
        res.status(200).json(notification);
    }
    catch (error) {
        next(error);
    }
};
exports.markAsRead = markAsRead;
const markAllAsRead = async (req, res, next) => {
    try {
        const result = await notificationsService.markAllAsRead(req.user.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.markAllAsRead = markAllAsRead;
const deleteNotification = async (req, res, next) => {
    try {
        const result = await notificationsService.deleteNotification(req.params.id, req.user.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteNotification = deleteNotification;
const getUnreadCount = async (req, res, next) => {
    try {
        const result = await notificationsService.getUnreadCount(req.user.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getUnreadCount = getUnreadCount;
//# sourceMappingURL=notification.controller.js.map