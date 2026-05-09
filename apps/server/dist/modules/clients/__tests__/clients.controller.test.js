"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const controller = __importStar(require("../clients.controller"));
const clientService = __importStar(require("../clients.service"));
jest.mock("../clients.service");
describe("Client Controller", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // =====================================
    // CREATE CLIENT
    // =====================================
    describe("createClient", () => {
        it("should create client", async () => {
            const req = {
                body: {
                    firstName: "Ian",
                },
                user: {
                    id: "1",
                },
            };
            await controller.createClient(req, res, next);
            expect(clientService.createClient).toHaveBeenCalledWith(req.body, "1");
            expect(res.status).toHaveBeenCalledWith(201);
        });
    });
    // =====================================
    // GET CLIENTS
    // =====================================
    describe("getClients", () => {
        it("should return clients", async () => {
            const req = {
                query: {},
            };
            await controller.getClients(req, res, next);
            expect(clientService.getClients).toHaveBeenCalled();
        });
    });
    // =====================================
    // GET CLIENT BY ID
    // =====================================
    describe("getClientById", () => {
        it("should return client", async () => {
            const req = {
                params: {
                    id: "1",
                },
            };
            await controller.getClientById(req, res, next);
            expect(clientService.getClientById).toHaveBeenCalledWith("1");
        });
    });
    // =====================================
    // UPDATE CLIENT
    // =====================================
    describe("updateClient", () => {
        it("should update client", async () => {
            const req = {
                params: {
                    id: "1",
                },
                body: {
                    firstName: "Updated",
                },
            };
            await controller.updateClient(req, res, next);
            expect(clientService.updateClient).toHaveBeenCalledWith("1", req.body);
        });
    });
    // =====================================
    // DELETE CLIENT
    // =====================================
    describe("deleteClient", () => {
        it("should delete client", async () => {
            const req = {
                params: {
                    id: "1",
                },
            };
            await controller.deleteClient(req, res, next);
            expect(clientService.deleteClient).toHaveBeenCalledWith("1");
        });
    });
    // =====================================
    // GET CLIENT CASES
    // =====================================
    describe("getClientCases", () => {
        it("should return client cases", async () => {
            const req = {
                params: {
                    id: "1",
                },
            };
            await controller.getClientCases(req, res, next);
            expect(clientService.getClientCases).toHaveBeenCalledWith("1");
        });
    });
    // =====================================
    // GET CLIENT STATS
    // =====================================
    describe("getClientStats", () => {
        it("should return client stats", async () => {
            const req = {
                params: {
                    id: "1",
                },
            };
            await controller.getClientStats(req, res, next);
            expect(clientService.getClientStats).toHaveBeenCalledWith("1");
        });
    });
});
//# sourceMappingURL=clients.controller.test.js.map