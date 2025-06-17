import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const createAdmin = async (email: string, password: string, role: string) => {
    try {
        // Validate required fields
        if (!email || !password || !role) {
            throw new Error('Email, password, and role are required');
        }

        // Check if admin with email already exists
        const existingAdmin = await prisma.admin.findUnique({
            where: { email }
        });

        if (existingAdmin) {
            throw new Error('Admin with this email already exists');
        }

        const hashed = await bcrypt.hash(password, 10);
        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashed,
                role: role.toUpperCase()
            }
        });

        // Generate token for the new admin
        const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, { expiresIn: '1d' });
        
        return {
            token,
            admin: {
                id: admin.id,
                email: admin.email,
                role: admin.role
            }
        };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error('Email already exists');
            }
        }
        throw error;
    }
};

export const getAdmins = () => prisma.admin.findMany();

export const getAdminById = (id: string) =>
    prisma.admin.findUnique({ where: { id } });

export const loginAdmin = async (email: string, password: string) => {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) throw new Error('Invalid credentials');
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, { expiresIn: '1d' });
    return { token, admin: { id: admin.id, email: admin.email, role: admin.role } };
};