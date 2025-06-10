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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeItem, onItemClick }) => (
  <>
    {/* Mobile overlay */}
    {isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
    )}
    {/* Mobile sidebar */}
    <div className={`
      fixed top-0 left-0 h-screen w-64 bg-white text-black border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden
    `}>
      <div className="flex items-center justify-between p-4 border-b border-green-700">
        <h1 className="text-xl text-black font-bold">Admin Panel</h1>
        <button onClick={onClose} className="lg:hidden p-1 hover:bg-red-700 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="mt-4">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onItemClick(id)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-green-100 hover:text-green-500 not-last:transition-colors
            ${activeItem === id ? 'bg-green-600 border-r-4 border-blue-400' : ''}`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
    {/* Desktop sidebar */}
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-white lg:text-black lg:border-r lg:border-gray-200 lg:z-50 lg:flex lg:flex-col">
      <div className="flex items-center justify-between p-4 border-b border-green-700">
        <h1 className="text-xl text-black font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-4">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onItemClick(id)}
            className={`w-full flex items-center px-4 py-3 text-left hover:bg-green-100 hover:text-green-500 not-last:transition-colors
            ${activeItem === id ? 'bg-green-600 border-r-4 border-blue-400' : ''}`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  </>
);

export default Sidebar;
