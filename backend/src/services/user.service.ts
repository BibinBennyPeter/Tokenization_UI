import { prisma } from '../../prisma/prisma.service';

export async function syncUser(uid: string, email: string |undefined, phone: string | undefined, extra?: Record<string, any>) {
  return prisma.user.upsert({
    where: { firebaseUid: uid },
    update: { email, phone, ...extra },
    create: { firebaseUid: uid, email, phone, ...extra },
  });
}