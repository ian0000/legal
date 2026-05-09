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
exports.getClientStats = exports.getClientCases = exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClients = exports.createClient = void 0;
const clientService = __importStar(require("./clients.service"));
// =====================================
// CREATE CLIENT
// =====================================
const createClient = async (req, res, next) => {
    try {
        const client = await clientService.createClient(req.body, req.user.id);
        res.status(201).json(client);
    }
    catch (error) {
        next(error);
    }
};
exports.createClient = createClient;
// =====================================
// GET CLIENTS
// =====================================
const getClients = async (req, res, next) => {
    try {
        const result = await clientService.getClients(req.query);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.getClients = getClients;
// =====================================
// GET CLIENT BY ID
// =====================================
const getClientById = async (req, res, next) => {
    try {
        const client = await clientService.getClientById(req.params.id);
        res.status(200).json(client);
    }
    catch (error) {
        next(error);
    }
};
exports.getClientById = getClientById;
// =====================================
// UPDATE CLIENT
// =====================================
const updateClient = async (req, res, next) => {
    try {
        const client = await clientService.updateClient(req.params.id, req.body);
        res.status(200).json(client);
    }
    catch (error) {
        next(error);
    }
};
exports.updateClient = updateClient;
// =====================================
// DELETE CLIENT
// =====================================
const deleteClient = async (req, res, next) => {
    try {
        const result = await clientService.deleteClient(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteClient = deleteClient;
// =====================================
// GET CLIENT CASES
// =====================================
const getClientCases = async (req, res, next) => {
    try {
        const cases = await clientService.getClientCases(req.params.id);
        res.status(200).json(cases);
    }
    catch (error) {
        next(error);
    }
};
exports.getClientCases = getClientCases;
// =====================================
// GET CLIENT STATS
// =====================================
const getClientStats = async (req, res, next) => {
    try {
        const stats = await clientService.getClientStats(req.params.id);
        res.status(200).json(stats);
    }
    catch (error) {
        next(error);
    }
};
exports.getClientStats = getClientStats;
//# sourceMappingURL=clients.controller.js.map