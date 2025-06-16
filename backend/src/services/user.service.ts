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

export async function findUserById(userId: string){
  return await prisma.user.findUnique({ where: { id: userId } });
};

export async function upsertKyc(userId: string, data: any){
  return await prisma.kycDocuments.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
};

export async function upsertBankDetails(userId: string, data: any){
  return await prisma.bankDetails.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  });
};

export async function updateSelfie(userId: string, selfieUrl: string){
  return await prisma.kycDocuments.update({
    where: { userId },
    data: { selfieUrl },
  });
};

export async function getKycByUserId(userId: string){
  return await prisma.kycDocuments.findUnique({ where: { userId } });
};

export async function findUserWithDetails(userId: string){
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      kycDocuments: true,
      bankDetails: true,
    },
  });
};

export async function patchUserProfile(
  userId: string,
  user: any,
  kyc: any,
  bank: any
){
  const updates: any = {};

  if (user) {
    updates.user = await prisma.user.update({ where: { id: userId }, data: user });
  }

  if (kyc) {
    const existingKyc = await prisma.kycDocuments.findUnique({ where: { userId } });
    updates.kyc = existingKyc
      ? await prisma.kycDocuments.update({ where: { userId }, data: kyc })
      : await prisma.kycDocuments.create({ data: { userId, ...kyc } });
  }

  if (bank) {
    const existingBank = await prisma.bankDetails.findUnique({ where: { userId } });
    updates.bank = existingBank
      ? await prisma.bankDetails.update({ where: { userId }, data: bank })
      : await prisma.bankDetails.create({ data: { userId, ...bank } });
  }

  return updates;
};