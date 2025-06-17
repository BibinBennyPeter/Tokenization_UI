import {Request, Response,NextFunction} from 'express';
import * as adminService from '../services/admin.service';

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({
                error: 'Email, password, and role are required'
            });
        }

        const result = await adminService.createAdmin(email, password, role);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Error creating admin:', error);
        if (error.message.includes('already exists')) {
            return res.status(409).json({ error: error.message });
        }
        next(error);
    }
};

export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await adminService.getAdmins();
        res.status(200).json(admins.map(({ password, ...rest }) => rest));
    } catch (error) {
        next(error);
    }
};

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }
        const result = await adminService.loginAdmin(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: error.message });
        }
        next(error);
    }
};