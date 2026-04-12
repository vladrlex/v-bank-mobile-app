import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const sendOtp = async (phoneNumber: string, recaptchaVerifier: any) => {
  const provider = new PhoneAuthProvider(auth);
  const verificationId = await provider.verifyPhoneNumber(
    phoneNumber,
    recaptchaVerifier,
  );
  return verificationId;
};

export const confirmOtp = async (verificationId: string, otp: string) => {
  const credential = PhoneAuthProvider.credential(verificationId, otp);
  return signInWithCredential(auth, credential);
};
