"use strict";
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
exports.deleteActivity = exports.getActivityById = exports.getCaseActivities = exports.getActivities = void 0;
const ActivitiesService = __importStar(require("./activities.service"));
const getActivities = async (req, res, next) => {
    try {
        const activities = await ActivitiesService.getActivities(req.query);
        res.status(200).json(activities);
    }
    catch (error) {
        next(error);
    }
};
exports.getActivities = getActivities;
const getCaseActivities = async (req, res, next) => {
    try {
        const activities = await ActivitiesService.getCaseActivities(req.params.caseId);
        res.status(200).json(activities);
    }
    catch (error) {
        next(error);
    }
};
exports.getCaseActivities = getCaseActivities;
const getActivityById = async (req, res, next) => {
    try {
        const activity = await ActivitiesService.getActivityById(req.params.id);
        res.status(200).json(activity);
    }
    catch (error) {
        next(error);
    }
};
exports.getActivityById = getActivityById;
const deleteActivity = async (req, res, next) => {
    try {
        await ActivitiesService.deleteActivity(req.params.id);
        res.status(200).json({
            message: "Actividad eliminada correctamente",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteActivity = deleteActivity;
//# sourceMappingURL=activities.controller.js.map