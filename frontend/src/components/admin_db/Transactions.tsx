import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, FileText, Eye, X, ExternalLink } from 'lucide-react';

// Mock data for demonstration
const mockTransactions = [
  {
    id: 'TXN-001',
    userId: 'USR-001',
    userEmail: 'john.doe@example.com',
    userName: 'John Doe',
    type: 'Investment',
    amount: 150000,
    currency: 'AED',
    propertyName: 'Dubai Marina Tower A',
    propertyId: 'PROP-001',
    date: '2024-06-05T10:30:00Z',
    status: 'Completed',
    paymentReference: 'RZP_001234567890',
    kycStatus: 'Verified',
    damlReference: 'DAML_TXN_001',
    triggeredBy: 'system',
    auditMetadata: {
      triggeredBy: 'Auto Investment Processing',
      timestamp: '2024-06-05T10:30:00Z',
      ipAddress: '192.168.1.100'
    }
  },
  {
    id: 'TXN-002',
    userId: 'USR-002',
    userEmail: 'sarah.wilson@example.com',
    userName: 'Sarah Wilson',
    type: 'Dividend Payout',
    amount: 5000,
    currency: 'AED',
    propertyName: 'Business Bay Complex',
    propertyId: 'PROP-002',
    date: '2024-06-04T14:15:00Z',
    status: 'Completed',
    paymentReference: 'RZP_001234567891',
    kycStatus: 'Verified',
    damlReference: 'DAML_TXN_002',
    triggeredBy: 'admin',
    auditMetadata: {
      triggeredBy: 'Admin: admin@company.com',
      timestamp: '2024-06-04T14:15:00Z',
      ipAddress: '192.168.1.101'
    }
  },
  {
    id: 'TXN-003',
    userId: 'USR-003',
    userEmail: 'mike.chen@example.com',
    userName: 'Mike Chen',
    type: 'Token Transfer',
    amount: 1000,
    currency: 'Tokens',
    propertyName: 'JLT Office Tower',
    propertyId: 'PROP-003',
    date: '2024-06-03T09:45:00Z',
    status: 'Pending',
    paymentReference: 'RZP_001234567892',
    kycStatus: 'Pending',
    damlReference: 'DAML_TXN_003',
    triggeredBy: 'user',
    auditMetadata: {
      triggeredBy: 'User Transfer Request',
      timestamp: '2024-06-03T09:45:00Z',
      ipAddress: '192.168.1.102'
    }
  },
  {
    id: 'TXN-004',
    userId: 'USR-004',
    userEmail: 'lisa.ahmed@example.com',
    userName: 'Lisa Ahmed',
    type: 'Exit',
    amount: 200000,
    currency: 'AED',
    propertyName: 'Downtown Residences',
    propertyId: 'PROP-004',
    date: '2024-06-02T16:20:00Z',
    status: 'Failed',
    paymentReference: 'RZP_001234567893',
    kycStatus: 'Verified',
    damlReference: 'DAML_TXN_004',
    triggeredBy: 'user',
    auditMetadata: {
      triggeredBy: 'User Exit Request',
      timestamp: '2024-06-02T16:20:00Z',
      ipAddress: '192.168.1.103'
    }
  },
  {
    id: 'TXN-005',
    userId: 'USR-005',
    userEmail: 'ahmed.hassan@example.com',
    userName: 'Ahmed Hassan',
    type: 'Investment',
    amount: 1200000,
    currency: 'AED',
    propertyName: 'Palm Jumeirah Villa',
    propertyId: 'PROP-005',
    date: '2024-06-01T11:00:00Z',
    status: 'Completed',
    paymentReference: 'RZP_001234567894',
    kycStatus: 'Verified',
    damlReference: 'DAML_TXN_005',
    triggeredBy: 'system',
    auditMetadata: {
      triggeredBy: 'Auto Investment Processing',
      timestamp: '2024-06-01T11:00:00Z',
      ipAddress: '192.168.1.104'
    }
  }
];

// PageLayout component (since it's provided)
const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">Manage and monitor your admin operations</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {children}
      </div>
    </div>
  );
};

