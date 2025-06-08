import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut
} from 'lucide-react';
import BasicInfo from './profile/BasicInfo';
import KYCVerification from './profile/KYCVerification';
import Documents from './profile/Documents';
import ProfileSettings from './profile/ProfileSettings';
import Support from './profile/Support';
import AccountClosure from './profile/AccountClosure';

const ProfileSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'kyc', label: 'KYC & Verification', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'account', label: 'Account Closure', icon: LogOut },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfo />;
      case 'kyc':
        return <KYCVerification />;
      case 'documents':
        return <Documents />;
      case 'settings':
        return <ProfileSettings />;
      case 'support':
        return <Support />;
      case 'account':
        return <AccountClosure />;
      default:
        return <BasicInfo />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your account information and preferences</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;