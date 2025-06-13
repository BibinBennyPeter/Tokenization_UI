// src/services/auth.service.ts
import { prisma } from '../../prisma/prisma.service';
import { CreateUserParams } from '../types/express';

export async function createUserService({ uid, email, phone }: CreateUserParams) {
  const user = await prisma.user.create({
    data: {
      uid: uid,
      email,
      phone,
    },
    // data to return
    select: {
      id: true,
      email: true,
      phone: true,
    },
  });

  return user;
}

export async function getUserByFirebaseUidService(uid: string) {
  const user = await prisma.user.findUnique({
    where: {
      uid: uid,
    },
    select: {
      id: true,
      uid: true,
      email: true,
      phone: true,
      createdAt: true,
    },
  });

  return user;
}

export async function getUserByIdService(id: string) {
  return prisma.user.findUnique({ where: { id: id } });
}