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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Notes_1 = __importDefault(require("../../../models/Notes"));
const Case_1 = __importDefault(require("../../../models/Case"));
const Activities_1 = __importDefault(require("../../../models/Activities"));
const NotesService = __importStar(require("../notes.service"));
jest.mock("../../../models/Notes");
jest.mock("../../../models/Case");
jest.mock("../../../models/Activities");
describe("Notes Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // =====================================
    // CREATE NOTE
    // =====================================
    describe("createNote", () => {
        it("should create note correctly", async () => {
            Case_1.default.findOne.mockResolvedValue({
                _id: "case-1",
            });
            Notes_1.default.create.mockResolvedValue({
                _id: "note-1",
            });
            const populateStageMock = jest.fn().mockResolvedValue({
                _id: "note-1",
                content: "Test note",
            });
            const populateUserMock = jest.fn().mockReturnValue({
                populate: populateStageMock,
            });
            Notes_1.default.findById.mockReturnValue({
                populate: populateUserMock,
            });
            const result = await NotesService.createNote("user-1", {
                caseId: "case-1",
                content: "Test note",
            });
            expect(Case_1.default.findOne).toHaveBeenCalled();
            expect(Notes_1.default.create).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
        it("should throw if case does not exist", async () => {
            Case_1.default.findOne.mockResolvedValue(null);
            await expect(NotesService.createNote("user-1", {
                caseId: "invalid-case",
                content: "Test",
            })).rejects.toThrow("Caso no encontrado");
        });
    });
    // =====================================
    // GET NOTES
    // =====================================
    describe("getNotes", () => {
        it("should return paginated notes", async () => {
            const limitMock = jest.fn().mockResolvedValue([
                {
                    _id: "note-1",
                },
            ]);
            const skipMock = jest.fn().mockReturnValue({
                limit: limitMock,
            });
            const sortMock = jest.fn().mockReturnValue({
                skip: skipMock,
            });
            const populateStageMock = jest.fn().mockReturnValue({
                sort: sortMock,
            });
            const populateUserMock = jest.fn().mockReturnValue({
                populate: populateStageMock,
            });
            Notes_1.default.find.mockReturnValue({
                populate: populateUserMock,
            });
            Notes_1.default.countDocuments.mockResolvedValue(1);
            const result = await NotesService.getNotes({
                caseId: "case-1",
            });
            expect(Notes_1.default.find).toHaveBeenCalled();
            expect(result.pagination.total).toBe(1);
            expect(result.data).toHaveLength(1);
        });
    });
    // =====================================
    // GET NOTE BY ID
    // =====================================
    describe("getNoteById", () => {
        it("should return note", async () => {
            const populateStageMock = jest.fn().mockResolvedValue({
                _id: "note-1",
            });
            const populateUserMock = jest.fn().mockReturnValue({
                populate: populateStageMock,
            });
            Notes_1.default.findOne.mockReturnValue({
                populate: populateUserMock,
            });
            const result = await NotesService.getNoteById("note-1");
            expect(Notes_1.default.findOne).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
        it("should throw if note not found", async () => {
            const populateStageMock = jest.fn().mockResolvedValue(null);
            const populateUserMock = jest.fn().mockReturnValue({
                populate: populateStageMock,
            });
            Notes_1.default.findOne.mockReturnValue({
                populate: populateUserMock,
            });
            await expect(NotesService.getNoteById("invalid")).rejects.toThrow("Nota no encontrada");
        });
    });
    // =====================================
    // UPDATE NOTE
    // =====================================
    describe("updateNote", () => {
        it("should update note correctly", async () => {
            const saveMock = jest.fn();
            Notes_1.default.findOne.mockResolvedValue({
                _id: "note-1",
                caseId: "case-1",
                stageId: "stage-1",
                content: "Old",
                visibleToClient: false,
                attachments: [],
                save: saveMock,
            });
            const result = await NotesService.updateNote("user-1", "note-1", {
                content: "Updated content",
                visibleToClient: true,
            });
            expect(saveMock).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
            expect(result).toBeDefined();
        });
        it("should throw if note not found", async () => {
            Notes_1.default.findOne.mockResolvedValue(null);
            await expect(NotesService.updateNote("user-1", "invalid", {
                content: "Updated",
            })).rejects.toThrow("Nota no encontrada");
        });
    });
    // =====================================
    // DELETE NOTE
    // =====================================
    describe("deleteNote", () => {
        it("should soft delete note", async () => {
            const saveMock = jest.fn();
            Notes_1.default.findOne.mockResolvedValue({
                _id: "note-1",
                caseId: "case-1",
                stageId: "stage-1",
                isDeleted: false,
                save: saveMock,
            });
            const result = await NotesService.deleteNote("user-1", "note-1");
            expect(saveMock).toHaveBeenCalled();
            expect(Activities_1.default.create).toHaveBeenCalled();
            expect(result).toEqual({
                message: "Nota eliminada correctamente",
            });
        });
        it("should throw if note not found", async () => {
            Notes_1.default.findOne.mockResolvedValue(null);
            await expect(NotesService.deleteNote("user-1", "invalid")).rejects.toThrow("Nota no encontrada");
        });
    });
});
//# sourceMappingURL=notes.service.test.js.map