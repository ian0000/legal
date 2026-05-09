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
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getNotes = exports.createNote = void 0;
const NotesService = __importStar(require("./notes.service"));
// =====================================
// CREATE NOTE
// =====================================
const createNote = async (req, res, next) => {
    try {
        const note = await NotesService.createNote(req.user.id, req.body);
        res.status(201).json(note);
    }
    catch (error) {
        next(error);
    }
};
exports.createNote = createNote;
// =====================================
// GET NOTES
// =====================================
const getNotes = async (req, res, next) => {
    try {
        const notes = await NotesService.getNotes(req.query);
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
};
exports.getNotes = getNotes;
// =====================================
// GET NOTE BY ID
// =====================================
const getNoteById = async (req, res, next) => {
    try {
        const note = await NotesService.getNoteById(req.params.noteId);
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
};
exports.getNoteById = getNoteById;
// =====================================
// UPDATE NOTE
// =====================================
const updateNote = async (req, res, next) => {
    try {
        const note = await NotesService.updateNote(req.user.id, req.params.noteId, req.body);
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
};
exports.updateNote = updateNote;
// =====================================
// DELETE NOTE
// =====================================
const deleteNote = async (req, res, next) => {
    try {
        const result = await NotesService.deleteNote(req.user.id, req.params.noteId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteNote = deleteNote;
//# sourceMappingURL=notes.controller.js.map