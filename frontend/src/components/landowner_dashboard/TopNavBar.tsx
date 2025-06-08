import React, { useState } from 'react';
import { Bell, HelpCircle, User } from 'lucide-react';

const mockNotifications = [
  '🏡 Property "Palm Hills Estate" approved.',
  '📄 KYC verified successfully.',
  '💸 500 tokens sold from "Green Valley Farm".',
  '🏦 Payout of AED 12,000 processed.',
];

const TopNavBar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="w-full bg-white border-b shadow-sm flex items-center justify-between px-6 py-3 relative">
      <h1 className="text-xl font-semibold text-gray-800"></h1>

      <div className="flex items-center space-x-6 relative">
        {/* Notification Button */}
        <div className="relative">
          <button
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-600 hover:text-blue-600"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-ping" />
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-3 text-sm text-gray-700 font-semibold border-b">Notifications</div>
              <ul className="max-h-64 overflow-y-auto text-sm text-gray-800">
                {mockNotifications.length > 0 ? (
                  mockNotifications.map((note, idx) => (
                    <li key={idx} className="px-4 py-2 border-b last:border-0 hover:bg-gray-50">
                      {note}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No new notifications</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Help / Support */}
        <button
          title="Support"
          className="text-gray-600 hover:text-blue-600"
        >
          <HelpCircle size={20} />
        </button>

        {/* Profile / Control */}
        <button
          title="Profile"
          className="text-gray-600 hover:text-blue-600"
        >
          <User size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopNavBar;
