// src/pages/AuthPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber,  type ConfirmationResult } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
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
  const [otp, setOtp] = useState(''); // stores full OTP string
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

      const res = await fetch(isLogin ? '/auth/login' : '/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });
      if (!res.ok) throw new Error();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    if (authMethod === 'email') {
      // Existing email/password logic
      if (!formData.email || !formData.password) throw new Error('Missing data');
      if (!isLogin && formData.password !== formData.confirmPassword) throw new Error('Passwords mismatch');

      const userCred = isLogin
        ? await signInWithEmailAndPassword(auth, formData.email, formData.password)
        : await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const idToken = await userCred.user.getIdToken();
      const res = await fetch(isLogin ? '/auth/login' : '/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });
      if (!res.ok) throw new Error('Server authentication failed');
      navigate('/dashboard');
    } else {
      // Phone authentication logic
      if (!formData.phone) throw new Error('Phone number is required');

      // Step 1: Trigger OTP send (if not already sent)
      if (!confirmationResult) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: () => console.log('reCAPTCHA passed'),
          }
        ); // Correct argument order :contentReference[oaicite:1]{index=1}

        const result = await signInWithPhoneNumber(
          auth,
          formData.phone,
          window.recaptchaVerifier
        );
        setConfirmationResult(result);
        setIsPopupOpen(true); // This will open your OTP popup
        return;
      }

      // Step 2: After OTP sent, confirm the OTP
      if (!otp) throw new Error('Please enter the OTP');
      const userCred = await confirmationResult.confirm(otp);
      const idToken = await userCred.user.getIdToken();

      const res = await fetch(isLogin ? '/auth/login' : '/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });
      if (!res.ok) throw new Error('Server authentication failed');
      navigate('/dashboard');
    }
  } finally {
    setIsLoading(false);
  }
};


const verifyOtp = async (code: string) => {
  setIsOtpLoading(true);
  try {
    const userCred = await confirmationResult!.confirm(code);
    const idToken = await userCred.user.getIdToken();

    const res = await fetch(isLogin ? '/auth/login' : '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`, // include ID token for verification
      },
      body: JSON.stringify({}), // or include other required data
    });

    if (!res.ok) throw new Error('Server authentication failed');
    navigate('/dashboard');
  } catch (e: unknown) {
    if (e instanceof Error) {
      setOtpError(e.message || 'Invalid OTP');
    } else {
      setOtpError('Invalid OTP');
    }
  } finally {
    setIsOtpLoading(false);
  }
};

const resendOtp = async () => {
  if (!formData.phone) {
    setOtpError('Phone number is required');
    return;
  }
  try {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => console.log('reCAPTCHA passed'),
      },
      
    );
    const result = await signInWithPhoneNumber(
      auth,
      formData.phone,
      window.recaptchaVerifier
    );
    setConfirmationResult(result);
    setOtpError('');
  } catch (e: unknown) {
    console.error('Failed to resend OTP:', e);
    setOtpError('Failed to resend OTP');
  }
};


  return (
    <>
        <div id="recaptcha-container"></div>

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
