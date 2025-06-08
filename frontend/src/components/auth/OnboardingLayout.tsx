import React from 'react';
import { Shield, Users, Zap, Star } from 'lucide-react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get started in seconds with our streamlined onboarding'
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Join over 10,000+ users who trust our platform'
    },
    {
      icon: Star,
      title: 'Award Winning',
      description: 'Recognized for excellence in user experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Branding and Features */}
          <div className="hidden lg:block">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Welcome to the Future of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Digital Experience
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Join thousands of users who have transformed their workflow with our powerful platform. 
                Get started today and experience the difference.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-4 -left-4 w-96 h-96 bg-gradient-to-tr from-indigo-400 to-pink-400 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default OnboardingLayout;