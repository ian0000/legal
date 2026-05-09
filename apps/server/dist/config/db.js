"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
let isConnected = false;
const connectDB = async () => {
    if (isConnected)
        return;
    await mongoose_1.default.connect(env_1.env.DATABASE_URL);
    isConnected = true;
    console.log(`Mongo connected (${env_1.env.NODE_ENV})`);
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    if (!isConnected)
        return;
    await mongoose_1.default.disconnect();
    isConnected = false;
};
exports.disconnectDB = disconnectDB;
//# sourceMappingURL=db.js.map