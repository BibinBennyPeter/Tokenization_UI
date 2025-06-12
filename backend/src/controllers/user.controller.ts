// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { syncUser } from '../services/user.service';
import {prisma} from '../../prisma/prisma.service'

export class UserController {
  async updateBasicProfile(req: Request, res: Response) {
    try {
      const uid = req.authData!.uid;
      const email = req.authData!.email!;
      const phone = req.authData!.phone;
      const { name, nationality, occupation, avgIncome, photograph } = req.body;

      const user = await syncUser(uid, email, phone, { name, nationality, occupation, avgIncome, photograph });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const submitKyc = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const {
    panNumber,
    panImageUrl,
    aadhaarNumber,
    aadhaarImageUrl,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    addressProofUrl,
    drivingLicenseNo,
    drivingLicenseUrl,
    passportNo,
    passportUrl,
    voterIdNo,
    voterIdUrl,
    selfieUrl,
  } = req.body;

  try {
    // Optional: check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const kyc = await prisma.kycDocuments.upsert({
      where: { userId },
      update: {
        panNumber,
        panImageUrl,
        aadhaarNumber,
        aadhaarImageUrl,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        addressProofUrl,
        drivingLicenseNo,
        drivingLicenseUrl,
        passportNo,
        passportUrl,
        voterIdNo,
        voterIdUrl,
      },
      create: {
        userId,
        panNumber,
        panImageUrl,
        aadhaarNumber,
        aadhaarImageUrl,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        addressProofUrl,
        drivingLicenseNo,
        drivingLicenseUrl,
        passportNo,
        passportUrl,
        voterIdNo,
        voterIdUrl,
      },
    });

    res.status(200).json({ message: "KYC submitted successfully", kyc });
  } catch (error) {
    console.error("KYC error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const submitBankDetails = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const {
    accountHolderName,
    accountNumber,
    ifscCode,
    bankName,
    bankProofUrl,
  } = req.body;

  try {
    // Optional: check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const bankDetails = await prisma.bankDetails.upsert({
      where: { userId },
      update: {
        accountHolderName,
        accountNumber,
        ifscCode,
        bankName,
        bankProofUrl,
      },
      create: {
        userId,
        accountHolderName,
        accountNumber,
        ifscCode,
        bankName,
        bankProofUrl,
      },
    });

    res.status(200).json({
      message: "Bank details submitted successfully",
      bankDetails,
    });
  } catch (error) {
    console.error("Bank details error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadSelfie = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { selfieUrl } = req.body;

  if (!selfieUrl) {
    return res.status(400).json({ error: "selfieUrl is required" });
  }

  try {
    const existing = await prisma.kycDocuments.findUnique({ where: { userId } });
    if (!existing) {
      return res.status(404).json({ error: "KYC record not found for this user" });
    }

    const updated = await prisma.kycDocuments.update({
      where: { userId },
      data: { selfieUrl },
    });

    res.status(200).json({
      message: "Selfie URL updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Selfie upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserWithDetails = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        kycDocuments: true,
        bankDetails: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const patchFullUserProfile = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { user, kyc, bank } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    // 2. Perform updates (only if data is provided)
    const updates: any = {};

    if (user) {
      updates.user = await prisma.user.update({
        where: { id: userId },
        data: user,
      });
    }

    if (kyc) {
      const existingKyc = await prisma.kycDocuments.findUnique({ where: { userId } });
      if (existingKyc) {
        updates.kyc = await prisma.kycDocuments.update({
          where: { userId },
          data: kyc,
        });
      } else {
        updates.kyc = await prisma.kycDocuments.create({
          data: { userId, ...kyc },
        });
      }
    }

    if (bank) {
      const existingBank = await prisma.bankDetails.findUnique({ where: { userId } });
      if (existingBank) {
        updates.bank = await prisma.bankDetails.update({
          where: { userId },
          data: bank,
        });
      } else {
        updates.bank = await prisma.bankDetails.create({
          data: { userId, ...bank },
        });
      }
    }

    return res.status(200).json({
      message: "Profile updated",
      data: updates,
    });
  } catch (error) {
    console.error("Patch error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getKycByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const kyc = await prisma.kycDocuments.findUnique({
      where: { userId },
    });

    if (!kyc) {
      return res.status(404).json({ error: "KYC record not found for this user" });
    }

    res.status(200).json(kyc);
  } catch (error) {
    console.error("Error fetching KYC:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};