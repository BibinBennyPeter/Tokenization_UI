import React, { useState } from 'react';
import Sidebar from '../../components/landowner_dashboard/Sidebar';
import TopNavBar from '../../components/landowner_dashboard/TopNavBar';

// Pages
import OverviewPage from '../../components/landowner_dashboard/OverviewPage';
import AddNewProperty from '../../components/landowner_dashboard/AddNewProperty';
import ProfileKYC from '../../components/landowner_dashboard/ProfileKYC';
import MyProperties from '../../components/landowner_dashboard/MyProperties';
import TokenizationDetails from '../../components/landowner_dashboard/TokenizationDetails';
import InvestmentInsights from '../../components/landowner_dashboard/InvestmentInsights';
import PayoutsWithdrawals from '../../components/landowner_dashboard/PayoutsWithdrawals';
import ExitRequests from '../../components/landowner_dashboard/ExitRequests';
import Notifications from '../../components/landowner_dashboard/Notifications';
import HelpSupport from '../../components/landowner_dashboard/HelpSupport';
import AuditLog from '../../components/landowner_dashboard/AuditLog';

const Landowner: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPage />;
      case 'profile':
        return <ProfileKYC />;
      case 'add-property':
        return <AddNewProperty />;
      case 'properties':
        return <MyProperties />;
      case 'tokenization':
        return <TokenizationDetails />;
      case 'insights':
        return <InvestmentInsights />;
      case 'payouts':
        return <PayoutsWithdrawals />;
      case 'exit':
        return <ExitRequests />;
      case 'notifications':
        return <Notifications />;
      case 'support':
        return <HelpSupport />;
      case 'audit':
        return <AuditLog />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen w-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <TopNavBar />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Landowner;
