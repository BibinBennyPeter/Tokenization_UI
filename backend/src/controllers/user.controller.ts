// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import {
  createUserService,
  getUserByFirebaseUidService,
} from '../services/user.service';
import * as admin from 'firebase-admin';
import { CreateUserParams } from '../types/express';
import { updateProfile,findUserById,upsertKyc,upsertBankDetails,getKycByUserId,updateSelfie,findUserWithDetails,patchUserProfile, checkUserExistsByEmailService} from '../services/user.service';


export class UserController {

  /**
   * Checks if a user with the given email exists in Firebase Authentication.
   * This is useful for UI flows to determine whether to show a login or sign-up form.
   *
   * @route POST /users/check-email
   * @body { email: string }
   */
  async checkUserExistsByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
      }

      await admin.auth().getUserByEmail(email);

      const userExists = await checkUserExistsByEmailService(email);

      console.log('User exists:', userExists);

      if (!userExists) return res.status(404).json({
        message: 'User not found. Please proceed to create an account.',
        exists: false,
      });
      else if (userExists.email === email){
      return res.status(200).json({
        message: 'User with this email already exists.',
        exists: true,
      });
      }

    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        return res.status(404).json({
          message: 'User not found. Please proceed to create an account.',
          exists: false,
        });
      }
      
      console.error('Error checking if user exists by email:', error);
      if (error.code === 'auth/invalid-email') {
          return res.status(400).json({ message: 'The provided email is not valid.' });
      }

      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
  
  async registerUser(req: Request, res: Response) {
    try {
      // Data is trusted because it comes from our authMiddleware
      const { uid, email, phone_number } = req.authToken!;

      // Check if user already exists in our database
      const user = await getUserByFirebaseUidService(uid);
      if (user) {
        return res.status(200).json({
          message: 'User logged in',})
      }

      // If not, create the new user
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      const params: CreateUserParams = {
        uid,
        name,
        email: email ?? undefined,
        phone: phone_number ?? undefined,
      };

      const newUser = await createUserService(params);
      return res.status(200).json(newUser); 
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: `Internal server error: ${error}` });
    }
  }


  async updateBasicProfile(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const uid = req.authData!.uid;
      const email = req.authData!.email!;
      const phone = req.authData!.phone_number;
      const { name, nationality, occupation, avgIncome, gender, dob } = req.body;

      const user = await updateProfile(id, uid, email, phone, { name, nationality, occupation, avgIncome, gender, dob });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async submitKyc(req: Request, res: Response){
    const userId = req.params.id;

    try {
      const user = await findUserById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const kyc = await upsertKyc(userId, req.body);
      res.status(200).json({ message: "KYC submitted successfully", kyc });
    } catch (error) {
      console.error("KYC error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  async submitBankDetails(req: Request, res: Response){
    const userId = req.params.id;

    try {
      const user = await findUserById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const bankDetails = await upsertBankDetails(userId, req.body);
      res.status(200).json({
        message: "Bank details submitted successfully",
        bankDetails,
      });
    } catch (error) {
      console.error("Bank details error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  async uploadSelfie(req: Request, res: Response){
    const userId = req.params.id;
    const { selfieUrl } = req.body;

    if (!selfieUrl) {
      return res.status(400).json({ error: "selfieUrl is required" });
    }

    try {
      const existing = await getKycByUserId(userId);
      if (!existing) {
        return res.status(404).json({ error: "KYC record not found for this user" });
      }

      const updated = await updateSelfie(userId, selfieUrl);
      res.status(200).json({ message: "Selfie uploaded", data: updated });
    } catch (error) {
      console.error("Selfie upload error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  async getUser(req: Request, res: Response) {
    const { uid } = req.authToken!;
    console.log("Fetching user with UID:", uid);

    const baseUser = await getUserByFirebaseUidService(uid);
    console.log("Base user found:", baseUser);
    if (!baseUser) {
      return res.status(404).json({ message: "User not found" });
    }
    try {
      const detailedUser = await findUserWithDetails(baseUser.id);
      if (!detailedUser) return res.status(404).json({ error: "User not found" });

      res.status(200).json(detailedUser);
    } catch (error) {
      console.error("Fetch user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  async patchFullUserProfile(req: Request, res: Response){
    const userId = req.params.id;
    const { user, kyc, bank } = req.body;

    try {
      const existingUser = await findUserById(userId);
      if (!existingUser) return res.status(404).json({ error: "User not found" });

      const data = await patchUserProfile(userId, user, kyc, bank);
      res.status(200).json({ message: "Profile updated", data });
    } catch (error) {
      console.error("Patch error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  async getKyc(req: Request, res: Response){
    const userId = req.params.id;

    try {
      const kyc = await getKycByUserId(userId);
      if (!kyc) return res.status(404).json({ error: "KYC not found" });

      res.status(200).json(kyc);
    } catch (error) {
      console.error("Fetch KYC error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}