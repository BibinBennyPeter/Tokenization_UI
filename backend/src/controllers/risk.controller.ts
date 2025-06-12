import { Request, Response } from 'express';
import * as riskService from '../services/risk.service';

export const recalculateRisk = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedUser = await riskService.calculateUserRisk(userId);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Risk calculation failed' });
  }
};

export const getAllRiskProfiles = async (_req: Request, res: Response) => {
  const profiles = await riskService.getAllUserRiskProfiles();
  res.json(profiles);
};

export const freezeUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const result = await riskService.freezeUser(userId);
  res.json(result);
};

export const unfreezeUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const result = await riskService.unfreezeUser(userId);
  res.json(result);
};
