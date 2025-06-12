import { Request, Response } from 'express';
import * as service from '../services/regulatory.service';

export const uploadRegulatoryDoc = async (req: Request, res: Response) => {
  try {
    const { title, fileName, fileType, version } = req.body;
    const doc = await service.uploadDocument(title, fileName, fileType, version);
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const getRegulatoryDocs = async (_req: Request, res: Response) => {
  try {
    const docs = await service.getAllDocuments();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};
