import {prisma} from '../../prisma/prisma.service';


export const logAction = async (userId: number, action: string, description: string) => {
  return prisma.auditLog.create({
    data: {
      userId,
      action,
      description,
    },
  });
};

export const getAllLogs = async () => {
  return prisma.auditLog.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
