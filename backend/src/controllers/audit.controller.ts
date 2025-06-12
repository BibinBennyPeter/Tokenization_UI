import { Request, Response } from 'express';
import * as auditService from '../services/audit.service';

export const addAuditLog = async (req: Request, res: Response) => {
  try {
    const { userId, action, description } = req.body;
    const log = await auditService.logAction(userId, action, description);
    res.status(201).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create audit log' });
  }
};

export const getAuditLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await auditService.getAllLogs();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
};
