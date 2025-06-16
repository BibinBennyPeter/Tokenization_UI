import { prisma } from '../../prisma/prisma.service';

export async function updateProfile(
  id: string,
  uid: string,
  email: string | undefined,
  phone: string | undefined,
  extra?: Record<string, any>
) {
  return prisma.user.upsert({
    where: { id },
    update: { ...extra },
    create: { id, uid, email, phone, ...extra }, // include all required fields
  });
}

export async function updateUserEmailService(userId: string, newEmail: string) {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: newEmail,
    },
    select: {
      id: true,
      email: true,
    },
  });
  return updatedUser;
}