import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import { UserRole, KYCStatus, User } from '@prisma/client';

export class UserService {
  async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        registrationAt: true,
        lastLoginAt: true,
        kycStatus: true,
        kycSubmitted: true,
        isLandowner: true,
        landownerVerifiedAt: true,
        totalInvested: true,
        totalEarnings: true,
      }
    });
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    isActive?: boolean;
    kycStatus?: KYCStatus;
    kycSubmitted?: boolean;
    isLandowner?: boolean;
    totalInvested?: number;
    totalEarnings?: number;
    lastLoginAt?: Date;
    landownerVerifiedAt?: Date;
  }) {
    const {
      name,
      email,
      password,
      role = UserRole.INVESTOR,
      isActive = true,
      kycStatus = KYCStatus.PENDING,
      kycSubmitted = false,
      isLandowner = false,
      totalInvested = 0,
      totalEarnings = 0,
      lastLoginAt,
      landownerVerifiedAt
    } = userData;

    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        isActive,
        kycStatus,
        kycSubmitted,
        isLandowner,
        totalInvested,
        totalEarnings,
        lastLoginAt: lastLoginAt ? new Date(lastLoginAt) : undefined,
        landownerVerifiedAt: landownerVerifiedAt ? new Date(landownerVerifiedAt) : undefined,
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserById(userid: string) {
    return prisma.user.findMany({
      where: { id: userid },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        registrationAt: true,
        lastLoginAt: true,
        kycStatus: true,
        kycSubmitted: true,
        isLandowner: true,
        landownerVerifiedAt: true,
        totalInvested: true,
        totalEarnings: true,
      }
    });
  }
  async getUserByRole(role: string) {
    return prisma.user.findMany({
      where: { role: role as UserRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        registrationAt: true,
        lastLoginAt: true,
        kycStatus: true,
        kycSubmitted: true,
        isLandowner: true,
        landownerVerifiedAt: true,
        totalInvested: true,
        totalEarnings: true,
      }
    });
  }
  async deactivateUser(userid: string) {
    const user = await prisma.user.update({where: {id: userid},
      data:{
        isActive: false
      }
    });
    return user;
  };
  async reactivateUser(userid: string) {
    const user = await prisma.user.update({where: {id: userid},
      data:{
        isActive: true
      }
    });
    return user;
  };
}
