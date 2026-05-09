import { Router } from "express";

import * as NotesController from "./notes.controller";

import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.use(authenticate);

// =====================================
// NOTES
// =====================================

router.post("/", NotesController.createNote);

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNoteById);

router.put("/:noteId", NotesController.updateNote);

router.delete("/:noteId", NotesController.deleteNote);

export default router;
