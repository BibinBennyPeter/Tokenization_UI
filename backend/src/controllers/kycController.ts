import { Request, Response } from 'express';
import { prisma } from '../../prisma/prisma.service';

// GET /api/kyc
export const getAllKyc = async (req: Request, res: Response) => {
  try {
    const kycs = await prisma.KYC.findMany(); 
    res.json(kycs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch KYC records' });
  }
};

// PATCH /api/kyc/:id/status
export const updateKycStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const existing = await prisma.KYC.findUnique({ where: { id } }); 
    if (!existing) {
      return res.status(404).json({ message: 'KYC record not found' });
    }

    const updated = await prisma.KYC.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};
// POST /api/kyc
export const createKyc = async (req: Request, res: Response) => {
  try {
    const { userId, aadhaar, pan, bankAccount } = req.body;

    const newKyc = await prisma.KYC.create({
      data: {
        userId,
        aadhaar,
        pan,
        bank: bankAccount,
      },
    });

    res.status(201).json(newKyc);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to create KYC' });
  }
};
