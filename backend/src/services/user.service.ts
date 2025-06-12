import { prisma } from '../../prisma/prisma.service';

interface KYCActionInput {
  kycId: number;
  status: 'approved' | 'rejected' | 'flagged';
  reviewerId?: number; // Optional: track who reviewed the KYC
}

// Get all pending KYCs with user details
export const getPendingKYCs = async () => {
  return await prisma.KYC.findMany({
    where: { status: 'pending' },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

// Get a specific user's KYC
export const getKYCByUserId = async (userId: string) => {
  return await prisma.KYC.findFirst({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};

// Update KYC status (approve/reject/flag)
export const updateKYCStatus = async ({ kycId, status }: KYCActionInput) => {
  const existing = await prisma.KYC.findUnique({ where: { id: kycId } });
  if (!existing) throw new Error('KYC not found');

  return await prisma.KYC.update({
    where: { id: kycId },
    data: { status },
  });
};

// Flag a KYC for manual review
export const flagKYCForReview = async (kycId: number) => {
  const existing = await prisma.KYC.findUnique({ where: { id: kycId } });
  if (!existing) throw new Error('KYC not found');

  return await prisma.KYC.update({
    where: { id: kycId },
    data: { status: 'flagged' },
  });
};

// View KYC history/logs for a specific user
export const getKYCLogForUser = async (userId: string) => {
  return await prisma.KYC.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
