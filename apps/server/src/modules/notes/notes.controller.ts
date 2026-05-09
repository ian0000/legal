import { NextFunction, Request, Response } from "express";

import * as NotesService from "./notes.service";

// =====================================
// CREATE NOTE
// =====================================

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await NotesService.createNote(req.user!.id, req.body);

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET NOTES
// =====================================

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await NotesService.getNotes(req.query as any);

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET NOTE BY ID
// =====================================

export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await NotesService.getNoteById(req.params.noteId as string);

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// =====================================
// UPDATE NOTE
// =====================================

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await NotesService.updateNote(req.user!.id, req.params.noteId as string, req.body);

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// =====================================
// DELETE NOTE
// =====================================

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await NotesService.deleteNote(req.user!.id, req.params.noteId as string);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
