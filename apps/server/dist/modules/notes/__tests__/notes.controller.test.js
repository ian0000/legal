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
const NotesController = __importStar(require("../notes.controller"));
const NotesService = __importStar(require("../notes.service"));
jest.mock("../notes.service");
describe("Notes Controller", () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // =====================================
    // CREATE NOTE
    // =====================================
    describe("createNote", () => {
        it("should create note", async () => {
            NotesService.createNote.mockResolvedValue({
                _id: "note-1",
            });
            const req = {
                user: {
                    id: "user-1",
                },
                body: {
                    caseId: "case-1",
                    content: "Test note",
                },
            };
            await NotesController.createNote(req, res, next);
            expect(NotesService.createNote).toHaveBeenCalledWith("user-1", req.body);
            expect(res.status).toHaveBeenCalledWith(201);
        });
        it("should call next on error", async () => {
            const error = new Error("fail");
            NotesService.createNote.mockRejectedValue(error);
            const req = {
                user: {
                    id: "user-1",
                },
                body: {},
            };
            await NotesController.createNote(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
    // =====================================
    // GET NOTES
    // =====================================
    describe("getNotes", () => {
        it("should return notes", async () => {
            NotesService.getNotes.mockResolvedValue({
                data: [],
            });
            const req = {
                query: {},
            };
            await NotesController.getNotes(req, res, next);
            expect(NotesService.getNotes).toHaveBeenCalledWith(req.query);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    // =====================================
    // GET NOTE BY ID
    // =====================================
    describe("getNoteById", () => {
        it("should return note", async () => {
            NotesService.getNoteById.mockResolvedValue({
                _id: "note-1",
            });
            const req = {
                params: {
                    noteId: "note-1",
                },
            };
            await NotesController.getNoteById(req, res, next);
            expect(NotesService.getNoteById).toHaveBeenCalledWith("note-1");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    // =====================================
    // UPDATE NOTE
    // =====================================
    describe("updateNote", () => {
        it("should update note", async () => {
            NotesService.updateNote.mockResolvedValue({
                _id: "note-1",
            });
            const req = {
                user: {
                    id: "user-1",
                },
                params: {
                    noteId: "note-1",
                },
                body: {
                    content: "Updated",
                },
            };
            await NotesController.updateNote(req, res, next);
            expect(NotesService.updateNote).toHaveBeenCalledWith("user-1", "note-1", req.body);
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
    // =====================================
    // DELETE NOTE
    // =====================================
    describe("deleteNote", () => {
        it("should delete note", async () => {
            NotesService.deleteNote.mockResolvedValue({
                message: "Nota eliminada correctamente",
            });
            const req = {
                user: {
                    id: "user-1",
                },
                params: {
                    noteId: "note-1",
                },
            };
            await NotesController.deleteNote(req, res, next);
            expect(NotesService.deleteNote).toHaveBeenCalledWith("user-1", "note-1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Nota eliminada correctamente",
            });
        });
    });
});
//# sourceMappingURL=notes.controller.test.js.map