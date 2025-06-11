import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No auth token' });
  }

  const idToken = header.split(' ')[1];
  const adminAuth = admin.auth();

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    let { uid, email, phone_number: phone } = decoded;

    if (!email || !phone) {
      const userMeta = await adminAuth.getUser(uid);
      email = email ?? userMeta.providerData[0]?.email;
      phone = phone ?? userMeta.phoneNumber;
    }

    req.authData = { uid, email, phone };
    return next();
  } catch (err) {
    console.error('Auth failed:', err);
    return res.status(401).json({ message: 'Invalid auth token' });
  }
}
