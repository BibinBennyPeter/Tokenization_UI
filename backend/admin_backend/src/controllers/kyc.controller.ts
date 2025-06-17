import { Request, Response, NextFunction } from 'express';
import * as kycService from '../services/kyc.service';

import { Admin } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string }; // match what you store in req.user
    }
  }
}


export const listKYCs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as string;
    const result = await kycService.listKYCRequests(status);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const reviewKYC = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const adminId = req.user!.id;
    const {status,comment} = req.body;
    const result = await kycService.reviewKYC(userId, adminId,status,comment);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


