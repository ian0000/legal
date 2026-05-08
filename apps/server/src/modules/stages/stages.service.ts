// =====================================
// CREATE STAGE
// =====================================

import mongoose from "mongoose";
import CaseStage, {
  AssignCaseStageDTO,
  CreateCaseStageDTO,
  ReorderCaseStageDTO,
  UpdateCaseStageDTO,
  UpdateCaseStageStatusDTO,
} from "../../models/Stage";
import { CreateError } from "../../utils/CreateError";
import Case, { UpdateCaseDTO } from "../../models/Case";
import { CASE_STAGE_STATUS } from "@legal/shared/src/types/roles";
import Activity from "../../models/Activities";

export const createStage = async (userId: string, data: CreateCaseStageDTO) => {
  const existingCase = await Case.findById(data.caseId);

  if (!existingCase) {
    throw CreateError("Caso no encontrado", 404);
  }

  const lastStage = await CaseStage.findOne({
    caseId: data.caseId,
    isDeleted: false,
  }).sort({
    order: -1,
  });

  const nextOrder = lastStage ? lastStage.order + 1 : 1;

  const stage = await CaseStage.create({
    caseId: data.caseId,

    title: data.title,

    description: data.description,

    assignedTo: data.assignedTo,

    assignedBy: data.assignedTo ? userId : undefined,

    priority: data.priority,

    estimatedDays: data.estimatedDays,

    dueDate: data.dueDate,

    dependsOn: data.dependsOn,

    isFinalStage: data.isFinalStage,

    order: nextOrder,

    status: CASE_STAGE_STATUS.PENDING,
  });

  if (!existingCase.currentStageId) {
    existingCase.currentStageId = stage._id;

    await existingCase.save();
  }

  await createActivity(
    userId,
    "CASE_STAGE_CREATED",
    data.caseId,
    stage._id.toString(),
    `Etapa creada: ${stage.title}`,
  );

  return stage;
};

// =====================================
// GET CASE STAGES
// =====================================

export const getCaseStages = async (caseId: string) => {
  return await CaseStage.find({
    caseId,
    isDeleted: false,
  })
    .populate("assignedTo", "firstName lastName email")
    .populate("assignedBy", "firstName lastName email")
    .sort({
      order: 1,
    });
};

// =====================================
// GET STAGE BY ID
// =====================================

export const getStageById = async (stageId: string) => {
  const stage = await CaseStage.findOne({
    _id: stageId,
    isDeleted: false,
  })
    .populate("assignedTo", "firstName lastName email")
    .populate("assignedBy", "firstName lastName email");

  if (!stage) {
    throw CreateError("Etapa no encontrada", 404);
  }

  return stage;
};

// =====================================
// UPDATE STAGE
// =====================================

export const updateStage = async (stageId: string, data: UpdateCaseStageDTO) => {
  const stage = await CaseStage.findOne({
    _id: stageId,
    isDeleted: false,
  });

  if (!stage) {
    throw CreateError("Etapa no encontrada", 404);
  }

  Object.assign(stage, data);

  if (data.assignedTo) {
    stage.assignedBy = new mongoose.Types.ObjectId(stage.assignedBy);
  }

  await stage.save();

  return stage;
};

// =====================================
// DELETE STAGE (SOFT)
// =====================================

export const deleteStage = async (stageId: string) => {
  const stage = await CaseStage.findOne({
    _id: stageId,
    isDeleted: false,
  });

  if (!stage) {
    throw CreateError("Etapa no encontrada", 404);
  }

  stage.isDeleted = true;

  stage.deletedAt = new Date();

  await stage.save();

  return {
    message: "Etapa eliminada correctamente",
  };
};

// =====================================
// UPDATE STATUS
// =====================================

export const updateStageStatus = async (
  userId: string,
  stageId: string,
  data: UpdateCaseStageStatusDTO,
) => {
  const stage = await CaseStage.findOne({
    _id: stageId,
    isDeleted: false,
  });

  if (!stage) {
    throw CreateError("Etapa no encontrada", 404);
  }

  stage.status = data.status;

  if (data.status === CASE_STAGE_STATUS.IN_PROGRESS) {
    stage.startedAt = new Date();
  }

  if (data.status === CASE_STAGE_STATUS.COMPLETED) {
    stage.completedAt = new Date();

    const nextStage = await CaseStage.findOne({
      caseId: stage.caseId,
      order: stage.order + 1,
    });

    if (nextStage) {
      await Case.findByIdAndUpdate(stage.caseId, {
        currentStageId: nextStage._id,
      });
    }
  }

  if (data.delayReason) {
    stage.delayReason = data.delayReason;
  }

  await stage.save();

  await createActivity(
    userId,
    "CASE_STAGE_STATUS_UPDATED",
    stage.caseId.toString(),
    stage._id.toString(),
    `Estado actualizado a ${data.status}`,
  );

  return stage;
};

// =====================================
// ASSIGN STAGE
// =====================================

export const assignStage = async (userId: string, stageId: string, data: AssignCaseStageDTO) => {
  const stage = await CaseStage.findOne({
    _id: stageId,
    isDeleted: false,
  });
  if (!stage) {
    throw CreateError("Etapa no encontrada", 404);
  }

  stage.assignedTo = new mongoose.Types.ObjectId(data.assignedTo);

  stage.assignedBy = new mongoose.Types.ObjectId(userId);

  await stage.save();

  await createActivity(
    userId,
    "CASE_STAGE_ASSIGNED",
    stage.caseId.toString(),
    stage._id.toString(),
    "Etapa asignada",
  );

  return stage;
};

// =====================================
// REORDER STAGE
// =====================================

export const reorderStage = async (stageId: string, data: ReorderCaseStageDTO) => {
  const stage = await CaseStage.findOne({
    _id: stageId,
    isDeleted: false,
  });
  if (!stage) {
    throw CreateError("Etapa no encontrada", 404);
  }

  stage.order = data.order;

  await stage.save();

  return stage;
};

const createActivity = async (
  userId: string,
  action: string,
  caseId: string,
  stageId: string,
  description: string,
) => {
  await Activity.create({
    userId,
    action,
    caseId,
    stageId,
    description,
  });
};
