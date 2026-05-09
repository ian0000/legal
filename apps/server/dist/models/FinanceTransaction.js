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
const FinanceTransactionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
        index: true,
    },
    category: {
        type: String,
        required: true,
        index: true,
    },
    method: {
        type: String,
        enum: ["cash", "transfer", "card", "check", "other"],
        default: "cash",
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "completed",
    },
    reference: {
        type: String,
    },
    attachments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Document",
        },
    ],
    transactionDate: {
        type: Date,
        default: Date.now,
        index: true,
    },
    registeredBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    deletedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    relatedCaseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Case",
    },
    sourceType: {
        type: String,
        enum: ["manual", "case_payment"],
        default: "manual",
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true,
    },
    deletedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
FinanceTransactionSchema.index({
    type: 1,
    category: 1,
    transactionDate: -1,
});
const FinanceTransaction = mongoose_1.default.model("FinanceTransaction", FinanceTransactionSchema);
exports.default = FinanceTransaction;
//# sourceMappingURL=FinanceTransaction.js.map