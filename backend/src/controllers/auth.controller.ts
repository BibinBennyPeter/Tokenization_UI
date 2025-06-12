// src/controllers/auth.controller.ts
import { Request, Response} from 'express';
import { syncUser } from '../services/user.service';

export class AuthController {
  async createUser(req: Request, res: Response) {
    try {
      const { uid: uid, email, phone } = req.authData!;

      const user = await syncUser(uid, email ?? '', phone ?? undefined);
      return res.json(user);
    } catch (error) {
      console.error('Error syncing user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