// Transaction Detail Modal Component
interface TransactionDetailModalProps {
  transaction: any;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transaction Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                  <p className="text-sm text-gray-900 font-mono">{transaction.id}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="text-sm text-gray-900">{transaction.type}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Amount</label>
                  <p className="text-sm text-gray-900 font-semibold">
                    {transaction.amount.toLocaleString()} {transaction.currency}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                  <p className="text-sm text-gray-900">{formatDate(transaction.date)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Reference</label>
                  <p className="text-sm text-gray-900 font-mono">{transaction.paymentReference}</p>
                </div>
              </div>
            </div>
            
            {/* User Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">User ID</label>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-900 font-mono">{transaction.userId}</p>
                    <button className="text-blue-600 hover:text-blue-800">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-sm text-gray-900">{transaction.userName}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm text-gray-900">{transaction.userEmail}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">KYC Status</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.kycStatus}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Property Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Property Name</label>
                  <p className="text-sm text-gray-900">{transaction.propertyName}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Property ID</label>
                  <p className="text-sm text-gray-900 font-mono">{transaction.propertyId}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">DAML Reference</label>
                  <p className="text-sm text-gray-900 font-mono">{transaction.damlReference}</p>
                </div>
              </div>
            </div>
            
            {/* Audit Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Audit Information</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Triggered By</label>
                  <p className="text-sm text-gray-900">{transaction.auditMetadata.triggeredBy}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Timestamp</label>
                  <p className="text-sm text-gray-900">{formatDate(transaction.auditMetadata.timestamp)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">IP Address</label>
                  <p className="text-sm text-gray-900 font-mono">{transaction.auditMetadata.ipAddress}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Transactions Component
const Transactions: React.FC = () => {
  const [transactions] = useState(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter and search logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const matchesSearch = 
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.propertyName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filters.type || transaction.type === filters.type;
      const matchesStatus = !filters.status || transaction.status === filters.status;
      
      const transactionDate = new Date(transaction.date);
      const matchesDateFrom = !filters.dateFrom || transactionDate >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || transactionDate <= new Date(filters.dateTo);
      
      const matchesMinAmount = !filters.minAmount || transaction.amount >= parseFloat(filters.minAmount);
      const matchesMaxAmount = !filters.maxAmount || transaction.amount <= parseFloat(filters.maxAmount);

      return matchesSearch && matchesType && matchesStatus && matchesDateFrom && matchesDateTo && matchesMinAmount && matchesMaxAmount;
    });
  }, [transactions, searchTerm, filters]);

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleExportCSV = () => {
    const csvData = filteredTransactions.map(t => ({
      'Transaction ID': t.id,
      'User Email': t.userEmail,
      'User Name': t.userName,
      'Type': t.type,
      'Amount': t.amount,
      'Currency': t.currency,
      'Property Name': t.propertyName,
      'Date': new Date(t.date).toLocaleDateString(),
      'Status': t.status,
      'Payment Reference': t.paymentReference
    }));
    
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'investment': return 'bg-blue-100 text-blue-800';
      case 'dividend payout': return 'bg-green-100 text-green-800';
      case 'token transfer': return 'bg-purple-100 text-purple-800';
      case 'exit': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuspiciousFlag = (transaction: any) => {
    return transaction.amount > 1000000 || transaction.type === 'Exit';
  };

  return (
    <PageLayout title="Transactions Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">All Transactions</h2>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
              {filteredTransactions.length} records
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions, users, or properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="Investment">Investment</option>
                    <option value="Dividend Payout">Dividend Payout</option>
                    <option value="Token Transfer">Token Transfer</option>
                    <option value="Exit">Exit</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minAmount}
                    onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                  <input
                    type="number"
                    placeholder="No limit"
                    value={filters.maxAmount}
                    onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setFilters({
                    type: '', status: '', dateFrom: '', dateTo: '', minAmount: '', maxAmount: ''
                  })}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredTransactions.map((transaction, index) => (
                <tr key={transaction.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-200 px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-900">{transaction.id}</span>
                      {getSuspiciousFlag(transaction) && (
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full" title="Flagged for review"></span>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{transaction.userName}</div>
                      <div className="text-gray-500">{transaction.userEmail}</div>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm">
                    <div className="font-semibold text-gray-900">
                      {transaction.amount.toLocaleString()} {transaction.currency}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm">
                    <div>
                      <div className="text-gray-900">{transaction.propertyName}</div>
                      <div className="text-gray-500 font-mono text-xs">{transaction.propertyId}</div>
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-sm">
                    <button
                      onClick={() => handleViewDetails(transaction)}
                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
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

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageLayout>
  );
};

export default Transactions;