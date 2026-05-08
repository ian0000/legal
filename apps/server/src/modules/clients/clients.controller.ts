import { NextFunction, Request, Response } from "express";

import * as clientService from "./clients.service";

// =====================================
// CREATE CLIENT
// =====================================

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await clientService.createClient(req.body, req.user!.id);

    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET CLIENTS
// =====================================

export const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await clientService.getClients(req.query as any);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET CLIENT BY ID
// =====================================

export const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await clientService.getClientById(req.params.id as string);

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

// =====================================
// UPDATE CLIENT
// =====================================

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await clientService.updateClient(req.params.id as string, req.body);

    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
};

// =====================================
// DELETE CLIENT
// =====================================

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await clientService.deleteClient(req.params.id as string);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET CLIENT CASES
// =====================================

export const getClientCases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cases = await clientService.getClientCases(req.params.id as string);

    res.status(200).json(cases);
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET CLIENT STATS
// =====================================

export const getClientStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await clientService.getClientStats(req.params.id as string);

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};
