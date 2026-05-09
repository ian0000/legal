// =====================================
// CREATE CLIENT
// =====================================

import mongoose from "mongoose";

import Client from "../../models/Client";

import type {
  CreateClientDTO,
  GetClientsQueryDTO,
  UpdateClientDTO,
} from "@legal/shared/src/schemas/clients.schema";
import { CreateError } from "../../utils/CreateError";
import Case from "../../models/Case";
import { CASE_STATUS } from "@legal/shared/src/types/cases";
import User from "../../models/User";
import { createVerificationToken } from "../../utils/verification-token";
import { AuthEmail } from "../auth/auth.email.service";
import { USER_ROLES } from "@legal/shared/src/types/roles";
import { TOKEN_TYPES } from "@legal/shared/src/types/tokens";

export const createClient = async (data: CreateClientDTO, createdBy: string) => {
  const existingClient = await Client.findOne({
    cedula: data.cedula,
  });

  if (existingClient) {
    throw CreateError("Ya existe un cliente con esta cédula", 409);
  }

  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw CreateError("Ya existe un usuario con este email", 409);
  }

  const user = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: USER_ROLES.CLIENT,
    isConfirmed: false,
    isActive: true,
  });

  const client = await Client.create({
    ...data,
    userId: user._id,
    createdBy,
  });

  const verification = await createVerificationToken(
    user._id.toString(),
    TOKEN_TYPES.ACCOUNT_SETUP,
  );

  await AuthEmail.sendConfirmationEmail({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token: verification.rawToken,
  });

  return client;
};

// =====================================
// GET CLIENTS
// =====================================

export const getClients = async (query: GetClientsQueryDTO) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const filters: any = {};

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
    Client.find(filters)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .populate("userId", "firstName lastName email")
      .lean(),

    Client.countDocuments(filters),
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

// =====================================
// GET CLIENT BY ID
// =====================================

export const getClientById = async (clientId: string) => {
  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    throw CreateError("Cliente inválido", 400);
  }

  const client = await Client.findById(clientId)
    .populate("userId", "firstName lastName email")
    .populate("createdBy", "firstName lastName email")
    .lean();

  if (!client) {
    throw CreateError("Cliente no encontrado", 404);
  }

  return client;
};

// =====================================
// UPDATE CLIENT
// =====================================

export const updateClient = async (clientId: string, data: UpdateClientDTO) => {
  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    throw CreateError("Cliente inválido", 400);
  }

  const client = await Client.findById(clientId);

  if (!client) {
    throw CreateError("Cliente no encontrado", 404);
  }

  // =====================================
  // VALIDATE CEDULA
  // =====================================

  if (data.cedula && data.cedula !== client.cedula) {
    const cedulaExists = await Client.findOne({
      cedula: data.cedula,
    });

    if (cedulaExists) {
      throw CreateError("La cédula ya está registrada", 409);
    }

    client.cedula = data.cedula;
  }
  if (data.email && data.email !== client.email) {
    const emailExists = await Client.findOne({
      email: data.email,
      _id: {
        $ne: client._id,
      },
    });

    if (emailExists) {
      throw CreateError("El email ya está registrado", 409);
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
    client.userId = new mongoose.Types.ObjectId(data.userId);
  }

  if (data.isActive !== undefined) {
    client.isActive = data.isActive;
  }

  await client.save();

  return client;
};

// =====================================
// DELETE CLIENT (SOFT DELETE)
// =====================================

export const deleteClient = async (clientId: string) => {
  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    throw CreateError("Cliente inválido", 400);
  }

  const client = await Client.findById(clientId);

  if (!client) {
    throw CreateError("Cliente no encontrado", 404);
  }

  client.isActive = false;

  await client.save();

  return {
    message: "Cliente desactivado correctamente",
  };
};

// =====================================
// GET CLIENT CASES
// =====================================

export const getClientCases = async (clientId: string) => {
  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    throw CreateError("Cliente inválido", 400);
  }

  const cases = await Case.find({
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

// =====================================
// GET CLIENT STATS
// =====================================

export const getClientStats = async (clientId: string) => {
  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    throw CreateError("Cliente inválido", 400);
  }

  const cases = await Case.find({
    clientId,
  }).lean();

  const totalCases = cases.length;

  const activeCases = cases.filter((item) => item.status === CASE_STATUS.ACTIVE).length;

  const completedCases = cases.filter((item) => item.status === CASE_STATUS.COMPLETED).length;

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
