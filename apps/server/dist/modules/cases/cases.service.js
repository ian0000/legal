"use strict";
// =====================================
// CREATE CASE
// =====================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCase = exports.updateCase = exports.getCaseById = exports.getCases = exports.createCase = void 0;
const activities_1 = require("@legal/shared/src/types/activities");
const Case_1 = __importDefault(require("../../models/Case"));
const Client_1 = __importDefault(require("../../models/Client"));
const User_1 = __importDefault(require("../../models/User"));
const CreateError_1 = require("../../utils/CreateError");
const activities_service_1 = require("../activities/activities.service");
const createCase = async (data) => {
    if (!data.code?.trim()) {
        throw (0, CreateError_1.CreateError)("El código es obligatorio", 400);
    }
    if (!data.title?.trim()) {
        throw (0, CreateError_1.CreateError)("El título es obligatorio", 400);
    }
    const normalizedCode = data.code.trim().toUpperCase();
    const existingCase = await Case_1.default.findOne({
        code: normalizedCode,
        isDeleted: false,
    });
    if (existingCase) {
        throw (0, CreateError_1.CreateError)("Ya existe un caso con ese código", 409);
    }
    const client = await Client_1.default.findById(data.clientId);
    if (!client) {
        throw (0, CreateError_1.CreateError)("Cliente no encontrado", 404);
    }
    const lawyer = await User_1.default.findById(data.principalLawyerId);
    if (!lawyer) {
        throw (0, CreateError_1.CreateError)("Abogado principal no encontrado", 404);
    }
    if (data.assignedUsers?.length) {
        const users = await User_1.default.find({
            _id: {
                $in: data.assignedUsers,
            },
        });
        if (users.length !== data.assignedUsers.length) {
            throw (0, CreateError_1.CreateError)("Uno o más usuarios asignados no existen", 404);
        }
    }
    const newCase = await Case_1.default.create({
        code: normalizedCode,
        title: data.title,
        description: data.description,
        type: data.type,
        clientId: data.clientId,
        createdBy: data.createdBy,
        principalLawyerId: data.principalLawyerId,
        assignedUsers: data.assignedUsers || [],
        priority: data.priority,
        startDate: data.startDate,
        estimatedEndDate: data.estimatedEndDate,
        tags: data.tags || [],
    });
    await (0, activities_service_1.createActivity)({
        userId: data.createdBy,
        caseId: newCase._id.toString(),
        action: activities_1.ACTIVITY_ACTIONS.CASE_CREATED,
        description: `Caso ${newCase.code} creado`,
    });
    return newCase;
};
exports.createCase = createCase;
// =====================================
// GET CASES
// =====================================
const getCases = async (filters = {}) => {
    const query = {
        isDeleted: false,
    };
    if (filters.status) {
        query.status = filters.status;
    }
    if (filters.clientId) {
        query.clientId = filters.clientId;
    }
    if (filters.principalLawyerId) {
        query.principalLawyerId = filters.principalLawyerId;
    }
    if (filters.priority) {
        query.priority = filters.priority;
    }
    if (filters.search) {
        query.$or = [
            {
                title: {
                    $regex: filters.search,
                    $options: "i",
                },
            },
            {
                code: {
                    $regex: filters.search,
                    $options: "i",
                },
            },
        ];
    }
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const skip = (page - 1) * limit;
    const [cases, total] = await Promise.all([
        Case_1.default.find(query)
            .populate("clientId")
            .populate("principalLawyerId")
            .populate("assignedUsers")
            .populate("currentStageId")
            .sort({
            createdAt: -1,
        })
            .skip(skip)
            .limit(limit),
        Case_1.default.countDocuments(query),
    ]);
    return {
        data: cases,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getCases = getCases;
// =====================================
// GET CASE BY ID
// =====================================
const getCaseById = async (caseId) => {
    const legalCase = await Case_1.default.findOne({
        _id: caseId,
        isDeleted: false,
    })
        .populate("clientId")
        .populate("principalLawyerId")
        .populate("assignedUsers")
        .populate("currentStageId");
    if (!legalCase) {
        throw (0, CreateError_1.CreateError)("Caso no encontrado", 404);
    }
    return legalCase;
};
exports.getCaseById = getCaseById;
// =====================================
// UPDATE CASE
// =====================================
const updateCase = async (caseId, data) => {
    const legalCase = await Case_1.default.findOne({
        _id: caseId,
        isDeleted: false,
    });
    if (!legalCase) {
        throw (0, CreateError_1.CreateError)("Caso no encontrado", 404);
    }
    const previousStatus = legalCase.status;
    Object.assign(legalCase, data);
    await legalCase.save();
    await (0, activities_service_1.createActivity)({
        userId: String(legalCase.createdBy),
        caseId: String(legalCase._id),
        action: activities_1.ACTIVITY_ACTIONS.CASE_STATUS_CHANGED,
        description: `Estado cambiado a ${data.status}`,
    });
    if (data.status && data.status !== previousStatus) {
        await (0, activities_service_1.createActivity)({
            userId: String(legalCase.createdBy),
            caseId: String(legalCase._id),
            action: activities_1.ACTIVITY_ACTIONS.CASE_STATUS_CHANGED,
            description: `Estado cambiado a ${data.status}`,
        });
    }
    return legalCase;
};
exports.updateCase = updateCase;
// =====================================
// DELETE CASE
// =====================================
const deleteCase = async (caseId, deletedBy) => {
    const legalCase = await Case_1.default.findOne({
        _id: caseId,
        isDeleted: false,
    });
    if (!legalCase) {
        throw (0, CreateError_1.CreateError)("Caso no encontrado", 404);
    }
    legalCase.isDeleted = true;
    legalCase.deletedAt = new Date();
    legalCase.deletedBy = deletedBy;
    await legalCase.save();
    await (0, activities_service_1.createActivity)({
        userId: deletedBy,
        caseId: legalCase._id.toString(),
        action: activities_1.ACTIVITY_ACTIONS.CASE_DELETED,
        description: `Caso ${legalCase.code} eliminado`,
    });
    return {
        message: "Caso eliminado correctamente",
    };
};
exports.deleteCase = deleteCase;
//# sourceMappingURL=cases.service.js.map