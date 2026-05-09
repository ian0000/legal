"use strict";
// =====================================
// CREATE CLIENT
// =====================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientStats = exports.getClientCases = exports.deleteClient = exports.updateClient = exports.getClientById = exports.getClients = exports.createClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Client_1 = __importDefault(require("../../models/Client"));
const CreateError_1 = require("../../utils/CreateError");
const Case_1 = __importDefault(require("../../models/Case"));
const cases_1 = require("@legal/shared/src/types/cases");
const User_1 = __importDefault(require("../../models/User"));
const verification_token_1 = require("../../utils/verification-token");
const auth_email_service_1 = require("../auth/auth.email.service");
const roles_1 = require("@legal/shared/src/types/roles");
const tokens_1 = require("@legal/shared/src/types/tokens");
const createClient = async (data, createdBy) => {
    const existingClient = await Client_1.default.findOne({
        cedula: data.cedula,
    });
    if (existingClient) {
        throw (0, CreateError_1.CreateError)("Ya existe un cliente con esta cédula", 409);
    }
    const existingUser = await User_1.default.findOne({
        email: data.email,
    });
    if (existingUser) {
        throw (0, CreateError_1.CreateError)("Ya existe un usuario con este email", 409);
    }
    const user = await User_1.default.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: roles_1.USER_ROLES.CLIENT,
        isConfirmed: false,
        isActive: true,
    });
    const client = await Client_1.default.create({
        ...data,
        userId: user._id,
        createdBy,
    });
    const verification = await (0, verification_token_1.createVerificationToken)(user._id.toString(), tokens_1.TOKEN_TYPES.ACCOUNT_SETUP);
    await auth_email_service_1.AuthEmail.sendConfirmationEmail({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: verification.rawToken,
    });
    return client;
};
exports.createClient = createClient;
// =====================================
// GET CLIENTS
// =====================================
const getClients = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const filters = {};
    // =====================================
    // SEARCH
    // =====================================
    if (query.search) {
        filters.$or = [
            {
                firstName: {
                    $regex: query.search,
                    $options: "i",
                },
            },
            {
                lastName: {
                    $regex: query.search,
                    $options: "i",
                },
            },
            {
                cedula: {
                    $regex: query.search,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: query.search,
                    $options: "i",
                },
            },
        ];
    }
    // =====================================
    // ACTIVE FILTER
    // =====================================
    if (query.isActive !== undefined) {
        filters.isActive = query.isActive;
    }
    const [clients, total] = await Promise.all([
        Client_1.default.find(filters)
            .sort({
            createdAt: -1,
        })
            .skip(skip)
            .limit(limit)
            .populate("userId", "firstName lastName email")
            .lean(),
        Client_1.default.countDocuments(filters),
    ]);
    return {
        clients,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getClients = getClients;
// =====================================
// GET CLIENT BY ID
// =====================================
const getClientById = async (clientId) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(clientId)) {
        throw (0, CreateError_1.CreateError)("Cliente inválido", 400);
    }
    const client = await Client_1.default.findById(clientId)
        .populate("userId", "firstName lastName email")
        .populate("createdBy", "firstName lastName email")
        .lean();
    if (!client) {
        throw (0, CreateError_1.CreateError)("Cliente no encontrado", 404);
    }
    return client;
};
exports.getClientById = getClientById;
// =====================================
// UPDATE CLIENT
// =====================================
const updateClient = async (clientId, data) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(clientId)) {
        throw (0, CreateError_1.CreateError)("Cliente inválido", 400);
    }
    const client = await Client_1.default.findById(clientId);
    if (!client) {
        throw (0, CreateError_1.CreateError)("Cliente no encontrado", 404);
    }
    // =====================================
    // VALIDATE CEDULA
    // =====================================
    if (data.cedula && data.cedula !== client.cedula) {
        const cedulaExists = await Client_1.default.findOne({
            cedula: data.cedula,
        });
        if (cedulaExists) {
            throw (0, CreateError_1.CreateError)("La cédula ya está registrada", 409);
        }
        client.cedula = data.cedula;
    }
    if (data.email && data.email !== client.email) {
        const emailExists = await Client_1.default.findOne({
            email: data.email,
            _id: {
                $ne: client._id,
            },
        });
        if (emailExists) {
            throw (0, CreateError_1.CreateError)("El email ya está registrado", 409);
        }
        client.email = data.email;
    }
    // =====================================
    // UPDATE FIELDS
    // =====================================
    if (data.firstName !== undefined) {
        client.firstName = data.firstName;
    }
    if (data.lastName !== undefined) {
        client.lastName = data.lastName;
    }
    if (data.email !== undefined) {
        client.email = data.email;
    }
    if (data.phone !== undefined) {
        client.phone = data.phone;
    }
    if (data.address !== undefined) {
        client.address = data.address;
    }
    if (data.notes !== undefined) {
        client.notes = data.notes;
    }
    if (data.userId !== undefined && data.userId) {
        client.userId = new mongoose_1.default.Types.ObjectId(data.userId);
    }
    if (data.isActive !== undefined) {
        client.isActive = data.isActive;
    }
    await client.save();
    return client;
};
exports.updateClient = updateClient;
// =====================================
// DELETE CLIENT (SOFT DELETE)
// =====================================
const deleteClient = async (clientId) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(clientId)) {
        throw (0, CreateError_1.CreateError)("Cliente inválido", 400);
    }
    const client = await Client_1.default.findById(clientId);
    if (!client) {
        throw (0, CreateError_1.CreateError)("Cliente no encontrado", 404);
    }
    client.isActive = false;
    await client.save();
    return {
        message: "Cliente desactivado correctamente",
    };
};
exports.deleteClient = deleteClient;
// =====================================
// GET CLIENT CASES
// =====================================
const getClientCases = async (clientId) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(clientId)) {
        throw (0, CreateError_1.CreateError)("Cliente inválido", 400);
    }
    const cases = await Case_1.default.find({
        clientId,
    })
        .populate("principalLawyerId", "firstName lastName email")
        .populate("currentStageId")
        .sort({
        createdAt: -1,
    })
        .lean();
    return cases;
};
exports.getClientCases = getClientCases;
// =====================================
// GET CLIENT STATS
// =====================================
const getClientStats = async (clientId) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(clientId)) {
        throw (0, CreateError_1.CreateError)("Cliente inválido", 400);
    }
    const cases = await Case_1.default.find({
        clientId,
    }).lean();
    const totalCases = cases.length;
    const activeCases = cases.filter((item) => item.status === cases_1.CASE_STATUS.ACTIVE).length;
    const completedCases = cases.filter((item) => item.status === cases_1.CASE_STATUS.COMPLETED).length;
    const totalPaid = cases.reduce((acc, item) => acc + item.financialSummary.totalPaid, 0);
    const pendingAmount = cases.reduce((acc, item) => acc + item.financialSummary.pendingAmount, 0);
    return {
        totalCases,
        activeCases,
        completedCases,
        totalPaid,
        pendingAmount,
    };
};
exports.getClientStats = getClientStats;
//# sourceMappingURL=clients.service.js.map