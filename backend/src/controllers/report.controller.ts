import { Request, Response } from 'express';
import * as reportService from '../services/report.service';

export const getComplianceReport = async (_req: Request, res: Response) => {
  try {
    const report = await reportService.generateComplianceReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
};
