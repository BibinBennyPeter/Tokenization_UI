// src/pages/AuthPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import api from '../services/api'; 
import AuthCard from '../components/auth/AuthCard';
import OTPVerificationPopup from '../components/auth/OTPVerificationPopup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string>('');
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const onInputChange = (field: keyof typeof formData, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleGoogleClick = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Axios handles JSON stringification and headers automatically.
      const res = await api.post(isLogin ? '/auth/login' : '/auth/signup', { idToken });

      if (res.status !== 200) throw new Error('Server authentication failed');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // You might want to show an error to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (authMethod === 'email') {
        if (!formData.email || !formData.password) throw new Error('Missing data');
        if (!isLogin && formData.password !== formData.confirmPassword) throw new Error('Passwords mismatch');

        const userCred = isLogin
          ? await signInWithEmailAndPassword(auth, formData.email, formData.password)
          : await createUserWithEmailAndPassword(auth, formData.email, formData.password);

        const idToken = await userCred.user.getIdToken();
        console.log('ID Token:', idToken);

        // REFACTORED: Use the 'api' instance
        const res = await api.post(isLogin ? '/auth/login' : '/auth/signup', { idToken });

        if (res.status !== 200) throw new Error('Server authentication failed');
        navigate('/dashboard');

      } else { // Phone authentication logic
        if (!formData.phone) throw new Error('Phone number is required');

        // This part remains the same, as it only interacts with Firebase
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          { size: 'invisible', callback: () => console.log('reCAPTCHA passed') }
        );

        const result = await signInWithPhoneNumber(auth, formData.phone, window.recaptchaVerifier);
        console.log(result)
        setConfirmationResult(result);
        setIsPopupOpen(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (code: string) => {
    if (!confirmationResult) return;
    setIsOtpLoading(true);
    setOtpError('');
    try {
      const userCred = await confirmationResult.confirm(code);
      const idToken = await userCred.user.getIdToken();

      // REFACTORED: Use the 'api' instance for consistency.
      // This sends the idToken to the backend to finalize login/signup.
      const res = await api.post(isLogin ? '/auth/login' : '/auth/signup', { idToken });
      console.log(res);

      if (res.status !== 200) throw new Error('Server authentication failed');
      navigate('/dashboard');
    } catch (e: unknown) {
      console.error(e);
      setOtpError('Could not verify OTP. Please try again.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!formData.phone) {
      setOtpError('Phone number is required to resend.');
      return;
    }
    setOtpError('');
    try {
      // The reCAPTCHA verifier should already be initialized from the handleSubmit
      // but re-creating it here is safer in case the element was removed.
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth, 'recaptcha-container', { size: 'invisible' }
        );
      }
      
      const result = await signInWithPhoneNumber(auth, formData.phone, window.recaptchaVerifier);
      setConfirmationResult(result);
    } catch (e: unknown) {
      console.error('Failed to resend OTP:', e);
      setOtpError('Failed to resend OTP. Please try again in a moment.');
    }
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      
      {isPopupOpen && (
        <OTPVerificationPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onVerify={verifyOtp}
          onResend={resendOtp}
          type="phone"
          contact={formData.phone}
          otp={otp}
          setOtp={setOtp}
          isLoading={isOtpLoading}
          error={otpError}
        />
      )}

      <div className='flex items-center justify-center min-h-screen min-w-screen'>
        <AuthCard
          isLogin={isLogin}
          authMethod={authMethod}
          isLoading={isLoading}
          formData={formData}
          handleInputChange={onInputChange}
          setAuthMethod={setAuthMethod}
          onToggleLogin={() => setIsLogin(prev => !prev)}
          onSubmit={handleSubmit}
          onGoogleClick={handleGoogleClick}
        />
      </div>
    </>
  );
};

export default AuthPage;