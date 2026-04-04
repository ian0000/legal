import Case, { ICase } from "../../models/Case";
import { Types } from "mongoose";

export const createCase = async (data: Partial<ICase>) => {
  return await Case.create({
    ...data,
    history: [
      {
        action: "Case created",
        by: data.responsibleUser,
      },
    ],
  });
};

export const getAllCases = async () => {
  return await Case.find().populate("client").populate("responsibleUser").populate("notes");
};

export const getCaseById = async (id: string) => {
  return await Case.findById(id).populate("client").populate("responsibleUser").populate("notes");
};

export const updateCase = async (id: string, data: Partial<ICase>, userId: Types.ObjectId) => {
  const caseDoc = await Case.findById(id);
  if (!caseDoc) throw new Error("Case not found");

  Object.assign(caseDoc, data);

  caseDoc.history.push({
    action: "Case updated",
    by: userId,
    at: new Date(),
  });

  return await caseDoc.save();
};

export const updateStatus = async (
  id: string,
  status: "pending" | "in_progress" | "completed",
  userId: Types.ObjectId,
) => {
  const caseDoc = await Case.findById(id);
  if (!caseDoc) throw new Error("Case not found");

  caseDoc.status = status;

  if (status === "completed") {
    caseDoc.completedAt = new Date();
    caseDoc.completedBy = userId;
  }

  caseDoc.history.push({
    action: `Status changed to ${status}`,
    by: userId,
    at: new Date(),
  });

  return await caseDoc.save();
};

export const deleteCase = async (id: string) => {
  return await Case.findByIdAndDelete(id);
};
