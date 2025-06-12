import { Request, Response } from 'express';
import { prisma } from '../../prisma/prisma.service';

// GET /api/users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// POST /api/users
export const addUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({ 
      data: { name, email },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};
