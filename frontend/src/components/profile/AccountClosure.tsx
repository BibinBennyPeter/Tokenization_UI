import React, { useState } from 'react';
import { AlertTriangle, Download, Lock, Clock, CheckCircle } from 'lucide-react';

const AccountClosure: React.FC = () => {
  const [activeTab, setActiveTab] = useState('withdrawal');
  const [withdrawalForm, setWithdrawalForm] = useState({
    reason: '',
    bankAccount: '',
    amount: '',
    confirmWithdrawal: false
  });
  const [deleteForm, setDeleteForm] = useState({
    confirmDelete: false,
    downloadData: false,
    reason: '',
    password: ''
  });

  const withdrawalReasons = [
    'Need funds for personal use',
    'Dissatisfied with returns',
    'Investment strategy change',
    'Other financial priorities',
    'Other'
  ];

  const deleteReasons = [
    'No longer interested in real estate investment',
    'Privacy concerns',
    'Moving to different platform',
    'Temporary account closure',
    'Other'
  ];

  const renderWithdrawalRequest = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Important Information</p>
            <ul className="text-sm text-amber-800 mt-2 space-y-1">
              <li>• Withdrawal requests are processed within 5-7 business days</li>
              <li>• Early withdrawal may incur fees as per terms and conditions</li>
              <li>• You can partially withdraw available funds</li>
              <li>• Locked investments cannot be withdrawn before maturity</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">Investment Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Invested</span>
                <span className="font-medium">₹2,50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Value</span>
                <span className="font-medium">₹2,68,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available for Withdrawal</span>
                <span className="font-medium text-green-600">₹1,50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Locked Investments</span>
                <span className="font-medium text-orange-600">₹1,18,500</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Withdrawal</label>
            <select
              value={withdrawalForm.reason}
              onChange={(e) => setWithdrawalForm(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select reason</option>
              {withdrawalReasons.map((reason, index) => (
                <option key={index} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount</label>
            <input
              type="number"
              value={withdrawalForm.amount}
              onChange={(e) => setWithdrawalForm(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount (Max: ₹1,50,000)"
              max="150000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
            <select
              value={withdrawalForm.bankAccount}
              onChange={(e) => setWithdrawalForm(prev => ({ ...prev, bankAccount: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select bank account</option>
              <option value="main">HDFC Bank - **** 1234</option>
              <option value="savings">SBI Savings - **** 5678</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="confirmWithdrawal"
              checked={withdrawalForm.confirmWithdrawal}
              onChange={(e) => setWithdrawalForm(prev => ({ ...prev, confirmWithdrawal: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="confirmWithdrawal" className="text-sm text-gray-700">
              I understand the withdrawal terms and confirm this request
            </label>
          </div>

          <button 
            disabled={!withdrawalForm.confirmWithdrawal}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Submit Withdrawal Request
          </button>
        </div>
      </div>
    </div>
  );

  const renderAccountDeletion = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-900">Warning: This action cannot be undone</p>
            <ul className="text-sm text-red-800 mt-2 space-y-1">
              <li>• All your account data will be permanently deleted</li>
              <li>• You will lose access to all investments and documents</li>
              <li>• Any pending transactions will be cancelled</li>
              <li>• Account recovery will not be possible</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Your Data</span>
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Before deleting your account, you can download all your data including:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li>• Investment history and statements</li>
              <li>• Tax documents and certificates</li>
              <li>• All uploaded documents</li>
              <li>• Transaction records</li>
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Download All Data
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Account Deletion</label>
            <select
              value={deleteForm.reason}
              onChange={(e) => setDeleteForm(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select reason</option>
              {deleteReasons.map((reason, index) => (
                <option key={index} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Your Password</label>
            <input
              type="password"
              value={deleteForm.password}
              onChange={(e) => setDeleteForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="downloadData"
                checked={deleteForm.downloadData}
                onChange={(e) => setDeleteForm(prev => ({ ...prev, downloadData: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="downloadData" className="text-sm text-gray-700">
                I have downloaded my data
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="confirmDelete"
                checked={deleteForm.confirmDelete}
                onChange={(e) => setDeleteForm(prev => ({ ...prev, confirmDelete: e.target.checked }))}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="confirmDelete" className="text-sm text-gray-700">
                I understand this action is permanent and cannot be undone
              </label>
            </div>
          </div>

          <button 
            disabled={!deleteForm.confirmDelete || !deleteForm.downloadData || !deleteForm.password}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <Lock className="w-4 h-4" />
            <span>Delete Account Permanently</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Account Management</h2>
          <p className="text-gray-600 mt-1">Manage your withdrawal requests and account closure options</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('withdrawal')}
            className={`${
              activeTab === 'withdrawal'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
          >
            <Clock className="w-4 h-4" />
            <span>Withdrawal Request</span>
          </button>
          <button
            onClick={() => setActiveTab('delete')}
            className={`${
              activeTab === 'delete'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </nav>
      </div>

      {activeTab === 'withdrawal' && renderWithdrawalRequest()}
      {activeTab === 'delete' && renderAccountDeletion()}
    </div>
  );
};

export default AccountClosure;