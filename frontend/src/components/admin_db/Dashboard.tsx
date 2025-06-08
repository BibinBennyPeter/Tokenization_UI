import React from 'react';
import PageLayout from './PageLayout'

// Dashboard Component
const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Pending KYC', value: '24', change: '+12%', color: 'text-orange-600' },
    { label: 'Properties Verified', value: '142', change: '+8%', color: 'text-green-600' },
    { label: 'Active Users', value: '1,247', change: '+15%', color: 'text-blue-600' },
    { label: 'Total Transactions', value: '$2.4M', change: '+23%', color: 'text-purple-600' }
  ];

  return (
    <PageLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${stat.color}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">New KYC application submitted</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Property verification completed</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Dividend payment processed</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Services</span>
              <span className="text-green-600 text-sm font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <span className="text-green-600 text-sm font-medium">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Payment Gateway</span>
              <span className="text-green-600 text-sm font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export default Dashboard;