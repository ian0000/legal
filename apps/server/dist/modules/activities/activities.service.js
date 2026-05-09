"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.getActivityById = exports.getCaseActivities = exports.getActivities = exports.createActivity = void 0;
const Activities_1 = __importDefault(require("../../models/Activities"));
const CreateError_1 = require("../../utils/CreateError");
const createActivity = async (data) => {
    return await Activities_1.default.create(data);
};
exports.createActivity = createActivity;
const getActivities = async (filters) => {
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 20;
    const skip = (page - 1) * limit;
    const query = {
        isDeleted: false,
    };
    if (filters.caseId) {
        query.caseId = filters.caseId;
    }
    if (filters.userId) {
        query.userId = filters.userId;
    }
    if (filters.action) {
        query.action = filters.action;
    }
    const [activities, total] = await Promise.all([
        Activities_1.default.find(query)
            .populate("userId", "firstName lastName email")
            .populate("caseId", "title code")
            .populate("stageId", "title")
            .sort({
            createdAt: -1,
        })
            .skip(skip)
            .limit(limit),
        Activities_1.default.countDocuments(query),
    ]);
    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: activities,
    };
};
exports.getActivities = getActivities;
const getCaseActivities = async (caseId) => {
    return await Activities_1.default.find({
        caseId,
        isDeleted: false,
    })
        .populate("userId", "firstName lastName email")
        .populate("stageId", "title")
        .sort({
        createdAt: -1,
    });
};
exports.getCaseActivities = getCaseActivities;
const getActivityById = async (activityId) => {
    const activity = await Activities_1.default.findOne({
        _id: activityId,
        isDeleted: false,
    })
        .populate("userId", "firstName lastName email")
        .populate("caseId", "title code")
        .populate("stageId", "title");
    if (!activity) {
        throw (0, CreateError_1.CreateError)("Actividad no encontrada", 404);
    }
    return activity;
};
exports.getActivityById = getActivityById;
const deleteActivity = async (activityId) => {
    const activity = await Activities_1.default.findOne({
        _id: activityId,
        isDeleted: false,
    });
    if (!activity) {
        throw (0, CreateError_1.CreateError)("Actividad no encontrada", 404);
    }
    activity.isDeleted = true;
    activity.deletedAt = new Date();
    await activity.save();
    return;
};
exports.deleteActivity = deleteActivity;
//# sourceMappingURL=activities.service.js.map