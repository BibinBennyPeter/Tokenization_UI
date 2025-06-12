import {prisma} from '../../prisma/prisma.service';

const ALERT_THRESHOLD = 50000;
const FREQUENCY_THRESHOLD = 10;

// Type-safe interface for creating AML entries
interface AMLRecordInput {
  userId: number;
  transactionId: string;
  amount: number;
  frequency: number;
}

// Create new AML record
export const createAMLRecord = async ({
  userId,
  transactionId,
  amount,
  frequency,
}: AMLRecordInput) => {
  const isSuspicious = amount > ALERT_THRESHOLD || frequency > FREQUENCY_THRESHOLD;

  let flaggedReason: string | undefined;

  if (amount > ALERT_THRESHOLD) {
    flaggedReason = `Amount exceeds threshold of ${ALERT_THRESHOLD}`;
  } else if (frequency > FREQUENCY_THRESHOLD) {
    flaggedReason = `Unusual transaction frequency: ${frequency}`;
  }

  return prisma.aMLRecord.create({
    data: {
      userId,
      transactionId,
      amount,
      frequency,
      isSuspicious,
      flaggedReason,
    },
  });
};

// Get all AML records
export const getAllAMLRecords = async () => {
  return prisma.aMLRecord.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

// Optional: Get only suspicious records
export const getSuspiciousRecords = async () => {
  return prisma.aMLRecord.findMany({
    where: { isSuspicious: true },
    orderBy: { createdAt: 'desc' },
  });
};
