import { useState } from 'react';
import AuthCard from '../components/auth/AuthCard';
import { GoogleOAuthProvider } from '@react-oauth/google';

const AuthPage = () => {

      const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return (
      <></>
    );
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}> 
      <AuthCard onSuccess={handleAuthSuccess} />
    </GoogleOAuthProvider>

  );
}

export default AuthPage