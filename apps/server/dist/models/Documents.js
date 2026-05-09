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
const mongoose_1 = __importStar(require("mongoose"));
// =====================================
// DTOs
// =====================================
// =====================================
// SCHEMA
// =====================================
const DocumentSchema = new mongoose_1.Schema({
    caseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Case",
        required: true,
        index: true,
    },
    uploadedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    stageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CaseStage",
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    originalName: {
        type: String,
        required: true,
        trim: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    file: {
        type: Buffer,
        required: true,
    },
    visibility: {
        type: String,
        default: "internal",
    },
    documentType: {
        type: String,
    },
    tags: [
        {
            type: String,
        },
    ],
    version: {
        type: Number,
        default: 1,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
DocumentSchema.index({
    caseId: 1,
    stageId: 1,
    uploadedBy: 1,
    isDeleted: 1,
});
const Document = mongoose_1.default.model("Document", DocumentSchema);
exports.default = Document;
//# sourceMappingURL=Documents.js.map