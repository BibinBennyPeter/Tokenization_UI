import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronDown, ChevronUp, Shield, AlertTriangle } from 'lucide-react';

interface ComplianceLog {
  id: string;
  timestamp: string;
  adminName: string;
  adminEmail: string;
  actionType: ActionType;
  target: string;
  description: string;
  isSensitive: boolean;
}

type ActionType = 
  | 'KYC_APPROVED' 
  | 'KYC_REJECTED' 
  | 'DIVIDEND_TRIGGERED' 
  | 'PROPERTY_APPROVED' 
  | 'PROPERTY_REJECTED'
  | 'ROLE_CHANGED' 
  | 'USER_DELETED' 
  | 'TOKEN_MINTED' 
  | 'TRANSACTION_VERIFIED'
  | 'DOCUMENT_UPLOADED'
  | 'PAYOUT_PROCESSED'
  | 'SYSTEM_CONFIG_CHANGED';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">Monitor and audit all system activities for compliance and security purposes.</p>
      </div>
      {children}
    </div>
  </div>
);

const ComplianceLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedActionType, setSelectedActionType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showSensitiveOnly, setShowSensitiveOnly] = useState(false);

  // Mock data
  const mockLogs: ComplianceLog[] = [
    {
      id: '1',
      timestamp: '2025-06-08T09:15:30Z',
      adminName: 'Sarah Johnson',
      adminEmail: 'sarah.johnson@admin.com',
      actionType: 'KYC_APPROVED',
      target: 'Ahmed Al-Rashid',
      description: 'Approved KYC verification for Ahmed Al-Rashid after document review',
      isSensitive: false
    },
    {
      id: '2',
      timestamp: '2025-06-08T08:45:12Z',
      adminName: 'Michael Chen',
      adminEmail: 'michael.chen@admin.com',
      actionType: 'DIVIDEND_TRIGGERED',
      target: 'Burj Vista Tower',
      description: 'Triggered dividend payout of 120,000 AED for Burj Vista Tower investors',
      isSensitive: true
    },
    {
      id: '3',
      timestamp: '2025-06-07T16:30:45Z',
      adminName: 'Emma Wilson',
      adminEmail: 'emma.wilson@admin.com',
      actionType: 'PROPERTY_APPROVED',
      target: 'Marina Bay Complex',
      description: 'Approved property listing for Marina Bay Complex after due diligence',
      isSensitive: false
    },
    {
      id: '4',
      timestamp: '2025-06-07T14:22:18Z',
      adminName: 'David Rodriguez',
      adminEmail: 'david.rodriguez@admin.com',
      actionType: 'ROLE_CHANGED',
      target: 'Lisa Chen',
      description: 'Changed user role from Investor to Premium Investor for Lisa Chen',
      isSensitive: true
    },
    {
      id: '5',
      timestamp: '2025-06-07T11:15:33Z',
      adminName: 'Sarah Johnson',
      adminEmail: 'sarah.johnson@admin.com',
      actionType: 'KYC_REJECTED',
      target: 'John Smith',
      description: 'Rejected KYC application for John Smith due to incomplete documentation',
      isSensitive: false
    },
    {
      id: '6',
      timestamp: '2025-06-06T15:45:21Z',
      adminName: 'Michael Chen',
      adminEmail: 'michael.chen@admin.com',
      actionType: 'USER_DELETED',
      target: 'test@example.com',
      description: 'Deleted inactive test user account after 90 days of inactivity',
      isSensitive: true
    },
    {
      id: '7',
      timestamp: '2025-06-06T13:20:55Z',
      adminName: 'Emma Wilson',
      adminEmail: 'emma.wilson@admin.com',
      actionType: 'TOKEN_MINTED',
      target: 'Downtown Plaza',
      description: 'Minted 8,000 new tokens for Downtown Plaza property tokenization',
      isSensitive: false
    },
    {
      id: '8',
      timestamp: '2025-06-06T10:30:12Z',
      adminName: 'David Rodriguez',
      adminEmail: 'david.rodriguez@admin.com',
      actionType: 'TRANSACTION_VERIFIED',
      target: 'TXN-4567890',
      description: 'Verified blockchain transaction TXN-4567890 for token transfer',
      isSensitive: false
    },
    {
      id: '9',
      timestamp: '2025-06-05T17:15:44Z',
      adminName: 'Sarah Johnson',
      adminEmail: 'sarah.johnson@admin.com',
      actionType: 'DOCUMENT_UPLOADED',
      target: 'Palm Heights Property',
      description: 'Uploaded legal documentation for Palm Heights Property due diligence',
      isSensitive: false
    },
    {
      id: '10',
      timestamp: '2025-06-05T14:45:28Z',
      adminName: 'Michael Chen',
      adminEmail: 'michael.chen@admin.com',
      actionType: 'PAYOUT_PROCESSED',
      target: 'Marina Bay Investors',
      description: 'Processed quarterly dividend payout to 25 Marina Bay Complex investors',
      isSensitive: true
    },
    {
      id: '11',
      timestamp: '2025-06-05T09:20:17Z',
      adminName: 'Emma Wilson',
      adminEmail: 'emma.wilson@admin.com',
      actionType: 'SYSTEM_CONFIG_CHANGED',
      target: 'KYC Settings',
      description: 'Updated KYC verification requirements to include additional identity checks',
      isSensitive: true
    },
    {
      id: '12',
      timestamp: '2025-06-04T16:55:33Z',
      adminName: 'David Rodriguez',
      adminEmail: 'david.rodriguez@admin.com',
      actionType: 'PROPERTY_REJECTED',
      target: 'Sunset Apartments',
      description: 'Rejected property application for Sunset Apartments due to regulatory compliance issues',
      isSensitive: false
    }
  ];

  const uniqueAdmins = Array.from(new Set(mockLogs.map(log => log.adminEmail))).sort();
  const actionTypes: ActionType[] = [
    'KYC_APPROVED', 'KYC_REJECTED', 'DIVIDEND_TRIGGERED', 'PROPERTY_APPROVED', 
    'PROPERTY_REJECTED', 'ROLE_CHANGED', 'USER_DELETED', 'TOKEN_MINTED', 
    'TRANSACTION_VERIFIED', 'DOCUMENT_UPLOADED', 'PAYOUT_PROCESSED', 'SYSTEM_CONFIG_CHANGED'
  ];

  const getActionBadgeColor = (actionType: ActionType): string => {
    const colors = {
      KYC_APPROVED: 'bg-green-100 text-green-800',
      KYC_REJECTED: 'bg-red-100 text-red-800',
      DIVIDEND_TRIGGERED: 'bg-purple-100 text-purple-800',
      PROPERTY_APPROVED: 'bg-blue-100 text-blue-800',
      PROPERTY_REJECTED: 'bg-red-100 text-red-800',
      ROLE_CHANGED: 'bg-yellow-100 text-yellow-800',
      USER_DELETED: 'bg-red-100 text-red-800',
      TOKEN_MINTED: 'bg-green-100 text-green-800',
      TRANSACTION_VERIFIED: 'bg-blue-100 text-blue-800',
      DOCUMENT_UPLOADED: 'bg-gray-100 text-gray-800',
      PAYOUT_PROCESSED: 'bg-purple-100 text-purple-800',
      SYSTEM_CONFIG_CHANGED: 'bg-orange-100 text-orange-800'
    };
    return colors[actionType] || 'bg-gray-100 text-gray-800';
  };

  const getAdminInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredLogs = useMemo(() => {
    let filtered = mockLogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.adminEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by admin
    if (selectedAdmin) {
      filtered = filtered.filter(log => log.adminEmail === selectedAdmin);
    }

    // Filter by action type
    if (selectedActionType) {
      filtered = filtered.filter(log => log.actionType === selectedActionType);
    }

    // Filter by date range
    if (dateFrom) {
      filtered = filtered.filter(log => new Date(log.timestamp) >= new Date(dateFrom));
    }
    if (dateTo) {
      filtered = filtered.filter(log => new Date(log.timestamp) <= new Date(dateTo + 'T23:59:59'));
    }

    // Filter sensitive actions only
    if (showSensitiveOnly) {
      filtered = filtered.filter(log => log.isSensitive);
    }

    // Sort by timestamp
    filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [mockLogs, searchTerm, selectedAdmin, selectedActionType, dateFrom, dateTo, showSensitiveOnly, sortOrder]);

  const exportToCSV = () => {
    const csvContent = [
      ['Timestamp', 'Admin Name', 'Admin Email', 'Action Type', 'Target', 'Description', 'Sensitive'],
      ...filteredLogs.map(log => [
        formatTimestamp(log.timestamp),
        log.adminName,
        log.adminEmail,
        log.actionType,
        log.target,
        log.description,
        log.isSensitive ? 'Yes' : 'No'
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAdmin('');
    setSelectedActionType('');
    setDateFrom('');
    setDateTo('');
    setShowSensitiveOnly(false);
  };

  return (
    <PageLayout title="Compliance Logs">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Filters Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search logs by admin, action, target, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Admin Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin User</label>
              <select
                value={selectedAdmin}
                onChange={(e) => setSelectedAdmin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Admins</option>
                {uniqueAdmins.map(email => (
                  <option key={email} value={email}>{email}</option>
                ))}
              </select>
            </div>

            {/* Action Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
              <select
                value={selectedActionType}
                onChange={(e) => setSelectedActionType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Actions</option>
                {actionTypes.map(type => (
                  <option key={type} value={type}>{type.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showSensitiveOnly}
                onChange={(e) => setShowSensitiveOnly(e.target.checked)}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Show sensitive actions only
              </span>
            </label>

            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>

            <div className="text-sm text-gray-500">
              Showing {filteredLogs.length} of {mockLogs.length} entries
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Timestamp
                    {sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      {log.isSensitive && <Shield className="w-4 h-4 text-red-500" />}
                      {formatTimestamp(log.timestamp)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {getAdminInitials(log.adminName)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{log.adminName}</div>
                        <div className="text-sm text-gray-500">{log.adminEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActionBadgeColor(log.actionType)}`}>
                      {log.actionType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.target}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                    <div className="truncate" title={log.description}>
                      {log.description}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No logs found</div>
              <div className="text-gray-400 text-sm">Try adjusting your search criteria or filters</div>
            </div>
          )}
        </div>

        {/* Pagination could be added here for large datasets */}
      </div>
    </PageLayout>
  );
};

export default ComplianceLogs;