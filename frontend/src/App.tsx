import { useState } from 'react';
import OnboardingLayout from './components/OnboardingLayout';
import AuthCard from './components/AuthCard';
import { CheckCircle } from 'lucide-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return (
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome aboard!</h1>
          <p className="text-gray-600 mb-8">Your account has been successfully created.</p>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    // <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}> 
    // <OnboardingLayout>
    //   <AuthCard onSuccess={handleAuthSuccess} />
    // </OnboardingLayout>
    // </GoogleOAuthProvider>
     <AdminDashboard/>
  );
}

export default App;