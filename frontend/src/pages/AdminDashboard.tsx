import React from 'react';
import { useState } from 'react';
import Navbar from '../components/admin_db/Navbar';
import Sidebar from '../components/admin_db/Sidebar';
import Dashboard from '../components/admin_db/Dashboard';
import KYCApproval from '../components/admin_db/KYCApproval';
import PropertyVerification from '../components/admin_db/PropertyVerification';
import UserManagement from '../components/admin_db/UserManagement';
import TriggerDividends from '../components/admin_db/TriggerDividends';
import ComplianceLogs from '../components/admin_db/ComplianceLogs';
import SystemMetrics from '../components/admin_db/SystemMetrics';
import Transactions from '../components/admin_db/Transactions';
const mockUser = {
  name: 'John Admin',
  email: 'john@company.com',
  avatar: 'JA',
};
const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderPage = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'kyc':
        return <KYCApproval />;
      case 'property':
        return <PropertyVerification />;
      case 'users':
        return <UserManagement />;
      case 'dividends':
        return <TriggerDividends />;
      case 'compliance':
        return <ComplianceLogs />;
      case 'metrics':
        return <SystemMetrics />;
      case 'transactions':
        return <Transactions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300 lg:ml-64">
        {/* Navbar */}
        <Navbar onMenuClick={handleSidebarToggle} user={mockUser} />
        
        {/* Page content */}
        <main className="flex-1 p-4 sm:p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;