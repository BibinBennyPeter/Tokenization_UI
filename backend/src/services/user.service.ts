import { prisma } from '../../prisma/prisma.service';
import { CreateUserParams } from '../types/express';

export async function createUserService({ uid, name, email, phone }: CreateUserParams) {
  const data: any = { uid, fullName: name };

  if (email != null)  data.email = email;
  if (phone != null)  data.phone = phone;

  console.log("Creating user with data:", data);

  if (email == null && phone == null) {
    throw new Error("At least email or phone must be provided");
  } 
  const user = await prisma.user.create({
    data,
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