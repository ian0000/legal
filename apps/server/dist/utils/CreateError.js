"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateError = void 0;
const AppError_1 = require("./AppError");
const CreateError = (message, statusCode) => {
    return new AppError_1.AppError(message, statusCode);
};
exports.CreateError = CreateError;
//# sourceMappingURL=CreateError.js.map