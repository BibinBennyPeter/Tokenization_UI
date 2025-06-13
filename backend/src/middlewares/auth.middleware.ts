// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import 'dotenv/config';

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!admin.apps.length) {
  // Startup check to ensure env vars exist
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
    console.error('Firebase environment variables are not fully configured.');
    process.exit(1); // Fail fast if config is missing
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

// --- Middleware ---
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided.' });
  }

  const idToken = header.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log('Decoded token:', decodedToken);

    // req.authToken = decodedToken;
    const { uid, email, phone_number } = decodedToken;

    const { name} = req.body;
    req.authData = {
      uid,
      name: name,
      email: email || undefined, 
      phone_number: phone_number || undefined,
    };

    next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token.' });
  }
}