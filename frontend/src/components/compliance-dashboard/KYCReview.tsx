import React, { useState } from 'react';
import { ChevronDown, Eye } from 'lucide-react';

interface KYCSubmission {
  id: string;
  name: string;
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface HistoryLogEntry {
  action: string;
  timestamp: string;
  actor: string;
  icon: React.ReactNode;
}

const KYCReview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  
  const submissions: KYCSubmission[] = [
    { id: '#12345', name: 'Ethan Carter', submissionDate: '2024-01-15', status: 'Pending' },
    { id: '#67890', name: 'Olivia Bennett', submissionDate: '2024-01-16', status: 'Pending' },
    { id: '#11223', name: 'Noah Thompson', submissionDate: '2024-01-17', status: 'Approved' },
    { id: '#44556', name: 'Ava Martinez', submissionDate: '2024-01-18', status: 'Rejected' },
    { id: '#77889', name: 'Liam Harris', submissionDate: '2024-01-19', status: 'Pending' },
    { id: '#98765', name: 'Liam Carter', submissionDate: '2024-07-26', status: 'Pending' },
    { id: '#54321', name: 'Olivia Bennett', submissionDate: '2024-07-25', status: 'Pending' },
    { id: '#24681', name: 'Ava Harper', submissionDate: '2024-07-23', status: 'Rejected' },
    { id: '#13579', name: 'Ethan Parker', submissionDate: '2024-07-22', status: 'Pending' },
  ];

  const historyLog: HistoryLogEntry[] = [
    {
      action: 'KYC Submitted',
      timestamp: '2024-07-26 10:00 AM by System',
      actor: 'System',
      icon: <div className="w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
    },
    {
      action: 'KYC Approved',
      timestamp: '2024-07-27 02:00 PM by Compliance Officer',
      actor: 'Compliance Officer',
      icon: <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded"></div>
    },
    {
      action: 'KYC Updated',
      timestamp: '2024-07-28 09:00 AM by System',
      actor: 'System',
      icon: <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded"></div>
    }
  ];

  const filteredSubmissions = submissions.filter(submission => submission.status === activeTab);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'Approved':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'Rejected':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
    }
  };

  const ActionButton: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'secondary' }> = ({ 
    children, 
    variant = 'secondary' 
  }) => (
    <button className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
      variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800' 
        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-300 dark:hover:text-blue-200 dark:hover:bg-blue-900'
    }`}>
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#23262b]">
      {/* Main Content */}
      <main className="p-6">
          {/* KYC Verification Center Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">KYC Verification Center</h1>
            <p className="text-gray-600 dark:text-gray-300">Review and manage pending KYC submissions.</p>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                {(['Pending', 'Approved', 'Rejected'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600 dark:border-[#AE5968] dark:text-[#AE5968]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                    }`}
                  >
                    {tab}
                    <ChevronDown className="ml-1 w-4 h-4 inline-block" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Verifications Table */}
          <div className="bg-white dark:bg-[#303540] rounded-lg border border-gray-200 dark:border-[#444857] mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-[#23262b]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Submitted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#303540] divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-[#23262b]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {submission.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200">
                        {submission.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-300">
                        {submission.submissionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(submission.status)}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        {submission.status === 'Pending' ? (
                          <>
                            <ActionButton>Preview</ActionButton>
                            <ActionButton>Flag</ActionButton>
                          </>
                        ) : (
                          <ActionButton>
                            <Eye className="w-4 h-4 inline mr-1" />
                            View Details
                          </ActionButton>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KYC History Log */}
          <div className="bg-white dark:bg-[#303540] rounded-lg border border-gray-200 dark:border-[#444857]">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#444857]">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">KYC History Log</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {historyLog.map((entry, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      {entry.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{entry.action}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-300">{entry.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};

export default KYCReview;