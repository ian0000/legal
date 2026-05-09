import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authUserRoutes from "./modules/auth/auth.user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

export const app = express();

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Legal API Docs",

    swaggerOptions: {
      url: "/api/docs.json",
    },

    customCss: `
      .topbar-wrapper::after {
        content: 'OpenAPI JSON: /api/docs.json';
        color: white;
        margin-left: 20px;
        font-size: 14px;
      }
    `,
  }),
);
app.get("/api/docs.json", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authUserRoutes);

// 🔹 Error handler (MUY importante)
app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});
