"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
// 🔥 Cargar entorno según NODE_ENV
dotenv_1.default.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["dev", "test", "production"]).default("dev"),
    PORT: zod_1.z
        .string()
        .default("3000")
        .transform((val) => Number(val)),
    DATABASE_URL: zod_1.z.string().min(1),
    JWT_SECRET: zod_1.z.string().min(1),
    RESEND_API_KEY: zod_1.z.string().min(1),
    FRONTEND_URL: zod_1.z.string().min(1),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Invalid environment variables");
    console.error(parsed.error.format());
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map