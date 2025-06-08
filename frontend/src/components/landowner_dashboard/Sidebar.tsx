import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard' },
    { id: 'profile', label: 'Profile & KYC' },
    { id: 'add-property', label: 'Add New Property' },
    { id: 'properties', label: 'My Properties' },
    { id: 'tokenization', label: 'Tokenization Details' },
    { id: 'insights', label: 'Investment Insights' },
    { id: 'payouts', label: 'Payouts / Withdrawals' },
    { id: 'exit', label: 'Exit Requests' },
    // { id: 'notifications', label: 'Notifications' },
    { id: 'support', label: 'Help & Support' },
    { id: 'audit', label: 'Audit Log' }
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-md border-r border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Landowner Dashboard</h2>
      </div>
      <nav className="flex-1 overflow-y-auto pt-4 pb-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
