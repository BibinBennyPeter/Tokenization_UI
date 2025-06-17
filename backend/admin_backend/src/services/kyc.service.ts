import prisma from '../config/prisma';
import { KYCStatus } from '@prisma/client';

export const listKYCRequests = async (status?: string) => {
    try {
        let where: { kycStatus?: KYCStatus } = {};
        if (status && Object.values(KYCStatus).includes(status.toUpperCase() as KYCStatus)) {
            where.kycStatus = status.toUpperCase() as KYCStatus;
        }
        return prisma.user.findMany({ where,include: { kycLogs: true } });
    } catch (err) {
        console.error('Error in listKYCRequests:', err);
        throw err;
    }
};

export const reviewKYC = async (userId: string, adminId: string, status:string, comment?: string) => {
    try {
        if(!['APPROVED','REJECTED'].includes(status.toUpperCase()))
            throw new Error('Status must be APPROVED or REJECTED');
        await prisma.user.update({
            where: { id: userId },
            data: { kycStatus:  status.toUpperCase() as KYCStatus }
        });

        return prisma.kYCLog.create({
            data: { userId, adminId, action: status, comment:comment }
        });
    } catch (err) {
        console.error('Error in approveKYC:', err);
        throw err;
    }
};


