import React from 'react';

type NotificationItem = {
  id: number;
  type: 'Alert' | 'Announcement';
  category: string;
  message: string;
  date: string;
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    type: 'Alert',
    category: 'Property',
    message: 'Your property "Palm Hills Estate" has been approved.',
    date: '2025-06-07',
  },
  {
    id: 2,
    type: 'Alert',
    category: 'KYC',
    message: 'Your KYC verification was successful.',
    date: '2025-06-06',
  },
  {
    id: 3,
    type: 'Alert',
    category: 'Token Sale',
    message: '500 tokens sold for "Green Valley Farm".',
    date: '2025-06-05',
  },
  {
    id: 4,
    type: 'Alert',
    category: 'Payout',
    message: 'Payout of AED 15,000 has been processed to your bank.',
    date: '2025-06-04',
  },
  {
    id: 5,
    type: 'Announcement',
    category: 'System',
    message: 'New platform update released — faster token trade engine deployed.',
    date: '2025-06-03',
  },
  {
    id: 6,
    type: 'Announcement',
    category: 'Policy',
    message: 'Policy change: Exit request window is now reduced to 14 days.',
    date: '2025-06-02',
  },
];

const Notification: React.FC = () => {
  const alerts = notifications.filter(n => n.type === 'Alert');
  const announcements = notifications.filter(n => n.type === 'Announcement');

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications Center</h1>

      {/* Alerts Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Alerts</h2>
        <ul className="space-y-3">
          {alerts.map(alert => (
            <li key={alert.id} className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">{alert.category}</span>
                <span className="text-xs text-gray-500">{alert.date}</span>
              </div>
              <p className="text-sm text-gray-800 mt-1">{alert.message}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* System Announcements Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">System Announcements</h2>
        <ul className="space-y-3">
          {announcements.map(note => (
            <li key={note.id} className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-500">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">{note.category}</span>
                <span className="text-xs text-gray-500">{note.date}</span>
              </div>
              <p className="text-sm text-gray-800 mt-1">{note.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
