"use strict";
// src/modules/cases/cases.controller.ts
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
exports.deleteCase = exports.updateCase = exports.getCaseById = exports.getCases = exports.createCase = void 0;
const casesService = __importStar(require("./cases.service"));
// =====================================
// CREATE CASE
// =====================================
const createCase = async (req, res, next) => {
    try {
        const newCase = await casesService.createCase({
            ...req.body,
            createdBy: req.user.id,
        });
        res.status(201).json(newCase);
    }
    catch (error) {
        next(error);
    }
};
exports.createCase = createCase;
// =====================================
// GET CASES
// =====================================
const getCases = async (req, res, next) => {
    try {
        const cases = await casesService.getCases(req.query);
        res.status(200).json(cases);
    }
    catch (error) {
        next(error);
    }
};
exports.getCases = getCases;
// =====================================
// GET CASE BY ID
// =====================================
const getCaseById = async (req, res, next) => {
    try {
        const legalCase = await casesService.getCaseById(req.params.id);
        res.status(200).json(legalCase);
    }
    catch (error) {
        next(error);
    }
};
exports.getCaseById = getCaseById;
// =====================================
// UPDATE CASE
// =====================================
const updateCase = async (req, res, next) => {
    try {
        const updatedCase = await casesService.updateCase(req.params.id, req.body);
        res.status(200).json(updatedCase);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCase = updateCase;
// =====================================
// DELETE CASE
// =====================================
const deleteCase = async (req, res, next) => {
    try {
        const result = await casesService.deleteCase(req.params.id, req.user.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCase = deleteCase;
//# sourceMappingURL=cases.controller.js.map