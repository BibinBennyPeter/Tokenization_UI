import prisma from '../config/prisma';
import { PropertyStatus } from '@prisma/client';

export const listProperties = async (status?: string) => {
  const where = status && Object.values(PropertyStatus).includes(status.toUpperCase() as PropertyStatus)
    ? { status: status.toUpperCase() as PropertyStatus }
    : {};

  return prisma.property.findMany({
    where,
    include: {
      owner: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  });
};

export const reviewProperty = async (
  propertyId: string,
  status: string,
  comment: string,
  adminId: string // Not used for now — you could log this in a future audit model
) => {
  if (!['APPROVED', 'REJECTED'].includes(status.toUpperCase()))
    throw new Error('Status must be APPROVED or REJECTED');

  return prisma.property.update({
    where: { id: propertyId },
    data: {
      status: status.toUpperCase() as PropertyStatus,
      reviewComment: comment,
      reviewedAt: new Date(),
      reviewedBy: adminId
    }
  });
};
