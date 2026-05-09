"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_user_routes_1 = __importDefault(require("./modules/auth/auth.user.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
exports.app = (0, express_1.default)();
exports.app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
exports.app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
exports.app.use((0, helmet_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
exports.app.use("/api/auth", auth_user_routes_1.default);
// 🔹 Error handler (MUY importante)
exports.app.use((err, _req, res, _next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
//# sourceMappingURL=app.js.map