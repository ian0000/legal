"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getNotes = exports.createNote = void 0;
const Notes_1 = __importDefault(require("../../models/Notes"));
const Case_1 = __importDefault(require("../../models/Case"));
const Activities_1 = __importDefault(require("../../models/Activities"));
const CreateError_1 = require("../../utils/CreateError");
// =====================================
// CREATE NOTE
// =====================================
const createNote = async (userId, data) => {
    const legalCase = await Case_1.default.findOne({
        _id: data.caseId,
    });
    if (!legalCase) {
        throw (0, CreateError_1.CreateError)("Caso no encontrado", 404);
    }
    const note = await Notes_1.default.create({
        caseId: data.caseId,
        stageId: data.stageId,
        userId,
        content: data.content,
        visibleToClient: data.visibleToClient || false,
        attachments: data.attachments || [],
    });
    await Activities_1.default.create({
        userId,
        caseId: data.caseId,
        stageId: data.stageId,
        action: "NOTE_CREATED",
        description: "Nueva nota creada",
    });
    return await Notes_1.default.findById(note._id)
        .populate("userId", "firstName lastName email")
        .populate("stageId", "title");
};
exports.createNote = createNote;
// =====================================
// GET NOTES
// =====================================
const getNotes = async (query) => {
    const filters = {
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
        Notes_1.default.find(filters)
            .populate("userId", "firstName lastName email")
            .populate("stageId", "title")
            .sort({
            createdAt: -1,
        })
            .skip(skip)
            .limit(limit),
        Notes_1.default.countDocuments(filters),
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
exports.getNotes = getNotes;
// =====================================
// GET NOTE BY ID
// =====================================
const getNoteById = async (noteId) => {
    const note = await Notes_1.default.findOne({
        _id: noteId,
        isDeleted: false,
    })
        .populate("userId", "firstName lastName email")
        .populate("stageId", "title");
    if (!note) {
        throw (0, CreateError_1.CreateError)("Nota no encontrada", 404);
    }
    return note;
};
exports.getNoteById = getNoteById;
// =====================================
// UPDATE NOTE
// =====================================
const updateNote = async (userId, noteId, data) => {
    const note = await Notes_1.default.findOne({
        _id: noteId,
        isDeleted: false,
    });
    if (!note) {
        throw (0, CreateError_1.CreateError)("Nota no encontrada", 404);
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
    await Activities_1.default.create({
        userId,
        caseId: note.caseId,
        stageId: note.stageId,
        action: "NOTE_UPDATED",
        description: "Nota actualizada",
    });
    return note;
};
exports.updateNote = updateNote;
// =====================================
// DELETE NOTE
// =====================================
const deleteNote = async (userId, noteId) => {
    const note = await Notes_1.default.findOne({
        _id: noteId,
        isDeleted: false,
    });
    if (!note) {
        throw (0, CreateError_1.CreateError)("Nota no encontrada", 404);
    }
    note.isDeleted = true;
    note.deletedAt = new Date();
    await note.save();
    await Activities_1.default.create({
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
exports.deleteNote = deleteNote;
//# sourceMappingURL=notes.service.js.map