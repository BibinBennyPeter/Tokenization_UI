import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Calendar, User, CreditCard, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const TransactionSurveillance = () => {
  // Sample transaction data
  const [transactions] = useState([
    {
      id: 'TXN-001',
      userId: 'USER-12345',
      date: '2025-06-09T10:30:00Z',
      type: 'Purchase',
      propertyId: 'PROP-001',
      tokenId: 'TKN-001',
      amount: 25000,
      status: 'Success',
      sourceOfFunds: 'Bank Transfer - Wells Fargo ***1234',
      hash: '0x1a2b3c4d5e6f...',
      gasUsed: '21,000',
      gasFee: '0.0015 ETH'
    },
    {
      id: 'TXN-002',
      userId: 'USER-67890',
      date: '2025-06-09T09:15:00Z',
      type: 'Transfer',
      propertyId: 'PROP-002',
      tokenId: 'TKN-002',
      amount: 15000,
      status: 'Failed',
      sourceOfFunds: 'Crypto Wallet - MetaMask',
      hash: '0x2b3c4d5e6f7a...',
      gasUsed: '0',
      gasFee: '0 ETH',
      failureReason: 'Insufficient gas'
    },
    {
      id: 'TXN-003',
      userId: 'USER-11111',
      date: '2025-06-09T08:45:00Z',
      type: 'Sale',
      propertyId: 'PROP-003',
      tokenId: 'TKN-003',
      amount: 45000,
      status: 'Pending',
      sourceOfFunds: 'Wire Transfer - Chase Bank',
      hash: '0x3c4d5e6f7a8b...',
      gasUsed: 'Pending',
      gasFee: 'Pending'
    },
    {
      id: 'TXN-004',
      userId: 'USER-22222',
      date: '2025-06-08T16:20:00Z',
      type: 'Mint',
      propertyId: 'PROP-004',
      tokenId: 'TKN-004',
      amount: 35000,
      status: 'Success',
      sourceOfFunds: 'Credit Card - Visa ***9876',
      hash: '0x4d5e6f7a8b9c...',
      gasUsed: '75,000',
      gasFee: '0.0032 ETH'
    },
    {
      id: 'TXN-005',
      userId: 'USER-33333',
      date: '2025-06-08T14:10:00Z',
      type: 'Purchase',
      propertyId: 'PROP-005',
      tokenId: 'TKN-005',
      amount: 12500,
      status: 'Success',
      sourceOfFunds: 'PayPal - ***@gmail.com',
      hash: '0x5e6f7a8b9c0d...',
      gasUsed: '42,000',
      gasFee: '0.0018 ETH'
    }
  ]);

  const [filters, setFilters] = useState({
    userId: '',
    dateFrom: '',
    dateTo: '',
    transactionType: '',
    propertyId: '',
    tokenId: '',
    status: '',
    searchTerm: ''
  });


  const [showFilters, setShowFilters] = useState(false);

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesUserId = !filters.userId || tx.userId.toLowerCase().includes(filters.userId.toLowerCase());
      const matchesType = !filters.transactionType || tx.type === filters.transactionType;
      const matchesPropertyId = !filters.propertyId || tx.propertyId.toLowerCase().includes(filters.propertyId.toLowerCase());
      const matchesTokenId = !filters.tokenId || tx.tokenId.toLowerCase().includes(filters.tokenId.toLowerCase());
      const matchesStatus = !filters.status || tx.status === filters.status;
      const matchesSearch = !filters.searchTerm || 
        tx.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        tx.userId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        tx.hash.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const txDate = new Date(tx.date);
      const matchesDateFrom = !filters.dateFrom || txDate >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || txDate <= new Date(filters.dateTo);

      return matchesUserId && matchesType && matchesPropertyId && matchesTokenId && 
             matchesStatus && matchesSearch && matchesDateFrom && matchesDateTo;
    });
  }, [transactions, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      userId: '',
      dateFrom: '',
      dateTo: '',
      transactionType: '',
      propertyId: '',
      tokenId: '',
      status: '',
      searchTerm: ''
    });
  };

  const exportAuditTrail = () => {
    const csvContent = [
      ['Transaction ID', 'User ID', 'Date', 'Type', 'Property ID', 'Token ID', 'Amount', 'Status', 'Source of Funds', 'Hash', 'Gas Used', 'Gas Fee'],
      ...filteredTransactions.map(tx => [
        tx.id, tx.userId, tx.date, tx.type, tx.propertyId, tx.tokenId, 
        tx.amount, tx.status, tx.sourceOfFunds, tx.hash, tx.gasUsed, tx.gasFee
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transaction-audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transaction Surveillance</h1>
              <p className="text-gray-600 mt-1">Monitor and analyze all transaction activities</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button
                onClick={exportAuditTrail}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Audit Trail
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Transaction ID, User ID, or Hash..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                <input
                  type="text"
                  placeholder="Enter User ID"
                  value={filters.userId}
                  onChange={(e) => handleFilterChange('userId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                <select
                  value={filters.transactionType}
                  onChange={(e) => handleFilterChange('transactionType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Sale">Sale</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Mint">Mint</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property ID</label>
                <input
                  type="text"
                  placeholder="Enter Property ID"
                  value={filters.propertyId}
                  onChange={(e) => handleFilterChange('propertyId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token ID</label>
                <input
                  type="text"
                  placeholder="Enter Token ID"
                  value={filters.tokenId}
                  onChange={(e) => handleFilterChange('tokenId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredTransactions.length}</span> of <span className="font-semibold text-gray-900">{transactions.length}</span> transactions
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{tx.id}</div>
                        <div className="text-sm text-gray-500">
                          Property: {tx.propertyId} | Token: {tx.tokenId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{tx.userId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(tx.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(tx.status)}
                        <span className={`ml-2 ${getStatusBadge(tx.status)}`}>
                          {tx.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                      {tx.sourceOfFunds}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  );
};

export default TransactionSurveillance;