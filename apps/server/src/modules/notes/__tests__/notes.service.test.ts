import Note from "../../../models/Notes";
import Case from "../../../models/Case";
import Activity from "../../../models/Activities";

import * as NotesService from "../notes.service";

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
      (Case.findOne as jest.Mock).mockResolvedValue({
        _id: "case-1",
      });

      (Note.create as jest.Mock).mockResolvedValue({
        _id: "note-1",
      });

      const populateStageMock = jest.fn().mockResolvedValue({
        _id: "note-1",
        content: "Test note",
      });

      const populateUserMock = jest.fn().mockReturnValue({
        populate: populateStageMock,
      });

      (Note.findById as jest.Mock).mockReturnValue({
        populate: populateUserMock,
      });

      const result = await NotesService.createNote("user-1", {
        caseId: "case-1",
        content: "Test note",
      });

      expect(Case.findOne).toHaveBeenCalled();

      expect(Note.create).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();

      expect(result).toBeDefined();
    });

    it("should throw if case does not exist", async () => {
      (Case.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        NotesService.createNote("user-1", {
          caseId: "invalid-case",
          content: "Test",
        }),
      ).rejects.toThrow("Caso no encontrado");
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

      (Note.find as jest.Mock).mockReturnValue({
        populate: populateUserMock,
      });

      (Note.countDocuments as jest.Mock).mockResolvedValue(1);

      const result = await NotesService.getNotes({
        caseId: "case-1",
      });

      expect(Note.find).toHaveBeenCalled();

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

      (Note.findOne as jest.Mock).mockReturnValue({
        populate: populateUserMock,
      });

      const result = await NotesService.getNoteById("note-1");

      expect(Note.findOne).toHaveBeenCalled();

      expect(result).toBeDefined();
    });

    it("should throw if note not found", async () => {
      const populateStageMock = jest.fn().mockResolvedValue(null);

      const populateUserMock = jest.fn().mockReturnValue({
        populate: populateStageMock,
      });

      (Note.findOne as jest.Mock).mockReturnValue({
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

      (Note.findOne as jest.Mock).mockResolvedValue({
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

      expect(Activity.create).toHaveBeenCalled();

      expect(result).toBeDefined();
    });

    it("should throw if note not found", async () => {
      (Note.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        NotesService.updateNote("user-1", "invalid", {
          content: "Updated",
        }),
      ).rejects.toThrow("Nota no encontrada");
    });
  });

  // =====================================
  // DELETE NOTE
  // =====================================

  describe("deleteNote", () => {
    it("should soft delete note", async () => {
      const saveMock = jest.fn();

      (Note.findOne as jest.Mock).mockResolvedValue({
        _id: "note-1",

        caseId: "case-1",

        stageId: "stage-1",

        isDeleted: false,

        save: saveMock,
      });

      const result = await NotesService.deleteNote("user-1", "note-1");

      expect(saveMock).toHaveBeenCalled();

      expect(Activity.create).toHaveBeenCalled();

      expect(result).toEqual({
        message: "Nota eliminada correctamente",
      });
    });

    it("should throw if note not found", async () => {
      (Note.findOne as jest.Mock).mockResolvedValue(null);

      await expect(NotesService.deleteNote("user-1", "invalid")).rejects.toThrow(
        "Nota no encontrada",
      );
    });
  });
});
