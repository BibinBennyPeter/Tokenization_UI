import {prisma} from '../../prisma/prisma.service';

// Simple risk scoring logic
export const calculateUserRisk = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      kyc: true,
      aml: true,
      transactions: true,
    },
  });

  if (!user) throw new Error('User not found');

  let score = 0;

  // KYC Status
  const kycStatus = user.kyc.at(-1)?.status ?? 'pending';
  if (kycStatus === 'rejected' || kycStatus === 'flagged') score += 30;
  else if (kycStatus === 'approved') score += 0;
  else score += 10;

  // Suspicious AML records
  const suspiciousCount = user.aml.filter((a: { isSuspicious: any; }) => a.isSuspicious).length;
  score += suspiciousCount * 20;

  // High volume transactions
  const volume = user.transactions.reduce((sum: any, t: { amount: any; }) => sum + t.amount, 0);
  if (volume > 100000) score += 20;
  else if (volume > 50000) score += 10;

  // Save score to DB
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { riskScore: score },
  });

  return updatedUser;
};

export const getAllUserRiskProfiles = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      riskScore: true,
      isFrozen: true,
    },
    orderBy: { riskScore: 'desc' },
  });
};

export const freezeUser = async (userId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isFrozen: true },
  });
};

export const unfreezeUser = async (userId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isFrozen: false },
  });
};
