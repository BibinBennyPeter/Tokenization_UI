import React, { useState } from 'react';
import { ChevronDown, Search, Eye } from 'lucide-react';

interface Transaction {
  userId: string;
  name: string;
  transactionId: string;
  amount: string;
  frequency: number;
  status: 'Normal' | 'Flagged' | 'Suspicious';
}

interface FlaggedUser {
  userId: string;
  name: string;
}

const AMLMonitoring: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [amountFilter, setAmountFilter] = useState<string>('');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('');

  const transactions: Transaction[] = [
    { userId: 'USR123', name: 'Ethan Carter', transactionId: 'TXN456', amount: '$5,000', frequency: 3, status: 'Normal' },
    { userId: 'USR456', name: 'Olivia Bennett', transactionId: 'TXN789', amount: '$10,000', frequency: 5, status: 'Flagged' },
    { userId: 'USR789', name: 'Liam Harper', transactionId: 'TXN101', amount: '$2,500', frequency: 1, status: 'Normal' },
    { userId: 'USR101', name: 'Ava Thompson', transactionId: 'TXN112', amount: '$7,500', frequency: 4, status: 'Suspicious' },
    { userId: 'USR112', name: 'Noah Foster', transactionId: 'TXN123', amount: '$12,000', frequency: 6, status: 'Flagged' },
  ];

  const flaggedUsers: FlaggedUser[] = [
    { userId: 'USR456', name: 'Olivia Bennett' },
    { userId: 'USR112', name: 'Noah Foster' },
    { userId: 'USR789', name: 'Liam Harper' },
  ];

  const chartData = [
    { day: 'Mon', value: 80 },
    { day: 'Tue', value: 65 },
    { day: 'Wed', value: 90 },
    { day: 'Thu', value: 75 },
    { day: 'Fri', value: 85 },
    { day: 'Sat', value: 70 },
    { day: 'Sun', value: 95 },
  ];

  // Extracted colors from KYCReview
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Normal':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Flagged':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Suspicious':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Extracted button styles from KYCReview
  const ActionButton: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'secondary' }> = ({ 
    children, 
    variant = 'secondary' 
  }) => (
    <button className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
      variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
    }`}>
      {children}
    </button>
  );

  const FilterDropdown: React.FC<{ label: string; value: string; onChange: (value: string) => void }> = ({
    label,
    value,
    onChange
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-gray-50 border border-gray-200 px-4 py-2 pr-8 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{label}</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AML Monitoring Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm mb-2">Total High-Value Transactions</div>
            <div className="text-3xl font-bold text-gray-900">1,234</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm mb-2">Flagged Users</div>
            <div className="text-3xl font-bold text-gray-900">56</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm mb-2">Suspicious Volume</div>
            <div className="text-3xl font-bold text-gray-900">$789,000</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-gray-600 text-sm mb-2">Active Alerts</div>
            <div className="text-3xl font-bold text-gray-900">12</div>
          </div>
        </div>

        {/* Transaction Overview */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Transaction Overview</h2>
          </div>
          <div className="p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full bg-gray-50 text-gray-900 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-4 mb-6">
              <FilterDropdown label="Status" value={statusFilter} onChange={setStatusFilter} />
              <FilterDropdown label="Amount" value={amountFilter} onChange={setAmountFilter} />
              <FilterDropdown label="Frequency" value={frequencyFilter} onChange={setFrequencyFilter} />
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.userId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.transactionId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.frequency}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(transaction.status)}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <ActionButton>Tag as Suspicious</ActionButton>
                        <ActionButton>View Details</ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Suspicious Activity Heatmap */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Suspicious Activity Heatmap</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="text-gray-600 text-sm mb-2">Suspicious Activity Timeline</div>
                <div className="text-4xl font-bold text-gray-900 mb-2">120</div>
                <div className="text-green-600 text-sm">Last 7 Days +15%</div>
              </div>
              
              {/* Bar Chart */}
              <div className="flex items-end justify-between h-32 mb-4">
                {chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-blue-600 w-8 rounded-t"
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <div className="text-gray-500 text-xs mt-2">{item.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flagged Users */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Flagged Users</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {flaggedUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.userId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <ActionButton>Mark as Safe</ActionButton>
                          <ActionButton>Escalate</ActionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Threshold Management */}
        <div className="bg-white rounded-lg border border-gray-200 mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Threshold Management</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 text-sm mb-2">Amount Threshold</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount threshold"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-2">Frequency Threshold</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter frequency threshold"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AMLMonitoring;