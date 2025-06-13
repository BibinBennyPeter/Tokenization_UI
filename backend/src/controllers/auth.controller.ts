// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import {
  createUserService,
  getUserByFirebaseUidService,
} from '../services/auth.service';
import { CreateUserParams } from '../types/express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class AuthController {
  /**
   * Handles user SIGNUP.
   * Creates a new user record in our DB after Firebase authentication.
   */
  async signupUser(req: Request, res: Response) {
    try {
      // Data is trusted because it comes from our authMiddleware
      const { uid, name, email, phone_number } = req.authData!;

      // 1. Check if user already exists in our database
      const existingUser = await getUserByFirebaseUidService(uid);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists. Please log in.' });
      }

      // 2. If not, create the new user
      const params: CreateUserParams = {
        uid,
        name,
        email: email ?? undefined, // Use undefined for optional fields in Prisma
        phone: phone_number ?? undefined,
      };

      const newUser = await createUserService(params);
      return res.status(201).json(newUser); // 201 Created is semantically correct

    } catch (error) {
      // Handle potential race conditions where email/phone is already taken
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        return res.status(409).json({ message: 'A user with this email or phone already exists.' });
      }
      console.error('Error creating user:', error);
      return res.status(500).json({ message: `Internal server error: ${error}` });
    }
  }

  /**
   * Handles user LOGIN.
   * Finds an existing user in our DB after Firebase authentication.
   */
  async loginUser(req: Request, res: Response) {
    try {
      const { uid } = req.authData!;

      //Find the user in our database using their Firebase UID
      const user = await getUserByFirebaseUidService(uid);

      // 2. If they don't exist in our DB, they haven't completed the signup process
      if (!user) {
        return res.status(404).json({ message: 'User account not found. Please sign up.' });
      }

      // 3. Success! User is found. Return their data.
      return res.status(200).json(user);

    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}