"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tempPassword = exports.generateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateToken = () => {
    return crypto_1.default.randomBytes(32).toString("hex");
};
exports.generateToken = generateToken;
exports.tempPassword = Math.random().toString(36).slice(-8);
//# sourceMappingURL=token.js.map