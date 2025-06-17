import { Request, Response, NextFunction } from 'express';
import * as propertyService from '../services/property.service';

export const listProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as string | undefined;
    const properties = await propertyService.listProperties(status);
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

export const reviewProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = req.user!.id;
    const propertyId = req.params.id;
    const { status, comment } = req.body;
    const result = await propertyService.reviewProperty(propertyId, status, comment, adminId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
