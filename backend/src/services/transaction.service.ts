import {prisma} from '../../prisma/prisma.service'

export const createTransaction = async (data: {
  userId: number;
  tokenId: string;
  type: 'BUY' | 'SELL' | 'TRANSFER';
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  sourceOfFunds?: string;
}) => {
  return prisma.transaction.create({ data });
};

export const getAllTransactions = async (filters: any) => {
  const { userId, status, type, tokenId, startDate, endDate } = filters;

  return prisma.transaction.findMany({
    where: {
      ...(userId && { userId: Number(userId) }),
      ...(status && { status }),
      ...(type && { type }),
      ...(tokenId && { tokenId }),
      ...(startDate && endDate && {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      }),
    },
    include: {
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
};
