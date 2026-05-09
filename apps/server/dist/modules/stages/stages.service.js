"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderStage = exports.assignStage = exports.updateStageStatus = exports.deleteStage = exports.updateStage = exports.getStageById = exports.getCaseStages = exports.createStage = void 0;
// =====================================
// CREATE STAGE
// =====================================
const mongoose_1 = __importDefault(require("mongoose"));
const Stage_1 = __importDefault(require("../../models/Stage"));
const Case_1 = __importDefault(require("../../models/Case"));
const CreateError_1 = require("../../utils/CreateError");
const activities_service_1 = require("../activities/activities.service");
const cases_1 = require("@legal/shared/src/types/cases");
const activities_1 = require("@legal/shared/src/types/activities");
const createStage = async (userId, data) => {
    const existingCase = await Case_1.default.findById(data.caseId);
    if (!existingCase) {
        throw (0, CreateError_1.CreateError)("Caso no encontrado", 404);
    }
    const lastStage = await Stage_1.default.findOne({
        caseId: data.caseId,
        isDeleted: false,
    }).sort({
        order: -1,
    });
    const nextOrder = lastStage ? lastStage.order + 1 : 1;
    const stage = await Stage_1.default.create({
        caseId: data.caseId,
        title: data.title,
        description: data.description,
        assignedTo: data.assignedTo,
        assignedBy: data.assignedTo ? userId : undefined,
        priority: data.priority,
        estimatedDays: data.estimatedDays,
        dueDate: data.dueDate,
        dependsOn: data.dependsOn,
        isFinalStage: data.isFinalStage,
        order: nextOrder,
        status: cases_1.CASE_STAGE_STATUS.PENDING,
    });
    if (!existingCase.currentStageId) {
        existingCase.currentStageId = stage._id;
        await existingCase.save();
    }
    await (0, activities_service_1.createActivity)({
        userId,
        caseId: stage.caseId.toString(),
        stageId: stage._id.toString(),
        action: activities_1.ACTIVITY_ACTIONS.STAGE_CREATED,
        description: `Etapa creada: ${stage.title}`,
        metadata: {
            assignedTo: data.assignedTo,
        },
    });
    return stage;
};
exports.createStage = createStage;
// =====================================
// GET CASE STAGES
// =====================================
const getCaseStages = async (caseId) => {
    return await Stage_1.default.find({
        caseId,
        isDeleted: false,
    })
        .populate("assignedTo", "firstName lastName email")
        .populate("assignedBy", "firstName lastName email")
        .sort({
        order: 1,
    });
};
exports.getCaseStages = getCaseStages;
// =====================================
// GET STAGE BY ID
// =====================================
const getStageById = async (stageId) => {
    const stage = await Stage_1.default.findOne({
        _id: stageId,
        isDeleted: false,
    })
        .populate("assignedTo", "firstName lastName email")
        .populate("assignedBy", "firstName lastName email");
    if (!stage) {
        throw (0, CreateError_1.CreateError)("Etapa no encontrada", 404);
    }
    return stage;
};
exports.getStageById = getStageById;
// =====================================
// UPDATE STAGE
// =====================================
const updateStage = async (stageId, data) => {
    const stage = await Stage_1.default.findOne({
        _id: stageId,
        isDeleted: false,
    });
    if (!stage) {
        throw (0, CreateError_1.CreateError)("Etapa no encontrada", 404);
    }
    Object.assign(stage, data);
    if (data.assignedTo) {
        stage.assignedTo = new mongoose_1.default.Types.ObjectId(data.assignedTo);
    }
    await stage.save();
    return stage;
};
exports.updateStage = updateStage;
// =====================================
// DELETE STAGE (SOFT)
// =====================================
const deleteStage = async (stageId) => {
    const stage = await Stage_1.default.findOne({
        _id: stageId,
        isDeleted: false,
    });
    if (!stage) {
        throw (0, CreateError_1.CreateError)("Etapa no encontrada", 404);
    }
    stage.isDeleted = true;
    stage.deletedAt = new Date();
    await stage.save();
    return {
        message: "Etapa eliminada correctamente",
    };
};
exports.deleteStage = deleteStage;
// =====================================
// UPDATE STATUS
// =====================================
const updateStageStatus = async (userId, stageId, data) => {
    const stage = await Stage_1.default.findOne({
        _id: stageId,
        isDeleted: false,
    });
    if (!stage) {
        throw (0, CreateError_1.CreateError)("Etapa no encontrada", 404);
    }
    stage.status = data.status;
    if (data.status === cases_1.CASE_STAGE_STATUS.IN_PROGRESS) {
        stage.startedAt = new Date();
    }
    if (data.status === cases_1.CASE_STAGE_STATUS.COMPLETED) {
        stage.completedAt = new Date();
        const nextStage = await Stage_1.default.findOne({
            caseId: stage.caseId,
            order: stage.order + 1,
        });
        if (nextStage) {
            await Case_1.default.findByIdAndUpdate(stage.caseId, {
                currentStageId: nextStage._id,
            });
        }
    }
    if (data.delayReason) {
        stage.delayReason = data.delayReason;
    }
    await stage.save();
    await (0, activities_service_1.createActivity)({
        userId,
        caseId: String(stage.caseId),
        stageId: String(stage._id),
        action: activities_1.ACTIVITY_ACTIONS.STAGE_UPDATED,
        description: `Estado actualizado a ${data.status}`,
    });
    return stage;
};
exports.updateStageStatus = updateStageStatus;
// =====================================
// ASSIGN STAGE
// =====================================
const assignStage = async (userId, stageId, data) => {
    const stage = await Stage_1.default.findOne({
        _id: stageId,
        isDeleted: false,
    });
    if (!stage) {
        throw (0, CreateError_1.CreateError)("Etapa no encontrada", 404);
    }
    stage.assignedTo = new mongoose_1.default.Types.ObjectId(data.assignedTo);
    stage.assignedBy = new mongoose_1.default.Types.ObjectId(userId);
    await stage.save();
    await (0, activities_service_1.createActivity)({
        userId: userId.toString(),
        caseId: stage.caseId.toString(),
        stageId: stage._id.toString(),
        action: activities_1.ACTIVITY_ACTIONS.STAGE_ASSIGNED,
        description: "Etapa asignada",
        metadata: {
            assignedTo: data.assignedTo,
        },
    });
    return stage;
};
exports.assignStage = assignStage;
// =====================================
// REORDER STAGE
// =====================================
const reorderStage = async (stageId, data) => {
    const stage = await Stage_1.default.findOne({
        _id: stageId,
        isDeleted: false,
    });
    if (!stage) {
        throw (0, CreateError_1.CreateError)("Etapa no encontrada", 404);
    }
    stage.order = data.order;
    await stage.save();
    return stage;
};
exports.reorderStage = reorderStage;
//# sourceMappingURL=stages.service.js.map