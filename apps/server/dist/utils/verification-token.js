"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerificationToken = exports.createVerificationToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Token_1 = __importDefault(require("../models/Token"));
const token_1 = require("./token");
const CreateError_1 = require("./CreateError");
const createVerificationToken = async (userId, type) => {
    await Token_1.default.deleteMany({
        user: userId,
        type,
    });
    const rawToken = (0, token_1.generateToken)();
    const hashedToken = crypto_1.default.createHash("sha256").update(rawToken).digest("hex");
    const token = await Token_1.default.create({
        token: hashedToken,
        user: userId,
        type,
    });
    return {
        rawToken,
        token,
    };
};
exports.createVerificationToken = createVerificationToken;
const validateVerificationToken = async (rawToken, type) => {
    const hashedToken = crypto_1.default.createHash("sha256").update(rawToken).digest("hex");
    const token = await Token_1.default.findOne({
        token: hashedToken,
        type,
    });
    if (!token) {
        throw (0, CreateError_1.CreateError)("Token no válido o expirado", 401);
    }
    if (token.usedAt) {
        throw (0, CreateError_1.CreateError)("Token ya utilizado", 401);
    }
    return token;
};
exports.validateVerificationToken = validateVerificationToken;
//# sourceMappingURL=verification-token.js.map