import {prisma} from '../../prisma/prisma.service';
import { subDays, subMonths, startOfMonth } from 'date-fns';

export const generateComplianceReport = async () => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const last30Days = subDays(now, 30);

  const totalKYCReviewed = await prisma.kYC.count({
    where: {
      status: { not: 'pending' },
      updatedAt: { gte: last30Days }
    }
  });

  const suspiciousAMLCount = await prisma.aMLRecord.count({
    where: {
      isSuspicious: true,
      createdAt: { gte: last30Days }
    }
  });

  const frozenUsersCount = await prisma.user.count({
    where: {
      isFrozen: true,
      updatedAt: { gte: last30Days }
    }
  });

  const highRiskUsers = await prisma.user.findMany({
    where: { riskScore: { gte: 50 } },
    select: { id: true, name: true, email: true, riskScore: true }
  });

  return {
    period: "Last 30 Days",
    kycReviewed: totalKYCReviewed,
    suspiciousAMLCount,
    frozenUsersCount,
    highRiskUsers
  };
};
