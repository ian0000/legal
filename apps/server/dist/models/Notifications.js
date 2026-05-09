"use strict";
// src/models/Notification.ts
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
const notifications_1 = require("@legal/shared/src/types/notifications");
const mongoose_1 = __importStar(require("mongoose"));
const NotificationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(notifications_1.NOTIFICATION_PRIORITY),
        default: notifications_1.NOTIFICATION_PRIORITY.MEDIUM,
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
        type: mongoose_1.Schema.Types.ObjectId,
    },
    relatedCaseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Case",
    },
    relatedStageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CaseStage",
    },
    metadata: {
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    },
    expiresAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
NotificationSchema.index({
    userId: 1,
    isRead: 1,
    createdAt: -1,
});
const Notification = mongoose_1.default.model("Notification", NotificationSchema);
exports.default = Notification;
//# sourceMappingURL=Notifications.js.map