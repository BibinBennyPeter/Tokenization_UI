import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, AlertTriangle, Shield, UserCheck, DollarSign, Flag, Snowflake, Eye, MoreVertical } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  riskScore: number;
  kycStatus: 'Verified' | 'Pending' | 'Rejected' | 'Expired';
  investmentVolume: number;
  suspiciousActivities: number;
  lastActivity: string;
  accountStatus: 'Active' | 'Frozen' | 'Flagged';
  riskFactors: {
    highVolumeTransactions: boolean;
    unusualPatterns: boolean;
    incompleteKyc: boolean;
    multipleDevices: boolean;
  };
}

const RiskProfiles: React.FC = () => {
  // Sample user data with expanded risk information
  const [users] = useState<User[]>([
  {
    id: '#12345',
    name: 'Ethan Carter',
      email: 'ethan.carter@example.com',
    riskScore: 92,
    kycStatus: 'Verified',
      investmentVolume: 250000,
      suspiciousActivities: 3,
      lastActivity: '2024-03-15T14:30:00Z',
      accountStatus: 'Active',
      riskFactors: {
        highVolumeTransactions: true,
        unusualPatterns: true,
        incompleteKyc: false,
        multipleDevices: true
      }
  },
  {
    id: '#67890',
    name: 'Olivia Bennett',
      email: 'olivia.bennett@example.com',
    riskScore: 45,
    kycStatus: 'Pending',
      investmentVolume: 50000,
      suspiciousActivities: 1,
      lastActivity: '2024-03-14T09:15:00Z',
      accountStatus: 'Active',
      riskFactors: {
        highVolumeTransactions: false,
        unusualPatterns: false,
        incompleteKyc: true,
        multipleDevices: false
      }
  },
  {
    id: '#11223',
    name: 'Noah Thompson',
      email: 'noah.thompson@example.com',
    riskScore: 78,
    kycStatus: 'Verified',
      investmentVolume: 150000,
      suspiciousActivities: 2,
      lastActivity: '2024-03-15T11:45:00Z',
      accountStatus: 'Flagged',
      riskFactors: {
        highVolumeTransactions: true,
        unusualPatterns: true,
        incompleteKyc: false,
        multipleDevices: false
      }
  },
  {
    id: '#44556',
    name: 'Ava Martinez',
      email: 'ava.martinez@example.com',
    riskScore: 30,
    kycStatus: 'Rejected',
      investmentVolume: 25000,
      suspiciousActivities: 0,
      lastActivity: '2024-03-13T16:20:00Z',
      accountStatus: 'Frozen',
      riskFactors: {
        highVolumeTransactions: false,
        unusualPatterns: false,
        incompleteKyc: true,
        multipleDevices: false
      }
  },
  {
    id: '#77889',
    name: 'Liam Harris',
      email: 'liam.harris@example.com',
    riskScore: 85,
    kycStatus: 'Verified',
      investmentVolume: 200000,
      suspiciousActivities: 4,
      lastActivity: '2024-03-15T13:10:00Z',
      accountStatus: 'Active',
      riskFactors: {
        highVolumeTransactions: true,
        unusualPatterns: true,
        incompleteKyc: false,
        multipleDevices: true
      }
    }
  ]);

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskScoreFilter, setRiskScoreFilter] = useState('');
  const [kycStatusFilter, setKycStatusFilter] = useState('');
  const [accountStatusFilter, setAccountStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('riskHigh');

  // Filter users based on current filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesRiskScore = !riskScoreFilter || 
        (riskScoreFilter === 'high' && user.riskScore >= 70) ||
        (riskScoreFilter === 'medium' && user.riskScore >= 40 && user.riskScore < 70) ||
        (riskScoreFilter === 'low' && user.riskScore < 40);
      
      const matchesKycStatus = !kycStatusFilter || user.kycStatus === kycStatusFilter;
      const matchesAccountStatus = !accountStatusFilter || user.accountStatus === accountStatusFilter;
      const matchesSearch = !searchTerm || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesRiskScore && matchesKycStatus && matchesAccountStatus && matchesSearch;
    });
  }, [users, riskScoreFilter, kycStatusFilter, accountStatusFilter, searchTerm]);

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'riskScore') {
      setRiskScoreFilter(value);
    } else if (key === 'kycStatus') {
      setKycStatusFilter(value);
    } else if (key === 'accountStatus') {
      setAccountStatusFilter(value);
    } else if (key === 'searchTerm') {
      setSearchTerm(value);
    }
  };

  const clearFilters = () => {
    setRiskScoreFilter('');
    setKycStatusFilter('');
    setAccountStatusFilter('');
    setSearchTerm('');
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getKycStatusBadge = (status: User['kycStatus']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Verified':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Expired':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getAccountStatusBadge = (status: User['accountStatus']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Frozen':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Flagged':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Profiles</h1>
              <p className="text-gray-600">Monitor and manage user risk profiles and compliance status</p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Download className="w-4 h-4" />
                Export Profiles
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
              placeholder="Search users by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                <select
                  value={riskScoreFilter}
                  onChange={(e) => handleFilterChange('riskScore', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Risk Levels</option>
                  <option value="high">High Risk (70+)</option>
                  <option value="medium">Medium Risk (40-69)</option>
                  <option value="low">Low Risk (0-39)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">KYC Status</label>
                <select
                  value={kycStatusFilter}
                  onChange={(e) => handleFilterChange('kycStatus', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All KYC Statuses</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                <select
                  value={accountStatusFilter}
                  onChange={(e) => handleFilterChange('accountStatus', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Account Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Frozen">Frozen</option>
                  <option value="Flagged">Flagged</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              Showing <span className="font-medium text-gray-900">{filteredUsers.length}</span> of{' '}
              <span className="font-medium text-gray-900">{users.length}</span> users
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-900 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="riskHigh">Highest Risk First</option>
                <option value="riskLow">Lowest Risk First</option>
                <option value="nameAsc">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Risk Score</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Investment Volume</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">KYC Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Account Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-500">ID: {user.id}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Last activity: {new Date(user.lastActivity).toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`text-lg font-bold ${getRiskScoreColor(user.riskScore)}`}>
                          {user.riskScore}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.suspiciousActivities} suspicious activities
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(user.investmentVolume)}</div>
                      <div className="text-xs text-gray-500">
                        {user.riskFactors.highVolumeTransactions ? 'High volume detected' : 'Normal volume'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getKycStatusBadge(user.kycStatus)}>
                        {user.kycStatus}
                      </span>
                      {user.riskFactors.incompleteKyc && (
                        <div className="text-xs text-red-600 mt-1">KYC incomplete</div>
                      )}
                    </td>
                <td className="px-6 py-4">
                      <span className={getAccountStatusBadge(user.accountStatus)}>
                        {user.accountStatus}
                      </span>
                      {user.riskFactors.multipleDevices && (
                        <div className="text-xs text-yellow-600 mt-1">Multiple devices</div>
                  )}
                </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          title="View Details"
                        >
                          View
                        </button>
                        <button
                          className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                          title="Flag User"
                        >
                    Flag
                  </button>
                        <button
                          className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          title="Freeze Account"
                        >
                    Freeze
                  </button>
                        <button
                          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          title="More Actions"
                        >
                          More
                        </button>
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
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Risk Assessment Guidelines</h3>
              <p className="text-xs text-gray-600">
                Risk scores are calculated based on multiple factors including transaction volume, KYC status, and suspicious activity patterns.
                Regular reviews of risk profiles are required to ensure compliance with regulatory requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskProfiles;
