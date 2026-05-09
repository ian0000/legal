import Activity from "../../models/Activities";

import type { CreateActivityDTO } from "@legal/shared/src/schemas/activities.schema";

import { CreateError } from "../../utils/CreateError";

interface GetActivitiesFilters {
  caseId?: string;
  userId?: string;
  action?: string;

  page?: number;
  limit?: number;
}

export const createActivity = async (data: CreateActivityDTO) => {
  return await Activity.create(data);
};

export const getActivities = async (filters: GetActivitiesFilters) => {
  const page = Number(filters.page) || 1;

  const limit = Number(filters.limit) || 20;

  const skip = (page - 1) * limit;

  const query: any = {
    isDeleted: false,
  };

  if (filters.caseId) {
    query.caseId = filters.caseId;
  }

  if (filters.userId) {
    query.userId = filters.userId;
  }

  if (filters.action) {
    query.action = filters.action;
  }

  const [activities, total] = await Promise.all([
    Activity.find(query)
      .populate("userId", "firstName lastName email")
      .populate("caseId", "title code")
      .populate("stageId", "title")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    Activity.countDocuments(query),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),

    data: activities,
  };
};

export const getCaseActivities = async (caseId: string) => {
  return await Activity.find({
    caseId,
    isDeleted: false,
  })
    .populate("userId", "firstName lastName email")
    .populate("stageId", "title")
    .sort({
      createdAt: -1,
    });
};

export const getActivityById = async (activityId: string) => {
  const activity = await Activity.findOne({
    _id: activityId,
    isDeleted: false,
  })
    .populate("userId", "firstName lastName email")
    .populate("caseId", "title code")
    .populate("stageId", "title");

  if (!activity) {
    throw CreateError("Actividad no encontrada", 404);
  }

  return activity;
};

export const deleteActivity = async (activityId: string) => {
  const activity = await Activity.findOne({
    _id: activityId,
    isDeleted: false,
  });

  if (!activity) {
    throw CreateError("Actividad no encontrada", 404);
  }

  activity.isDeleted = true;

  activity.deletedAt = new Date();

  await activity.save();

  return;
};
