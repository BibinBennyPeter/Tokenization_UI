// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { updateProfile } from '../services/user.service';

export class UserController {
  async updateBasicProfile(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const email = req.authData!.email!;
      const phone = req.authData!.phone_number;
      const { name, nationality, occupation, avgIncome, gender, dob } = req.body;

      const user = await updateProfile(id, email, phone, { name, nationality, occupation, avgIncome, gender, dob });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
