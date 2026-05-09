import Note from "../../models/Notes";

import type {
  CreateNoteDTO,
  GetNotesQueryDTO,
  UpdateNoteDTO,
} from "@legal/shared/src/schemas/notes.schema";
import Case from "../../models/Case";
import Activity from "../../models/Activities";

import { CreateError } from "../../utils/CreateError";

// =====================================
// CREATE NOTE
// =====================================

export const createNote = async (userId: string, data: CreateNoteDTO) => {
  const legalCase = await Case.findOne({
    _id: data.caseId,
  });

  if (!legalCase) {
    throw CreateError("Caso no encontrado", 404);
  }

  const note = await Note.create({
    caseId: data.caseId,

    stageId: data.stageId,

    userId,

    content: data.content,

    visibleToClient: data.visibleToClient || false,

    attachments: data.attachments || [],
  });

  await Activity.create({
    userId,

    caseId: data.caseId,

    stageId: data.stageId,

    action: "NOTE_CREATED",

    description: "Nueva nota creada",
  });

  return await Note.findById(note._id)
    .populate("userId", "firstName lastName email")
    .populate("stageId", "title");
};

// =====================================
// GET NOTES
// =====================================

export const getNotes = async (query: GetNotesQueryDTO) => {
  const filters: any = {
    isDeleted: false,
  };

  if (query.caseId) {
    filters.caseId = query.caseId;
  }

  if (query.stageId) {
    filters.stageId = query.stageId;
  }

  if (query.visibleToClient !== undefined) {
    filters.visibleToClient = query.visibleToClient;
  }

  const page = Number(query.page || 1);

  const limit = Number(query.limit || 20);

  const skip = (page - 1) * limit;

  const [notes, total] = await Promise.all([
    Note.find(filters)
      .populate("userId", "firstName lastName email")
      .populate("stageId", "title")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit),

    Note.countDocuments(filters),
  ]);

  return {
    data: notes,

    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// =====================================
// GET NOTE BY ID
// =====================================

export const getNoteById = async (noteId: string) => {
  const note = await Note.findOne({
    _id: noteId,
    isDeleted: false,
  })
    .populate("userId", "firstName lastName email")
    .populate("stageId", "title");

  if (!note) {
    throw CreateError("Nota no encontrada", 404);
  }

  return note;
};

// =====================================
// UPDATE NOTE
// =====================================

export const updateNote = async (userId: string, noteId: string, data: UpdateNoteDTO) => {
  const note = await Note.findOne({
    _id: noteId,
    isDeleted: false,
  });

  if (!note) {
    throw CreateError("Nota no encontrada", 404);
  }

  if (data.content !== undefined) {
    note.content = data.content;
  }

  if (data.visibleToClient !== undefined) {
    note.visibleToClient = data.visibleToClient;
  }

  if (data.attachments !== undefined) {
    note.attachments = data.attachments;
  }

  await note.save();

  await Activity.create({
    userId,

    caseId: note.caseId,

    stageId: note.stageId,

    action: "NOTE_UPDATED",

    description: "Nota actualizada",
  });

  return note;
};

// =====================================
// DELETE NOTE
// =====================================

export const deleteNote = async (userId: string, noteId: string) => {
  const note = await Note.findOne({
    _id: noteId,
    isDeleted: false,
  });

  if (!note) {
    throw CreateError("Nota no encontrada", 404);
  }

  note.isDeleted = true;

  note.deletedAt = new Date();

  await note.save();

  await Activity.create({
    userId,

    caseId: note.caseId,

    stageId: note.stageId,

    action: "NOTE_DELETED",

    description: "Nota eliminada",
  });

  return {
    message: "Nota eliminada correctamente",
  };
};
