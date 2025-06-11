// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { syncUser } from '../services/user.service';

export class UserController {
  async updateBasicProfile(req: Request, res: Response) {
    try {
      const uid = req.authData!.uid;
      const email = req.authData!.email!;
      const phone = req.authData!.phone;
      const { name, nationality, occupation, avgIncome, photograph } = req.body;

      const user = await syncUser(uid, email, phone, { name, nationality, occupation, avgIncome, photograph });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
