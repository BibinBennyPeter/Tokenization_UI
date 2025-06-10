import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Calendar, User, Shield, Coins, DollarSign, FileCheck, Eye, Clock, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

const AuditLogs: React.FC = () => {
  // Sample audit log data
  const [auditLogs] = useState([
    {
      id: 'LOG-001',
      timestamp: '2025-06-09T14:30:00Z',
      category: 'Admin Actions',
      action: 'User Account Suspended',
      performedBy: 'admin@company.com',
      targetUser: 'user123@example.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: 'Account suspended due to suspicious activity',
      severity: 'High',
      status: 'Completed'
    },
    {
      id: 'LOG-002',
      timestamp: '2025-06-09T13:15:00Z',
      category: 'Token Issuance',
      action: 'New Token Minted',
      performedBy: 'system@company.com',
      targetUser: 'investor@example.com',
      ipAddress: '10.0.0.50',
      userAgent: 'API Client v2.1',
      details: 'Property Token #TKN-456 issued for $50,000 investment',
      severity: 'Medium',
      status: 'Completed'
    },
    {
      id: 'LOG-003',
      timestamp: '2025-06-09T12:45:00Z',
      category: 'Dividend Distributions',
      action: 'Quarterly Dividend Processed',
      performedBy: 'finance@company.com',
      targetUser: 'multiple_users',
      ipAddress: '10.0.0.25',
      userAgent: 'Internal System',
      details: 'Q2 2025 dividend distribution of $125,000 to 150 token holders',
      severity: 'Medium',
      status: 'Completed'
    },
    {
      id: 'LOG-004',
      timestamp: '2025-06-09T11:20:00Z',
      category: 'User KYC Updates',
      action: 'KYC Document Verification',
      performedBy: 'kyc@company.com',
      targetUser: 'newuser@example.com',
      ipAddress: '192.168.1.200',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      details: 'Identity documents verified and approved',
      severity: 'Low',
      status: 'Completed'
    },
    {
      id: 'LOG-005',
      timestamp: '2025-06-09T10:05:00Z',
      category: 'Admin Actions',
      action: 'System Configuration Changed',
      performedBy: 'admin@company.com',
      targetUser: 'system',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0.4472.124',
      details: 'Updated minimum investment threshold to $1,000',
      severity: 'High',
      status: 'Completed'
    },
    {
      id: 'LOG-006',
      timestamp: '2025-06-09T09:30:00Z',
      category: 'Token Issuance',
      action: 'Token Transfer Failed',
      performedBy: 'system@company.com',
      targetUser: 'trader@example.com',
      ipAddress: '10.0.0.75',
      userAgent: 'API Client v2.1',
      details: 'Token transfer failed due to insufficient balance',
      severity: 'Medium',
      status: 'Failed'
    },
    {
      id: 'LOG-007',
      timestamp: '2025-06-08T16:45:00Z',
      category: 'User KYC Updates',
      action: 'KYC Status Updated',
      performedBy: 'compliance@company.com',
      targetUser: 'customer@example.com',
      ipAddress: '192.168.1.150',
      userAgent: 'Safari/14.1.1',
      details: 'KYC status changed from Pending to Verified',
      severity: 'Low',
      status: 'Completed'
    },
    {
      id: 'LOG-008',
      timestamp: '2025-06-08T15:20:00Z',
      category: 'Dividend Distributions',
      action: 'Dividend Calculation Error',
      performedBy: 'system@company.com',
      targetUser: 'multiple_users',
      ipAddress: '10.0.0.25',
      userAgent: 'Internal System',
      details: 'Error in dividend calculation - manual intervention required',
      severity: 'High',
      status: 'Failed'
    }
  ]);

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('newest');

  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
    performedBy: '',
    severity: '',
    status: '',
    searchTerm: ''
  });

  // Filter logs based on current filters
  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesCategory = !filters.category || log.category === filters.category;
      const matchesPerformedBy = !filters.performedBy || log.performedBy.toLowerCase().includes(filters.performedBy.toLowerCase());
      const matchesSeverity = !filters.severity || log.severity === filters.severity;
      const matchesStatus = !filters.status || log.status === filters.status;
      const matchesSearch = !filters.searchTerm || 
        log.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const logDate = new Date(log.timestamp);
      const matchesDateFrom = !filters.dateFrom || logDate >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || logDate <= new Date(filters.dateTo);

      return matchesCategory && matchesPerformedBy && matchesSeverity && matchesStatus && 
             matchesSearch && matchesDateFrom && matchesDateTo;
    });
  }, [auditLogs, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      dateFrom: '',
      dateTo: '',
      performedBy: '',
      severity: '',
      status: '',
      searchTerm: ''
    });
  };

  const exportLogs = () => {
    const csvContent = [
      ['Log ID', 'Timestamp', 'Category', 'Action', 'Performed By', 'Target User', 'IP Address', 'User Agent', 'Details', 'Severity', 'Status'],
      ...filteredLogs.map(log => [
        log.id, log.timestamp, log.category, log.action, log.performedBy, log.targetUser, 
        log.ipAddress, log.userAgent, log.details, log.severity, log.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Admin Actions':
        return <Shield className="w-5 h-5 text-red-400" />;
      case 'Token Issuance':
        return <Coins className="w-5 h-5 text-yellow-400" />;
      case 'Dividend Distributions':
        return <DollarSign className="w-5 h-5 text-green-400" />;
      case 'User KYC Updates':
        return <FileCheck className="w-5 h-5 text-blue-400" />;
      default:
        return <Settings className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (severity) {
      case 'High':
        return `${baseClasses} bg-red-900 text-red-200 border border-red-700`;
      case 'Medium':
        return `${baseClasses} bg-yellow-900 text-yellow-200 border border-yellow-700`;
      case 'Low':
        return `${baseClasses} bg-green-900 text-green-200 border border-green-700`;
      default:
        return `${baseClasses} bg-gray-800 text-gray-200 border border-gray-600`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Failed':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCategoryStats = () => {
    const stats: Record<string, number> = filteredLogs.reduce((acc, log) => {
      acc[log.category] = (acc[log.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Logs</h1>
              <p className="text-gray-600">Track and monitor all system activities and compliance events</p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Download className="w-4 h-4" />
                Export Logs
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search logs by ID, action, or details..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {Object.entries(categoryStats).map(([category, count]) => (
            <div key={category} className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{category}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
                </div>
                {getCategoryIcon(category)}
              </div>
            </div>
          ))}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Categories</option>
                  <option value="Admin Actions">Admin Actions</option>
                  <option value="Token Issuance">Token Issuance</option>
                  <option value="Dividend Distributions">Dividend Distributions</option>
                  <option value="User KYC Updates">User KYC Updates</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                <select
                  value={filters.severity}
                  onChange={(e) => handleFilterChange('severity', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Severities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Performed By</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  value={filters.performedBy}
                  onChange={(e) => handleFilterChange('performedBy', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              Showing <span className="font-medium text-gray-900">{filteredLogs.length}</span> of{' '}
              <span className="font-medium text-gray-900">{auditLogs.length}</span> logs
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Log Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Performed By</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-1">{log.action}</div>
                        <div className="text-xs text-gray-500 mb-1">ID: {log.id}</div>
                        <div className="text-xs text-gray-500 max-w-md truncate">{log.details}</div>
                        {log.targetUser !== 'system' && log.targetUser !== 'multiple_users' && (
                          <div className="text-xs text-blue-600 mt-1">Target: {log.targetUser}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(log.category)}
                        <span className="text-sm text-gray-700">{log.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{log.performedBy}</div>
                      <div className="text-xs text-gray-500">{log.ipAddress}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getSeverityBadge(log.severity)}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="text-sm text-gray-700">{log.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Compliance Guidelines</h3>
              <p className="text-xs text-gray-600">
                All audit logs are retained for a minimum of 7 years as per financial regulations.
                Regular reviews of audit logs are required to ensure compliance with regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;