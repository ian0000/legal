import swaggerJsdoc from "swagger-jsdoc";
import { env } from "./env";
import { swaggerSchemas } from "./swagger.schemas";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Legal API",
      version: "1.0.0",
      description: "API documentation for Legal backend",
    },

    servers: [
      {
        url: `http://localhost:${env.PORT}/api`,
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: swaggerSchemas,
    },

    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  apis: ["./src/modules/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
