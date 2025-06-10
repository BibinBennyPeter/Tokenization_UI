import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Eye, 
  Check, 
  X, 
  Download, 
  Calendar,
  User,
  Mail,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

// Types
interface KYCEntry {
  id: string;
  name: string;
  email: string;
  userType: 'Investor' | 'Landowner';
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  documents: {
    idProof: string;
    addressProof: string;
  };
  signzyVerification?: {
    status: 'Verified' | 'Failed' | 'Pending';
    score: number;
  };
  rejectionReason?: string;
  auditTrail: AuditEntry[];
}

interface AuditEntry {
  action: 'Approved' | 'Rejected' | 'Submitted';
  adminName: string;
  timestamp: string;
  reason?: string;
}
interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}
const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => (
  <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
    <div className="w-full max-w-[95%] mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 text-sm md:text-base">Monitor platform performance, user activity, and system health metrics.</p>
      </div>
      {children}
    </div>
  </div>
)
// Mock data
const generateMockData = (): KYCEntry[] => [
    {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    userType: 'Investor',
    status: 'Pending',
    submittedAt: '2024-12-01T10:30:00Z',
    documents: {
      idProof: 'passport_john_smith.pdf',
      addressProof: 'utility_bill_john.pdf'
    },
    signzyVerification: {
      status: 'Verified',
      score: 85
    },
    auditTrail: [
      { action: 'Submitted', adminName: 'System', timestamp: '2024-12-01T10:30:00Z' }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    userType: 'Landowner',
    status: 'Approved',
    submittedAt: '2024-11-28T14:15:00Z',
    documents: {
      idProof: 'drivers_license_sarah.pdf',
      addressProof: 'bank_statement_sarah.pdf'
    },
    signzyVerification: {
      status: 'Verified',
      score: 92
    },
    auditTrail: [
      { action: 'Submitted', adminName: 'System', timestamp: '2024-11-28T14:15:00Z' },
      { action: 'Approved', adminName: 'Admin User', timestamp: '2024-11-29T09:20:00Z' }
    ]
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    userType: 'Investor',
    status: 'Rejected',
    submittedAt: '2024-11-25T16:45:00Z',
    documents: {
      idProof: 'id_card_michael.pdf',
      addressProof: 'lease_agreement_michael.pdf'
    },
    signzyVerification: {
      status: 'Failed',
      score: 45
    },
    rejectionReason: 'Document quality insufficient',
    auditTrail: [
      { action: 'Submitted', adminName: 'System', timestamp: '2024-11-25T16:45:00Z' },
      { action: 'Rejected', adminName: 'Admin User', timestamp: '2024-11-26T11:30:00Z', reason: 'Document quality insufficient' }
    ]
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    userType: 'Landowner',
    status: 'Pending',
    submittedAt: '2024-12-02T08:20:00Z',
    documents: {
      idProof: 'passport_emily.pdf',
      addressProof: 'property_deed_emily.pdf'
    },
    signzyVerification: {
      status: 'Pending',
      score: 0
    },
    auditTrail: [
      { action: 'Submitted', adminName: 'System', timestamp: '2024-12-02T08:20:00Z' }
    ]
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    userType: 'Investor',
    status: 'Pending',
    submittedAt: '2024-12-03T12:10:00Z',
    documents: {
      idProof: 'national_id_robert.pdf',
      addressProof: 'mortgage_statement_robert.pdf'
    },
    signzyVerification: {
      status: 'Verified',
      score: 78
    },
    auditTrail: [
      { action: 'Submitted', adminName: 'System', timestamp: '2024-12-03T12:10:00Z' }
    ]
  }
];

const KYCApproval: React.FC = () => {
  const [kycEntries, setKycEntries] = useState<KYCEntry[]>(generateMockData());
  const [selectedEntry, setSelectedEntry] = useState<KYCEntry | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [entryToReject, setEntryToReject] = useState<KYCEntry | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered data
  const filteredEntries = useMemo(() => {
    return kycEntries.filter(entry => {
      const matchesStatus = statusFilter === 'All' || entry.status === statusFilter;
      const matchesUserType = userTypeFilter === 'All' || entry.userType === userTypeFilter;
      const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesUserType && matchesSearch;
    });
  }, [kycEntries, statusFilter, userTypeFilter, searchTerm]);

  // ... (keep all your existing handler functions)
  const handleApprove = (entry: KYCEntry) => {
    const updatedEntry = {
      ...entry,
      status: 'Approved' as const,
      auditTrail: [
        ...entry.auditTrail,
        {
          action: 'Approved' as const,
          adminName: 'Admin User',
          timestamp: new Date().toISOString()
        }
      ]
    };

    setKycEntries(prev => prev.map(e => e.id === entry.id ? updatedEntry : e));
    console.log('KYC Approved:', { entryId: entry.id, adminName: 'Admin User', timestamp: new Date().toISOString() });
  };

  const handleReject = (entry: KYCEntry) => {
    setEntryToReject(entry);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (!entryToReject || !rejectionReason.trim()) return;

    const updatedEntry = {
      ...entryToReject,
      status: 'Rejected' as const,
      rejectionReason: rejectionReason.trim(),
      auditTrail: [
        ...entryToReject.auditTrail,
        {
          action: 'Rejected' as const,
          adminName: 'Admin User',
          timestamp: new Date().toISOString(),
          reason: rejectionReason.trim()
        }
      ]
    };

    setKycEntries(prev => prev.map(e => e.id === entryToReject.id ? updatedEntry : e));
    console.log('KYC Rejected:', { 
      entryId: entryToReject.id, 
      reason: rejectionReason.trim(), 
      adminName: 'Admin User', 
      timestamp: new Date().toISOString() 
    });

    setShowRejectModal(false);
    setRejectionReason('');
    setEntryToReject(null);
  };

  const handleBatchApprove = () => {
    const entriesToApprove = kycEntries.filter(entry => 
      selectedEntries.has(entry.id) && entry.status === 'Pending'
    );

    const updatedEntries = entriesToApprove.map(entry => ({
      ...entry,
      status: 'Approved' as const,
      auditTrail: [
        ...entry.auditTrail,
        {
          action: 'Approved' as const,
          adminName: 'Admin User',
          timestamp: new Date().toISOString()
        }
      ]
    }));

    setKycEntries(prev => prev.map(e => {
      const updated = updatedEntries.find(u => u.id === e.id);
      return updated || e;
    }));

    console.log('Batch Approval:', { 
      entryIds: entriesToApprove.map(e => e.id), 
      adminName: 'Admin User', 
      timestamp: new Date().toISOString() 
    });

    setSelectedEntries(new Set());
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'User Type', 'Status', 'Submission Date', 'Rejection Reason'];
    const csvData = [
      headers.join(','),
      ...filteredEntries.map(entry => [
        entry.name,
        entry.email,
        entry.userType,
        entry.status,
        new Date(entry.submittedAt).toLocaleDateString(),
        entry.rejectionReason || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kyc-submissions.csv';
    a.click();
    URL.revokeObjectURL(url);

    console.log('CSV Export:', { recordCount: filteredEntries.length, timestamp: new Date().toISOString() });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Approved: 'bg-green-100 text-green-800 border-green-200',
      Rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const icons = {
      Pending: <Clock className="w-3 h-3" />,
      Approved: <CheckCircle className="w-3 h-3" />,
      Rejected: <XCircle className="w-3 h-3" />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        {status}
      </span>
    );
  };

  const getVerificationBadge = (verification: any) => {
    if (!verification) return null;
    
    const styles = {
      Verified: 'bg-green-100 text-green-800',
      Failed: 'bg-red-100 text-red-800',
      Pending: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${styles[verification.status as keyof typeof styles]}`}>
        <Shield className="w-3 h-3" />
        {verification.status} ({verification.score}%)
      </span>
    );
  };

  return (
    <PageLayout title="KYC Approval Queue">
      <div className="relative z-0">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">KYC Approval Queue</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Manage and monitor KYC submissions</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            {/* Filters Section */}
            <div className="bg-gray-50 rounded-lg p-2 sm:p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="flex flex-col xl:flex-row gap-2 md:gap-4">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="All">All Types</option>
                    <option value="Investor">Investor</option>
                    <option value="Landowner">Landowner</option>
                  </select>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-end">
                {selectedEntries.size > 0 && (
                  <button
                    onClick={handleBatchApprove}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Check className="w-4 h-4" />
                    Approve Selected ({selectedEntries.size})
                  </button>
                )}
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
            {/* KYC Submissions Table */}
            <div className="overflow-x-auto w-full bg-white rounded-lg shadow-sm border border-gray-200">
              <table className="min-w-[400px] w-full text-xs md:text-sm">
                {/* Table Head */}
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-2 sm:px-3 md:px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEntries(new Set(filteredEntries.map(e => e.id)));
                          } else {
                            setSelectedEntries(new Set());
                          }
                        }}
                        checked={selectedEntries.size === filteredEntries.length && filteredEntries.length > 0}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Submitted</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Verification</th>
                    <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="divide-y divide-gray-200">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedEntries.has(entry.id)}
                          onChange={(e) => {
                            const newSelected = new Set(selectedEntries);
                            if (e.target.checked) {
                              newSelected.add(entry.id);
                            } else {
                              newSelected.delete(entry.id);
                            }
                            setSelectedEntries(newSelected);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 sm:px-4 py-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <div className="min-w-0">
                            <span className="text-sm font-medium text-gray-900 truncate block">{entry.name}</span>
                            <span className="text-xs text-gray-500 md:hidden truncate block">{entry.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500 truncate">{entry.email}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {entry.userType}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {new Date(entry.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap">
                        {getStatusBadge(entry.status)}
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap hidden xl:table-cell">
                        {getVerificationBadge(entry.signzyVerification)}
                      </td>
                      <td className="px-2 sm:px-4 py-4 whitespace-nowrap">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => {
                              setSelectedEntry(entry);
                              setShowModal(true);
                            }}
                            className="inline-flex items-center p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {entry.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(entry)}
                                className="inline-flex items-center p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleReject(entry)}
                                className="inline-flex items-center p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredEntries.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">KYC Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm text-gray-900">{selectedEntry.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm text-gray-900 break-all">{selectedEntry.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                    <p className="text-sm text-gray-900">{selectedEntry.userType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    {getStatusBadge(selectedEntry.status)}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center min-w-0">
                      <FileText className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium">ID Proof</span>
                    </div>
                    <span className="text-sm text-gray-600 truncate ml-2">{selectedEntry.documents.idProof}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center min-w-0">
                      <FileText className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium">Address Proof</span>
                    </div>
                    <span className="text-sm text-gray-600 truncate ml-2">{selectedEntry.documents.addressProof}</span>
                  </div>
                </div>
              </div>

              {/* Signzy Verification */}
              {selectedEntry.signzyVerification && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Signzy Verification</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Verification Result</span>
                      {getVerificationBadge(selectedEntry.signzyVerification)}
                    </div>
                  </div>
                </div>
              )}

              {/* Rejection Reason */}
              {selectedEntry.rejectionReason && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rejection Reason</h3>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">{selectedEntry.rejectionReason}</p>
                  </div>
                </div>
              )}

              {/* Audit Trail */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Audit Trail</h3>
                <div className="space-y-3">
                  {selectedEntry.auditTrail.map((audit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{audit.action}</span>
                          <span className="text-xs text-gray-500">by {audit.adminName}</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {new Date(audit.timestamp).toLocaleString()}
                        </p>
                        {audit.reason && (
                          <p className="text-xs text-red-600 mt-1">Reason: {audit.reason}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Reject KYC Submission</h2>
            </div>
            
            <div className="p-4 sm:p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div className="p-4 sm:p-6 border-t flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setEntryToReject(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default KYCApproval; 