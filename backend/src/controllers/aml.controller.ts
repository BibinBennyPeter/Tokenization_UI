import { Request, Response } from 'express';
import * as amlService from '../services/aml.service';

export const addAMLRecord = async (req: Request, res: Response) => {
  try {
    const { userId, transactionId, amount, frequency } = req.body;

    const record = await amlService.createAMLRecord({
      userId,
      transactionId,
      amount,
      frequency
    });

    res.status(201).json(record);
  } catch (error: any) {
    console.error("❌ AML CREATE ERROR:", error);
    res.status(500).json({ error: 'Failed to add AML record', details: error.message });
  }
};

export const getAMLRecords = async (_req: Request, res: Response) => {
  try {
    const records = await amlService.getAllAMLRecords();
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch AML records' });
  }
};
export function createTransaction(arg0: string, createTransaction: any) {
    throw new Error('Function not implemented.');
}

