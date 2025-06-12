import { auth } from "../firebase"
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  linkWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const windowAny: Window & typeof globalThis = window;

// --- Phone OTP Flow
export function sendLoginOtp(phoneNumber: string) {
  windowAny.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response: string) => console.log("reCAPTCHA solved", response),
    }
  );
  return signInWithPhoneNumber(auth, phoneNumber, windowAny.recaptchaVerifier);
}

export function confirmLoginOtp(verificationId: string, otp: string) {
  const credential = PhoneAuthProvider.credential(verificationId, otp);
  return signInWithCredential(auth, credential);
}

// --- Email Registration & Verification
export async function registerWithEmail(email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(user);
  return user;
}

export async function loginWithEmail(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  if (!user.emailVerified) {
    await sendEmailVerification(user);
    throw new Error("Please verify your email. Verification link sent again.");
  }
  return user;
}

// --- Link Email to Phone Account
export async function linkEmailToPhone(email: string, password: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Must be logged in with phone first.");
  const credential = EmailAuthProvider.credential(email, password);
  await linkWithCredential(user, credential);
  await sendEmailVerification(user);
}
