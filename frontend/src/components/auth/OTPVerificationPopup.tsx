import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, Phone, Shield } from 'lucide-react';


interface OTPVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
  type: 'email' | 'phone';
  contact: string;
  otp: string;
  setOtp: (value: string) => void;
  isLoading?: boolean;
  error?: string;
}

const OTPVerificationPopup: React.FC<OTPVerificationPopupProps> = ({
  isOpen,
  onClose,
  onVerify,
  onResend,
  type,
  contact,
  isLoading = false,
  error = ''
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    if (isOpen) {
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      onVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    const digits = pastedData.slice(0, 6).split('');
    
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);

    if (newOtp.every(digit => digit !== '')) {
      onVerify(newOtp.join(''));
    }
  };

  const handleResend = () => {
    if (resendCooldown === 0) {
      onResend();
      setResendCooldown(30);
      setOtp(['', '', '', '', '', '']);
    }
  };

  const maskContact = (contact: string, type: 'email' | 'phone') => {
    if (type === 'email') {
      const [username, domain] = contact.split('@');
      return `${username.slice(0, 2)}${'*'.repeat(username.length - 2)}@${domain}`;
    } else {
      return `${contact.slice(0, 3)}${'*'.repeat(contact.length - 6)}${contact.slice(-3)}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              {type === 'email' ? (
                <Mail className="w-8 h-8 text-white" />
              ) : (
                <Phone className="w-8 h-8 text-white" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your {type === 'email' ? 'Email' : 'Phone'}
            </h2>
            
            <p className="text-gray-600 text-center leading-relaxed">
              We've sent a 6-digit verification code to
              <br />
              <span className="font-semibold text-gray-900">
                {maskContact(contact, type)}
              </span>
            </p>
          </div>
        </div>

        {/* OTP Input */}
        <div className="px-6 pb-6">
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200 ${
                  digit
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  error ? 'border-red-300 bg-red-50' : ''
                }`}
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Resend Code */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0 || isLoading}
              className={`text-sm font-semibold transition-colors ${
                resendCooldown > 0 || isLoading
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : 'Resend Code'
              }
            </button>
          </div>

          {/* Verify Button */}
          <button
            onClick={() => onVerify(otp.join(''))}
            disabled={isLoading || otp.some(digit => digit === '')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Verify Code
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPopup;