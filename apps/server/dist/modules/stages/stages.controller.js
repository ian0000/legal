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
exports.reorderStage = exports.assignStage = exports.updateStageStatus = exports.deleteStage = exports.updateStage = exports.getStageById = exports.getCaseStages = exports.createStage = void 0;
const CaseStagesService = __importStar(require("./stages.service"));
// =====================================
// CREATE
// =====================================
const createStage = async (req, res, next) => {
    try {
        const stage = await CaseStagesService.createStage(req.user.id, {
            ...req.body,
            caseId: req.params.caseId,
        });
        res.status(201).json(stage);
    }
    catch (error) {
        next(error);
    }
};
exports.createStage = createStage;
// =====================================
// GET ALL
// =====================================
const getCaseStages = async (req, res, next) => {
    try {
        const stages = await CaseStagesService.getCaseStages(req.params.caseId);
        res.status(200).json(stages);
    }
    catch (error) {
        next(error);
    }
};
exports.getCaseStages = getCaseStages;
// =====================================
// GET ONE
// =====================================
const getStageById = async (req, res, next) => {
    try {
        const stage = await CaseStagesService.getStageById(req.params.id);
        res.status(200).json(stage);
    }
    catch (error) {
        next(error);
    }
};
exports.getStageById = getStageById;
// =====================================
// UPDATE
// =====================================
const updateStage = async (req, res, next) => {
    try {
        const stage = await CaseStagesService.updateStage(req.params.id, req.body);
        res.status(200).json(stage);
    }
    catch (error) {
        next(error);
    }
};
exports.updateStage = updateStage;
// =====================================
// DELETE
// =====================================
const deleteStage = async (req, res, next) => {
    try {
        const result = await CaseStagesService.deleteStage(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteStage = deleteStage;
// =====================================
// UPDATE STATUS
// =====================================
const updateStageStatus = async (req, res, next) => {
    try {
        const stage = await CaseStagesService.updateStageStatus(req.user.id, req.params.id, req.body);
        res.status(200).json(stage);
    }
    catch (error) {
        next(error);
    }
};
exports.updateStageStatus = updateStageStatus;
// =====================================
// ASSIGN
// =====================================
const assignStage = async (req, res, next) => {
    try {
        const stage = await CaseStagesService.assignStage(req.user.id, req.params.id, req.body);
        res.status(200).json(stage);
    }
    catch (error) {
        next(error);
    }
};
exports.assignStage = assignStage;
// =====================================
// REORDER
// =====================================
const reorderStage = async (req, res, next) => {
    try {
        const stage = await CaseStagesService.reorderStage(req.params.id, req.body);
        res.status(200).json(stage);
    }
    catch (error) {
        next(error);
    }
};
exports.reorderStage = reorderStage;
//# sourceMappingURL=stages.controller.js.map