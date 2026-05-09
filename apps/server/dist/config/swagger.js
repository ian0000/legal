"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("./env");
const swagger_schemas_1 = require("./swagger.schemas");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Legal API",
            version: "1.0.0",
            description: "API documentation for Legal backend",
        },
        servers: [
            {
                url: `http://localhost:${env_1.env.PORT}/api`,
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
            schemas: swagger_schemas_1.swaggerSchemas,
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ["./src/modules/**/*.ts"],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map