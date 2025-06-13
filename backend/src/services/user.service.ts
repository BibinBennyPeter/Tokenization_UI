import { prisma } from '../../prisma/prisma.service';

export async function updateProfile(id: string, email: string |undefined, phone: string | undefined, extra?: Record<string, any>) {
  return prisma.user.upsert({
    where: { id: id },
    update: { email, phone, ...extra },
    create: { email, phone, ...extra },
  });
}