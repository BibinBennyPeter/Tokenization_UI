import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Building, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  RefreshCw,
  Activity,
  Shield,
  Server
} from 'lucide-react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: string;
}

interface ErrorLog {
  id: string;
  timestamp: string;
  integration: string;
  errorType: string;
  summary: string;
  severity: 'high' | 'medium' | 'low';
}

type TimeFilter = 'daily' | 'weekly' | 'monthly';

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">Monitor platform performance, user activity, and system health metrics.</p>
      </div>
      {children}
    </div>
  </div>
);

const SystemMetrics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('weekly');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mock data
  const keyMetrics: MetricCard[] = [
    {
      title: 'Total Users',
      value: '12,847',
      change: 8.2,
      changeType: 'increase',
      icon: <Users className="w-6 h-6" />,
      color: 'blue'
    },
    {
      title: 'KYC Approved',
      value: '9,234',
      change: 5.7,
      changeType: 'increase',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'green'
    },
    {
      title: 'KYC Pending',
      value: '287',
      change: -12.3,
      changeType: 'decrease',
      icon: <Clock className="w-6 h-6" />,
      color: 'yellow'
    },
    {
      title: 'Total Invested',
      value: '₹47.2M AED',
      change: 15.8,
      changeType: 'increase',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'purple'
    },
    {
      title: 'Properties Listed',
      value: '156',
      change: 3.4,
      changeType: 'increase',
      icon: <Building className="w-6 h-6" />,
      color: 'indigo'
    },
    {
      title: 'Properties Tokenized',
      value: '89',
      change: 7.1,
      changeType: 'increase',
      icon: <Coins className="w-6 h-6" />,
      color: 'teal'
    },
    {
      title: 'Dividends Distributed',
      value: '₹8.9M AED',
      change: 22.5,
      changeType: 'increase',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'emerald'
    },
    {
      title: 'System Uptime',
      value: '99.97%',
      change: 0.1,
      changeType: 'increase',
      icon: <Server className="w-6 h-6" />,
      color: 'cyan'
    }
  ];

  const userRegistrationData = [
    { name: 'Mon', users: 45 },
    { name: 'Tue', users: 52 },
    { name: 'Wed', users: 38 },
    { name: 'Thu', users: 67 },
    { name: 'Fri', users: 89 },
    { name: 'Sat', users: 76 },
    { name: 'Sun', users: 43 }
  ];

  const investmentVolumeData = [
    { name: 'Week 1', volume: 850000 },
    { name: 'Week 2', volume: 920000 },
    { name: 'Week 3', volume: 1100000 },
    { name: 'Week 4', volume: 1350000 },
    { name: 'Week 5', volume: 1200000 },
    { name: 'Week 6', volume: 1450000 }
  ];

  const kycTrendData = [
    { name: 'Jan', approved: 450, rejected: 23 },
    { name: 'Feb', approved: 523, rejected: 31 },
    { name: 'Mar', approved: 678, rejected: 28 },
    { name: 'Apr', approved: 789, rejected: 19 },
    { name: 'May', approved: 834, rejected: 25 },
    { name: 'Jun', approved: 756, rejected: 17 }
  ];

  const pieData = [
    { name: 'Residential', value: 45, color: '#3B82F6' },
    { name: 'Commercial', value: 30, color: '#10B981' },
    { name: 'Industrial', value: 15, color: '#F59E0B' },
    { name: 'Mixed Use', value: 10, color: '#EF4444' }
  ];

  const errorLogs: ErrorLog[] = [
    {
      id: '1',
      timestamp: '2025-06-08T14:30:22Z',
      integration: 'Signzy KYC API',
      errorType: 'Authentication Failed',
      summary: 'API key expired, KYC verification requests failing',
      severity: 'high'
    },
    {
      id: '2',
      timestamp: '2025-06-08T13:45:11Z',
      integration: 'Payment Gateway',
      errorType: 'Timeout Error',
      summary: 'Transaction processing delayed due to gateway timeout',
      severity: 'medium'
    },
    {
      id: '3',
      timestamp: '2025-06-08T12:20:33Z',
      integration: 'Blockchain Node',
      errorType: 'Connection Lost',
      summary: 'Temporary connection loss to Ethereum node',
      severity: 'low'
    },
    {
      id: '4',
      timestamp: '2025-06-08T11:15:44Z',
      integration: 'Email Service',
      errorType: 'Rate Limit Exceeded',
      summary: 'Email notification delivery delayed',
      severity: 'low'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      yellow: 'bg-yellow-500 text-white',
      purple: 'bg-purple-500 text-white',
      indigo: 'bg-indigo-500 text-white',
      teal: 'bg-teal-500 text-white',
      emerald: 'bg-emerald-500 text-white',
      cyan: 'bg-cyan-500 text-white'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const refreshData = () => {
    setLoading(true);
    setLastUpdated(new Date());
    setTimeout(() => setLoading(false), 1000);
  };

  if (loading) {
    return (
      <PageLayout title="System Metrics">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="System Metrics">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Activity className="w-4 h-4" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <button
            onClick={refreshData}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">View:</span>
          {(['daily', 'weekly', 'monthly'] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}>
                {metric.icon}
              </div>
              <div className="flex items-center gap-1">
                {metric.changeType === 'increase' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Registration Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily User Registrations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userRegistrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Investment Volume */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Volume (AED)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={investmentVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${(value as number / 1000)}K`, 'Volume']} />
              <Area type="monotone" dataKey="volume" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* KYC Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Approvals vs Rejections</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kycTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="approved" fill="#10B981" />
              <Bar dataKey="rejected" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Property Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Error Monitoring Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">System Error Monitoring</h3>
          </div>
          <p className="text-gray-600 text-sm">Recent integration failures and system errors</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {errorLogs.map((error) => (
              <div key={error.id} className={`p-4 rounded-lg border ${getSeverityColor(error.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">{error.integration}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(error.severity)}`}>
                        {error.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm font-medium mb-1">{error.errorType}</div>
                    <div className="text-sm">{error.summary}</div>
                  </div>
                  <div className="text-xs text-gray-500 ml-4">
                    {new Date(error.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {errorLogs.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <div className="text-gray-500">No recent errors detected</div>
              <div className="text-gray-400 text-sm">All systems operating normally</div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default SystemMetrics;