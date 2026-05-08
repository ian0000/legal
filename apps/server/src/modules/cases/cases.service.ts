// =====================================
// CREATE CASE
// =====================================

import Activity from "../../models/Activities";
import Case, { CreateCaseDTO, GetCasesDTO, UpdateCaseDTO } from "../../models/Case";
import Client from "../../models/Client";
import User from "../../models/User";
import { CreateError } from "../../utils/CreateError";
export const createCase = async (data: CreateCaseDTO) => {
  const existingCase = await Case.findOne({
    code: data.code,
  });

  if (existingCase) {
    throw CreateError("Ya existe un caso con ese código", 409);
  }

  const client = await Client.findById(data.clientId);

  if (!client) {
    throw CreateError("Cliente no encontrado", 404);
  }

  const lawyer = await User.findById(data.principalLawyerId);

  if (!lawyer) {
    throw CreateError("Abogado principal no encontrado", 404);
  }

  if (data.assignedUsers?.length) {
    const users = await User.find({
      _id: {
        $in: data.assignedUsers,
      },
    });

    if (users.length !== data.assignedUsers.length) {
      throw CreateError("Uno o más usuarios asignados no existen", 404);
    }
  }

  if (!data.code?.trim()) {
    throw CreateError("El código es obligatorio", 400);
  }

  if (!data.title?.trim()) {
    throw CreateError("El título es obligatorio", 400);
  }
  const normalizedCode = data.code.trim().toUpperCase();
  const newCase = await Case.create({
    code: normalizedCode,

    title: data.title,

    description: data.description,

    type: data.type,

    clientId: data.clientId,

    createdBy: data.createdBy,

    principalLawyerId: data.principalLawyerId,

    assignedUsers: data.assignedUsers || [],

    priority: data.priority,

    startDate: data.startDate,

    estimatedEndDate: data.estimatedEndDate,

    tags: data.tags || [],
  });
  await Activity.create({
    userId: data.createdBy,

    caseId: newCase._id,

    action: "CASE_CREATED",

    description: `Caso ${newCase.code} creado`,
  });
  return newCase;
};

// =====================================
// GET CASES
// =====================================

export const getCases = async (filters: GetCasesDTO = {}) => {
  const query: any = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.clientId) {
    query.clientId = filters.clientId;
  }

  if (filters.principalLawyerId) {
    query.principalLawyerId = filters.principalLawyerId;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }
  const page = Number(filters.page) || 1;

  const limit = Number(filters.limit) || 10;

  const skip = (page - 1) * limit;

  const [cases, total] = await Promise.all([
    Case.find(query)
      .populate("clientId")
      .populate("principalLawyerId")
      .populate("assignedUsers")
      .populate("currentStageId")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    Case.countDocuments(query),
  ]);

  return {
    data: cases,

    pagination: {
      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
    },
  };
};

// =====================================
// GET CASE BY ID
// =====================================

export const getCaseById = async (caseId: string) => {
  const legalCase = await Case.findById(caseId)
    .populate("clientId")
    .populate("principalLawyerId")
    .populate("assignedUsers")
    .populate("currentStageId");

  if (!legalCase) {
    throw CreateError("Caso no encontrado", 404);
  }

  return legalCase;
};

// =====================================
// UPDATE CASE
// =====================================

export const updateCase = async (caseId: string, data: UpdateCaseDTO) => {
  const legalCase = await Case.findById(caseId);

  if (!legalCase) {
    throw CreateError("Caso no encontrado", 404);
  }

  Object.assign(legalCase, data);

  await legalCase.save();

  if (data.status && data.status !== legalCase.status) {
    await Activity.create({
      userId: legalCase.createdBy,

      caseId: legalCase._id,

      action: "CASE_STATUS_CHANGED",

      description: `Estado cambiado a ${data.status}`,
    });
  }
  return legalCase;
};

// =====================================
// DELETE CASE
// =====================================

export const deleteCase = async (caseId: string) => {
  const legalCase = await Case.findById(caseId);

  if (!legalCase) {
    throw CreateError("Caso no encontrado", 404);
  }

  await legalCase.deleteOne();

  return {
    message: "Caso eliminado correctamente",
  };
};
