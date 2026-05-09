import * as NotesController from "../notes.controller";
import * as NotesService from "../notes.service";

jest.mock("../notes.service");

describe("Notes Controller", () => {
  const res: any = {
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
      (NotesService.createNote as jest.Mock).mockResolvedValue({
        _id: "note-1",
      });

      const req: any = {
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

      (NotesService.createNote as jest.Mock).mockRejectedValue(error);

      const req: any = {
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
      (NotesService.getNotes as jest.Mock).mockResolvedValue({
        data: [],
      });

      const req: any = {
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
      (NotesService.getNoteById as jest.Mock).mockResolvedValue({
        _id: "note-1",
      });

      const req: any = {
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
      (NotesService.updateNote as jest.Mock).mockResolvedValue({
        _id: "note-1",
      });

      const req: any = {
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
      (NotesService.deleteNote as jest.Mock).mockResolvedValue({
        message: "Nota eliminada correctamente",
      });

      const req: any = {
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
