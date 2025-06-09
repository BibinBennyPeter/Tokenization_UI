import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Download, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageLayout from './PageLayout';
// Mock data type
interface ComplianceLog {
  id: string;
  timestamp: string;
  actionType: string;
  performedBy: string;
  summary: string;
  fullDetails: string;
  userEmail?: string;
  propertyId?: string;
  statusChange?: { from: string; to: string };
}

// Mock data
const mockLogs: ComplianceLog[] = [
  {
    id: '1',
    timestamp: '2024-06-09T10:30:00Z',
    actionType: 'KYC_APPROVED',
    performedBy: 'admin@realestate.com',
    summary: 'KYC verification approved for user john.doe@email.com',
    fullDetails: 'Comprehensive KYC verification completed. All documents verified including ID, proof of address, and income verification.',
    userEmail: 'john.doe@email.com',
    statusChange: { from: 'PENDING', to: 'APPROVED' }
  },
  {
    id: '2',
    timestamp: '2024-06-09T09:15:00Z',
    actionType: 'DIVIDEND_TRIGGERED',
    performedBy: 'system@realestate.com',
    summary: 'Quarterly dividend payout initiated for Property #PROP-001',
    fullDetails: 'Automated quarterly dividend distribution of $50,000 across 100 token holders for Sunset Plaza property.',
    propertyId: 'PROP-001',
    userEmail: 'multiple_recipients'
  },
  {
    id: '3',
    timestamp: '2024-06-09T08:45:00Z',
    actionType: 'ROLE_CHANGED',
    performedBy: 'superadmin@realestate.com',
    summary: 'User role updated from Investor to Premium Investor',
    fullDetails: 'Role escalation performed due to investment threshold reached. User now has access to premium investment opportunities.',
    userEmail: 'investor@email.com',
    statusChange: { from: 'INVESTOR', to: 'PREMIUM_INVESTOR' }
  },
  {
    id: '4',
    timestamp: '2024-06-08T16:20:00Z',
    actionType: 'TOKEN_MINTED',
    performedBy: 'admin@realestate.com',
    summary: 'New property tokens minted for Marina Heights',
    fullDetails: 'Minted 1000 tokens representing ownership shares in Marina Heights property. Total property value: $2,500,000.',
    propertyId: 'PROP-002'
  },
  {
    id: '5',
    timestamp: '2024-06-08T14:10:00Z',
    actionType: 'KYC_REJECTED',
    performedBy: 'compliance@realestate.com',
    summary: 'KYC verification rejected due to incomplete documentation',
    fullDetails: 'KYC application rejected. Missing valid government ID and proof of address. User notified to resubmit complete documentation.',
    userEmail: 'incomplete@email.com',
    statusChange: { from: 'PENDING', to: 'REJECTED' }
  },
  {
    id: '6',
    timestamp: '2024-06-08T11:30:00Z',
    actionType: 'PROPERTY_DELETED',
    performedBy: 'superadmin@realestate.com',
    summary: 'Property listing removed from platform',
    fullDetails: 'Property PROP-003 permanently removed due to legal compliance issues. All associated tokens have been refunded.',
    propertyId: 'PROP-003'
  }
];



const ComplianceLogs: React.FC = () => {
  const [selectedLog, setSelectedLog] = useState<ComplianceLog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionTypeFilter, setActionTypeFilter] = useState('');
  const [adminFilter, setAdminFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  // Get unique action types and admins for filters
  const actionTypes = [...new Set(mockLogs.map(log => log.actionType))];
  const admins = [...new Set(mockLogs.map(log => log.performedBy))];

  // Filter logs
  const filteredLogs = useMemo(() => {
    return mockLogs.filter(log => {
      const matchesSearch = searchTerm === '' || 
        log.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.propertyId?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesActionType = actionTypeFilter === '' || log.actionType === actionTypeFilter;
      const matchesAdmin = adminFilter === '' || log.performedBy === adminFilter;
      
      const logDate = new Date(log.timestamp);
      const matchesDateFrom = dateFrom === '' || logDate >= new Date(dateFrom);
      const matchesDateTo = dateTo === '' || logDate <= new Date(dateTo);
      
      return matchesSearch && matchesActionType && matchesAdmin && matchesDateFrom && matchesDateTo;
    });
  }, [searchTerm, actionTypeFilter, adminFilter, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get action type styling
  const getActionTypeStyle = (actionType: string) => {
    const sensitiveActions = ['PROPERTY_DELETED', 'KYC_REJECTED', 'DIVIDEND_TRIGGERED'];
    if (sensitiveActions.includes(actionType)) {
      return 'bg-red-100 text-red-800 border border-red-200';
    }
    if (actionType.includes('APPROVED')) {
      return 'bg-green-100 text-green-800 border border-green-200';
    }
    return 'bg-blue-100 text-blue-800 border border-blue-200';
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Timestamp', 'Action Type', 'Performed By', 'Summary', 'User Email', 'Property ID'],
      ...filteredLogs.map(log => [
        formatTimestamp(log.timestamp),
        log.actionType,
        log.performedBy,
        log.summary,
        log.userEmail || '',
        log.propertyId || ''
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <PageLayout title="Compliance Logs">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Action Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={actionTypeFilter}
              onChange={(e) => setActionTypeFilter(e.target.value)}
            >
              <option value="">All Actions</option>
              {actionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Admin Filter */}
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={adminFilter}
            onChange={(e) => setAdminFilter(e.target.value)}
          >
            <option value="">All Admins</option>
            {admins.map(admin => (
              <option key={admin} value={admin}>{admin}</option>
            ))}
          </select>

          {/* Date From */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          {/* Date To */}
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto px-4  lg:px-0">
             <div className=" min-w-[600px] lg:min-w-0 max-w-[calc(100vw-240px)] lg:max-w-[calc(100vw-18rem)]">
                <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performed By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Summary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getActionTypeStyle(log.actionType)}`}>
                        {log.actionType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.performedBy}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">
                      {log.summary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Log Details</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timestamp</label>
                  <p className="text-sm text-gray-900">{formatTimestamp(selectedLog.timestamp)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getActionTypeStyle(selectedLog.actionType)}`}>
                    {selectedLog.actionType}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Performed By</label>
                  <p className="text-sm text-gray-900">{selectedLog.performedBy}</p>
                </div>
                
                {selectedLog.userEmail && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
                    <p className="text-sm text-gray-900">{selectedLog.userEmail}</p>
                  </div>
                )}
                
                {selectedLog.propertyId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property ID</label>
                    <p className="text-sm text-gray-900">{selectedLog.propertyId}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                <p className="text-sm text-gray-900">{selectedLog.summary}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Details</label>
                <p className="text-sm text-gray-900">{selectedLog.fullDetails}</p>
              </div>
              
              {selectedLog.statusChange && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status Change</label>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">{selectedLog.statusChange.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">{selectedLog.statusChange.to}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedLog(null)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ComplianceLogs;