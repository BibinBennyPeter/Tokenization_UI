import React, { useState } from 'react';
import { Search, Filter, Download, Upload, Settings, Bell, FileText, Shield, AlertTriangle, Plus, Trash2, Edit2, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'Guideline' | 'Policy' | 'Regulation' | 'Notice';
  category: string;
  version: string;
  uploadedAt: string;
  uploadedBy: string;
  status: 'Active' | 'Draft' | 'Archived';
  lastUpdated: string;
}

interface Rule {
  id: string;
  name: string;
  type: 'Transaction' | 'KYC' | 'AML' | 'General';
  threshold: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  lastTriggered: string;
  triggerCount: number;
}

interface Notification {
  id: string;
  title: string;
  type: 'Update' | 'Alert' | 'Reminder';
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  status: 'Read' | 'Unread';
  description: string;
}

const RegulatorySettings = () => {
  // Sample documents data
  const [documents] = useState<Document[]>([
    {
      id: 'DOC-001',
      name: 'KYC Compliance Guidelines 2024',
      type: 'Guideline',
      category: 'KYC',
      version: '2.1',
      uploadedAt: '2024-03-01T10:00:00Z',
      uploadedBy: 'compliance@company.com',
      status: 'Active',
      lastUpdated: '2024-03-15T14:30:00Z'
    },
    {
      id: 'DOC-002',
      name: 'AML Policy Framework',
      type: 'Policy',
      category: 'AML',
      version: '1.0',
      uploadedAt: '2024-02-15T09:15:00Z',
      uploadedBy: 'legal@company.com',
      status: 'Active',
      lastUpdated: '2024-02-15T09:15:00Z'
    },
    {
      id: 'DOC-003',
      name: 'Token Transfer Regulations',
      type: 'Regulation',
      category: 'Transactions',
      version: '3.2',
      uploadedAt: '2024-01-20T11:45:00Z',
      uploadedBy: 'compliance@company.com',
      status: 'Active',
      lastUpdated: '2024-03-10T16:20:00Z'
    }
  ]);

  // Sample rules data
  const [rules] = useState<Rule[]>([
    {
      id: 'RULE-001',
      name: 'High-Value Transaction Alert',
      type: 'Transaction',
      threshold: '$50,000',
      status: 'Active',
      createdAt: '2024-01-01T00:00:00Z',
      lastTriggered: '2024-03-15T14:30:00Z',
      triggerCount: 45
    },
    {
      id: 'RULE-002',
      name: 'KYC Document Expiry',
      type: 'KYC',
      threshold: '30 days',
      status: 'Active',
      createdAt: '2024-01-01T00:00:00Z',
      lastTriggered: '2024-03-14T09:15:00Z',
      triggerCount: 28
    },
    {
      id: 'RULE-003',
      name: 'Suspicious Pattern Detection',
      type: 'AML',
      threshold: '3 occurrences',
      status: 'Active',
      createdAt: '2024-01-01T00:00:00Z',
      lastTriggered: '2024-03-15T11:45:00Z',
      triggerCount: 12
    }
  ]);

  // Sample notifications data
  const [notifications] = useState<Notification[]>([
    {
      id: 'NOT-001',
      title: 'New KYC Requirements Update',
      type: 'Update',
      priority: 'High',
      date: '2024-03-15T10:00:00Z',
      status: 'Unread',
      description: 'Updated KYC requirements for high-risk jurisdictions'
    },
    {
      id: 'NOT-002',
      title: 'AML Threshold Adjustment',
      type: 'Alert',
      priority: 'Medium',
      date: '2024-03-14T14:30:00Z',
      status: 'Read',
      description: 'New AML thresholds effective from April 1st, 2024'
    },
    {
      id: 'NOT-003',
      title: 'Quarterly Compliance Review',
      type: 'Reminder',
      priority: 'Low',
      date: '2024-03-13T09:15:00Z',
      status: 'Read',
      description: 'Q1 2024 compliance review due next week'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'documents' | 'rules' | 'notifications'>('documents');

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Draft':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Archived':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'Inactive':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority) {
      case 'High':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Low':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Regulatory Settings & Updates</h1>
              <p className="text-gray-600">Manage compliance documents, automated rules, and regulatory notifications</p>
            </div>
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors shadow-lg"
              >
                <Plus className="w-4 h-4" />
                New Rule
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'documents'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documents
              </div>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'rules'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Automated Rules
              </div>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {activeTab === 'documents' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Document Details</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Version</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">ID: {doc.id}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Uploaded by: {doc.uploadedBy}
                          </div>
                          <div className="text-xs text-gray-500">
                            Last updated: {new Date(doc.lastUpdated).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{doc.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{doc.version}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(doc.status)}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Download Document"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Edit Document"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rule Details</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Threshold</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                          <div className="text-xs text-gray-500">ID: {rule.id}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Created: {new Date(rule.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Last triggered: {new Date(rule.lastTriggered).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{rule.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{rule.threshold}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(rule.status)}>
                          {rule.status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Triggered {rule.triggerCount} times
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Edit Rule"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Rule"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Notification Details</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <tr key={notification.id} className="hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                          <div className="text-xs text-gray-500">ID: {notification.id}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {notification.description}
                          </div>
                          <div className="text-xs text-gray-500">
                            Date: {new Date(notification.date).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{notification.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getPriorityBadge(notification.priority)}>
                          {notification.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(notification.status)}>
                          {notification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Compliance Notice */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
  <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Regulatory Compliance Guidelines</h3>
              <p className="text-xs text-gray-600">
                All regulatory documents and automated rules must be reviewed and updated quarterly.
                Notifications are automatically generated for important regulatory updates and compliance deadlines.
                Document retention period: 7 years as per financial regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
);
};

export default RegulatorySettings;