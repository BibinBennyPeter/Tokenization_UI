import React from 'react';
import {
  X,
  Home,
  FileCheck,
  Building,
  Users,
  DollarSign,
  Shield,
  BarChart3,
  CreditCard
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onItemClick: (id: string) => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/' },
  { id: 'kyc', label: 'KYC Approval Queue', icon: FileCheck, path: '/kyc-approval' },
  { id: 'property', label: 'Property Verification', icon: Building, path: '/property-verification' },
  { id: 'users', label: 'User Management', icon: Users, path: '/user-management' },
  { id: 'dividends', label: 'Trigger Dividends', icon: DollarSign, path: '/trigger-dividends' },
  { id: 'compliance', label: 'Compliance Logs', icon: Shield, path: '/compliance-logs' },
  { id: 'metrics', label: 'System Metrics', icon: BarChart3, path: '/system-metrics' },
  { id: 'transactions', label: 'Transaction Tracker', icon: CreditCard, path: '/transactions' }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeItem, onItemClick }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}      
       <div className={`
        fixed lg:sticky top-0 left-0
        h-screen w-64 bg-gray-900 text-white
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 z-50
      `}>

        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-700 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-4">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onItemClick(id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-700 transition-colors
              ${activeItem === id ? 'bg-blue-600 border-r-4 border-blue-400' : ''}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
