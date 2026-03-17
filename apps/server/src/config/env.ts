import dotenv from "dotenv";
import { z } from "zod";

// 🔥 Cargar entorno según NODE_ENV
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),

  PORT: z
    .string()
    .default("3000")
    .transform((val) => Number(val)),

  DATABASE_URL: z.string().min(1),

  JWT_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  FRONTEND_URL: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
