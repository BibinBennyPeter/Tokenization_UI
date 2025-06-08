import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  UserX, 
  Trash2, 
  UserCheck, 
  X,
  Calendar,
  DollarSign,
  Shield,
  Building,
  TrendingUp
} from 'lucide-react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  userType: 'Investor' | 'Landowner' | 'Compliance Officer';
  kycStatus: 'Verified' | 'Pending' | 'Rejected' | 'Not Started';
  role: 'Admin' | 'User' | 'Manager' | 'Viewer';
  lastLogin: string;
  registrationDate: string;
  totalInvestmentEarnings: number;
  isActive: boolean;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    userType: 'Investor',
    kycStatus: 'Verified',
    role: 'User',
    lastLogin: '2024-06-07T10:30:00Z',
    registrationDate: '2024-01-15T09:00:00Z',
    totalInvestmentEarnings: 125000,
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    userType: 'Landowner',
    kycStatus: 'Verified',
    role: 'Manager',
    lastLogin: '2024-06-06T15:45:00Z',
    registrationDate: '2024-02-20T14:30:00Z',
    totalInvestmentEarnings: 89500,
    isActive: true
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    userType: 'Compliance Officer',
    kycStatus: 'Verified',
    role: 'Admin',
    lastLogin: '2024-06-07T08:15:00Z',
    registrationDate: '2024-01-10T11:20:00Z',
    totalInvestmentEarnings: 0,
    isActive: true
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    userType: 'Investor',
    kycStatus: 'Pending',
    role: 'User',
    lastLogin: '2024-06-05T12:20:00Z',
    registrationDate: '2024-03-01T16:45:00Z',
    totalInvestmentEarnings: 45000,
    isActive: true
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    userType: 'Landowner',
    kycStatus: 'Rejected',
    role: 'User',
    lastLogin: '2024-05-30T09:30:00Z',
    registrationDate: '2024-02-14T10:15:00Z',
    totalInvestmentEarnings: 67800,
    isActive: false
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    userType: 'Investor',
    kycStatus: 'Not Started',
    role: 'User',
    lastLogin: '2024-06-04T18:00:00Z',
    registrationDate: '2024-04-10T13:25:00Z',
    totalInvestmentEarnings: 23000,
    isActive: true
  }
];

// Utility functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const getRelativeTime = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
};

// KYC Modal Component
const KYCModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">KYC Information </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">User Type</label>
                  <p className="text-gray-900">{user.userType}</p>
                </div>
              </div>
            </div>
            
            {/* KYC Status */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">KYC Status</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Status</label>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' :
                      user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      user.kycStatus === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.kycStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Submitted Documents</label>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-gray-600">• Government ID</div>
                    <div className="text-sm text-gray-600">• Proof of Address</div>
                    <div className="text-sm text-gray-600">• Bank Statement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Registered</p>
                <p className="text-xs text-gray-600">{formatDate(user.registrationDate)}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Total Value</p>
                <p className="text-xs text-gray-600">{formatCurrency(user.totalInvestmentEarnings)}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Risk Level</p>
                <p className="text-xs text-gray-600">Low</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          {user.kycStatus === 'Pending' && (
            <>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Reject
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// PageLayout component
const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">Manage user accounts, permissions, and access controls</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {children}
      </div>
    </div>
  );
};

// Main UserManagement Component
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Investor' | 'Landowner' | 'Compliance Officer'>('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showKYCModal, setShowKYCModal] = useState(false);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'All' || user.userType === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [users, searchTerm, filterType]);

  // Handle role change
  const handleRoleChange = (userId: string, newRole: User['role']) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    console.log(`Role updated for user ${userId}: ${newRole}`);
  };

  // Handle deactivate user
  const handleDeactivateUser = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  // Handle delete user
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }
  };

  // Handle impersonate user
  const handleImpersonateUser = (email: string) => {
    console.log(`Impersonating user: ${email}`);
    alert(`Impersonating user: ${email}`);
  };

  // Handle view KYC
  const handleViewKYC = (user: User) => {
    setSelectedUser(user);
    setShowKYCModal(true);
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'Investor':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'Landowner':
        return <Building className="w-4 h-4 text-green-500" />;
      case 'Compliance Officer':
        return <Shield className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <PageLayout title="User Management">
      <div className="p-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="Investor">Investor</option>
              <option value="Landowner">Landowner</option>
              <option value="Compliance Officer">Compliance Officer</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">KYC Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Registration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total Value</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !user.isActive ? 'opacity-50 bg-gray-100' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getUserTypeIcon(user.userType)}
                      <span className="text-sm text-gray-700">{user.userType}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' :
                      user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      user.kycStatus === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.kycStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as User['role'])}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      disabled={!user.isActive}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {getRelativeTime(user.lastLogin)}
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {formatDate(user.registrationDate)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 font-medium">
                    {formatCurrency(user.totalInvestmentEarnings)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleViewKYC(user)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="View KYC"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeactivateUser(user.id)}
                        className={`p-1 rounded transition-colors ${
                          user.isActive 
                            ? 'text-orange-600 hover:bg-orange-100' 
                            : 'text-green-600 hover:bg-green-100'
                        }`}
                        title={user.isActive ? 'Deactivate' : 'Activate'}
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleImpersonateUser(user.email)}
                        className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                        title="Impersonate"
                        disabled={!user.isActive}
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No results message */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found matching your criteria.</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Users</p>
            <p className="text-2xl font-bold text-blue-900">{users.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Active Users</p>
            <p className="text-2xl font-bold text-green-900">{users.filter(u => u.isActive).length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">Pending KYC</p>
            <p className="text-2xl font-bold text-yellow-900">{users.filter(u => u.kycStatus === 'Pending').length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Total Value</p>
            <p className="text-2xl font-bold text-purple-900">
              {formatCurrency(users.reduce((sum, user) => sum + user.totalInvestmentEarnings, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* KYC Modal */}
      {showKYCModal && selectedUser && (
        <KYCModal
          user={selectedUser}
          onClose={() => {
            setShowKYCModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </PageLayout>
  );
};

export default UserManagement;