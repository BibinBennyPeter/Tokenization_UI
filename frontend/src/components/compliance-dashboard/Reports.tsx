import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Calendar, FileText, AlertTriangle, Shield, Coins, UserCheck, BarChart2, ChevronDown } from 'lucide-react';

interface Report {
  id: string;
  period: string;
  type: 'Monthly' | 'Quarterly';
  generatedAt: string;
  status: 'Generated' | 'Pending' | 'Failed';
  stats: {
    kycReviews: number;
    suspiciousActivities: number;
    flaggedTransfers: number;
    amlIncidents: number;
    actionsTaken: number;
  };
  details: {
    kycApproved: number;
    kycRejected: number;
    kycPending: number;
    highRiskActivities: number;
    mediumRiskActivities: number;
    lowRiskActivities: number;
    largeTransfers: number;
    unusualPatterns: number;
    amlAlerts: number;
    frozenAccounts: number;
    flaggedAccounts: number;
  };
}

const Reports: React.FC = () => {
  // Sample report data
  const [reports] = useState<Report[]>([
    {
      id: 'REP-2024-Q1',
      period: 'Q1 2024',
      type: 'Quarterly',
      generatedAt: '2024-03-31T23:59:59Z',
      status: 'Generated',
      stats: {
        kycReviews: 1250,
        suspiciousActivities: 87,
        flaggedTransfers: 45,
        amlIncidents: 23,
        actionsTaken: 67
      },
      details: {
        kycApproved: 980,
        kycRejected: 150,
        kycPending: 120,
        highRiskActivities: 35,
        mediumRiskActivities: 42,
        lowRiskActivities: 10,
        largeTransfers: 28,
        unusualPatterns: 17,
        amlAlerts: 23,
        frozenAccounts: 15,
        flaggedAccounts: 52
      }
    },
    {
      id: 'REP-2024-02',
      period: 'February 2024',
      type: 'Monthly',
      generatedAt: '2024-02-29T23:59:59Z',
      status: 'Generated',
      stats: {
        kycReviews: 450,
        suspiciousActivities: 32,
        flaggedTransfers: 18,
        amlIncidents: 9,
        actionsTaken: 25
      },
      details: {
        kycApproved: 350,
        kycRejected: 45,
        kycPending: 55,
        highRiskActivities: 12,
        mediumRiskActivities: 15,
        lowRiskActivities: 5,
        largeTransfers: 10,
        unusualPatterns: 8,
        amlAlerts: 9,
        frozenAccounts: 6,
        flaggedAccounts: 19
      }
    },
    {
      id: 'REP-2024-01',
      period: 'January 2024',
      type: 'Monthly',
      generatedAt: '2024-01-31T23:59:59Z',
      status: 'Generated',
      stats: {
        kycReviews: 380,
        suspiciousActivities: 28,
        flaggedTransfers: 15,
        amlIncidents: 7,
        actionsTaken: 22
      },
      details: {
        kycApproved: 290,
        kycRejected: 40,
        kycPending: 50,
        highRiskActivities: 10,
        mediumRiskActivities: 13,
        lowRiskActivities: 5,
        largeTransfers: 8,
        unusualPatterns: 7,
        amlAlerts: 7,
        frozenAccounts: 5,
        flaggedAccounts: 17
      }
    }
  ]);

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter reports based on current filters
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesType = !reportTypeFilter || report.type === reportTypeFilter;
      const matchesPeriod = !periodFilter || report.period.includes(periodFilter);
      const matchesStatus = !statusFilter || report.status === statusFilter;
      const matchesSearch = !searchTerm || 
        report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.period.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesPeriod && matchesStatus && matchesSearch;
    });
  }, [reports, reportTypeFilter, periodFilter, statusFilter, searchTerm]);

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'searchTerm') {
      setSearchTerm(value);
    } else if (key === 'type') {
      setReportTypeFilter(value);
    } else if (key === 'period') {
      setPeriodFilter(value);
    } else if (key === 'status') {
      setStatusFilter(value);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setReportTypeFilter('');
    setPeriodFilter('');
    setStatusFilter('');
  };

  const getStatusBadge = (status: Report['status']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Generated':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Reports</h1>
              <p className="text-gray-600">Generate and manage compliance reports and statistics</p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Download className="w-4 h-4" />
                Export Reports
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
              placeholder="Search reports by ID or period..."
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select
                  value={reportTypeFilter}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Types</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <select
                  value={periodFilter}
                  onChange={(e) => handleFilterChange('period', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Periods</option>
                  <option value="2024">2024</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">All Statuses</option>
                  <option value="Generated">Generated</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              Showing <span className="font-medium text-gray-900">{filteredReports.length}</span> of{' '}
              <span className="font-medium text-gray-900">{reports.length}</span> reports
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

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Report Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">KYC Reviews</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Suspicious Activities</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Flagged Transfers</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">AML Incidents</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.period}</div>
                        <div className="text-xs text-gray-500">ID: {report.id}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Generated: {new Date(report.generatedAt).toLocaleString()}
                        </div>
                        <div className="mt-2">
                          <span className={getStatusBadge(report.status)}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{formatNumber(report.stats.kycReviews)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <div>Approved: {formatNumber(report.details.kycApproved)}</div>
                        <div>Rejected: {formatNumber(report.details.kycRejected)}</div>
                        <div>Pending: {formatNumber(report.details.kycPending)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{formatNumber(report.stats.suspiciousActivities)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <div>High Risk: {formatNumber(report.details.highRiskActivities)}</div>
                        <div>Medium Risk: {formatNumber(report.details.mediumRiskActivities)}</div>
                        <div>Low Risk: {formatNumber(report.details.lowRiskActivities)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{formatNumber(report.stats.flaggedTransfers)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <div>Large Transfers: {formatNumber(report.details.largeTransfers)}</div>
                        <div>Unusual Patterns: {formatNumber(report.details.unusualPatterns)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{formatNumber(report.stats.amlIncidents)}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <div>Alerts: {formatNumber(report.details.amlAlerts)}</div>
                        <div>Frozen: {formatNumber(report.details.frozenAccounts)}</div>
                        <div>Flagged: {formatNumber(report.details.flaggedAccounts)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          title="View Report"
                        >
                          View
                        </button>
                        <button
                          className="px-3 py-1.5 text-sm bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                          title="Download Report"
                        >
                          Download
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
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Reporting Guidelines</h3>
              <p className="text-xs text-gray-600">
                Monthly reports are due by the 5th of each month. Quarterly reports must be submitted within 15 days of quarter end.
                All reports are retained for 7 years as per financial regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
);
};

export default Reports;