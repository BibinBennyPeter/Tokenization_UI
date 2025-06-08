import React, { useState } from 'react';
import { Download, AlertTriangle, Clock, DollarSign } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  totalTokens: number;
}

interface Investor {
  id: string;
  name: string;
  email: string;
  tokensHeld: number;
}

interface PayoutLog {
  id: string;
  propertyName: string;
  totalAmount: number;
  triggeredBy: string;
  date: string;
  dividendPerToken: number;
}

interface PayoutPreview {
  investor: Investor;
  payoutAmount: number;
}

const TriggerDividends: React.FC = () => {
  // Mock data
  const properties: Property[] = [
    { id: '1', name: 'Burj Vista Tower', totalTokens: 10000 },
    { id: '2', name: 'Marina Bay Complex', totalTokens: 15000 },
    { id: '3', name: 'Downtown Plaza', totalTokens: 8000 },
    { id: '4', name: 'Palm Heights Residency', totalTokens: 12000 }
  ];

  const investors: Record<string, Investor[]> = {
    '1': [
      { id: '1', name: 'Ahmed Al-Rashid', email: 'ahmed@example.com', tokensHeld: 1500 },
      { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', tokensHeld: 2000 },
      { id: '3', name: 'Mohammed Hassan', email: 'mohammed@example.com', tokensHeld: 1000 },
      { id: '4', name: 'Lisa Chen', email: 'lisa@example.com', tokensHeld: 800 },
      { id: '5', name: 'Omar Khalil', email: 'omar@example.com', tokensHeld: 1200 }
    ],
    '2': [
      { id: '6', name: 'Fatima Al-Zahra', email: 'fatima@example.com', tokensHeld: 2500 },
      { id: '7', name: 'John Smith', email: 'john@example.com', tokensHeld: 1800 },
      { id: '8', name: 'Aisha Abdullah', email: 'aisha@example.com', tokensHeld: 2200 }
    ],
    '3': [
      { id: '9', name: 'Khalid Ibrahim', email: 'khalid@example.com', tokensHeld: 1600 },
      { id: '10', name: 'Emma Wilson', email: 'emma@example.com', tokensHeld: 900 }
    ],
    '4': [
      { id: '11', name: 'Rashid Al-Maktoum', email: 'rashid@example.com', tokensHeld: 3000 },
      { id: '12', name: 'Sophia Garcia', email: 'sophia@example.com', tokensHeld: 1500 }
    ]
  };

  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [totalDividendPool, setTotalDividendPool] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [payoutLogs, setPayoutLogs] = useState<PayoutLog[]>([
    {
      id: '1',
      propertyName: 'Marina Bay Complex',
      totalAmount: 75000,
      triggeredBy: 'admin@realestate.com',
      date: '2025-06-05 14:30:00',
      dividendPerToken: 5
    },
    {
      id: '2',
      propertyName: 'Burj Vista Tower',
      totalAmount: 120000,
      triggeredBy: 'manager@realestate.com',
      date: '2025-06-03 10:15:00',
      dividendPerToken: 12
    }
  ]);

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);
  const currentInvestors = selectedProperty ? investors[selectedProperty] || [] : [];
  
  const dividendPerToken = selectedPropertyData && totalDividendPool 
    ? parseFloat(totalDividendPool) / selectedPropertyData.totalTokens 
    : 0;

  const payoutPreviews: PayoutPreview[] = currentInvestors.map(investor => ({
    investor,
    payoutAmount: investor.tokensHeld * dividendPerToken
  }));

  const totalPayoutAmount = payoutPreviews.reduce((sum, preview) => sum + preview.payoutAmount, 0);

  const handleTriggerPayout = () => {
    if (!selectedPropertyData || !totalDividendPool) return;

    const newLog: PayoutLog = {
      id: Date.now().toString(),
      propertyName: selectedPropertyData.name,
      totalAmount: parseFloat(totalDividendPool),
      triggeredBy: 'admin@realestate.com', // Mock admin
      date: new Date().toLocaleString(),
      dividendPerToken: dividendPerToken
    };

    setPayoutLogs([newLog, ...payoutLogs]);
    setShowConfirmation(false);
    setSelectedProperty('');
    setTotalDividendPool('');
    
    // Show success message (you could use a toast library in real implementation)
    alert(`Payout of ${totalDividendPool} AED successfully triggered for ${selectedPropertyData.name}!`);
  };

  const exportToCSV = () => {
    if (payoutPreviews.length === 0) return;

    const csvContent = [
      ['Investor Name', 'Email', 'Tokens Held', 'Payout Amount (AED)'],
      ...payoutPreviews.map(preview => [
        preview.investor.name,
        preview.investor.email,
        preview.investor.tokensHeld.toString(),
        preview.payoutAmount.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dividend-payout-${selectedPropertyData?.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trigger Dividend Payouts</h1>
          <p className="text-gray-600">Calculate and distribute dividends to property investors based on their token holdings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Selection & Dividend Pool */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Property
                  </label>
                  <select
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose a property...</option>
                    {properties.map(property => (
                      <option key={property.id} value={property.id}>
                        {property.name} ({property.totalTokens.toLocaleString()} tokens)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Dividend Pool (AED)
                  </label>
                  <input
                    type="number"
                    value={totalDividendPool}
                    onChange={(e) => setTotalDividendPool(e.target.value)}
                    placeholder="e.g., 100000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {selectedPropertyData && totalDividendPool && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Dividend Calculation</span>
                  </div>
                  <p className="text-blue-800">
                    <span className="font-medium">{dividendPerToken.toFixed(4)} AED per token</span>
                    <span className="text-sm ml-2">
                      ({parseFloat(totalDividendPool).toLocaleString()} AED ÷ {selectedPropertyData.totalTokens.toLocaleString()} tokens)
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Payout Preview */}
            {payoutPreviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Payout Preview</h2>
                  <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-medium text-gray-700">Investor</th>
                        <th className="text-right py-3 px-2 font-medium text-gray-700">Tokens</th>
                        <th className="text-right py-3 px-2 font-medium text-gray-700">Payout (AED)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payoutPreviews.map(preview => (
                        <tr key={preview.investor.id} className="border-b border-gray-100">
                          <td className="py-3 px-2">
                            <div>
                              <div className="font-medium text-gray-900">{preview.investor.name}</div>
                              <div className="text-gray-500 text-xs">{preview.investor.email}</div>
                            </div>
                          </td>
                          <td className="text-right py-3 px-2 text-gray-700">
                            {preview.investor.tokensHeld.toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-2 font-medium text-gray-900">
                            {preview.payoutAmount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Payout:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {totalPayoutAmount.toFixed(2)} AED
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setShowConfirmation(true)}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
                  >
                    Trigger Payout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Summary Cards & Payout Logs */}
          <div className="space-y-6">
            {/* Summary Cards */}
            {selectedPropertyData && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property:</span>
                    <span className="font-medium text-gray-900">{selectedPropertyData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Tokens:</span>
                    <span className="font-medium text-gray-900">{selectedPropertyData.totalTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investors:</span>
                    <span className="font-medium text-gray-900">{currentInvestors.length}</span>
                  </div>
                  {totalDividendPool && (
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-600">Pool Amount:</span>
                      <span className="font-medium text-gray-900">{parseFloat(totalDividendPool).toLocaleString()} AED</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payout History */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payouts</h3>
              <div className="space-y-3">
                {payoutLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{log.propertyName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {log.totalAmount.toLocaleString()} AED
                        </div>
                        <div className="text-xs text-gray-500">
                          By: {log.triggeredBy}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(log.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
                {payoutLogs.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">No recent payouts</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">Confirm Payout</h3>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-gray-700">
                You are about to trigger a dividend payout of{' '}
                <span className="font-bold">{totalDividendPool} AED</span> for{' '}
                <span className="font-bold">{selectedPropertyData?.name}</span>.
              </p>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> This action cannot be undone. Payouts will be processed immediately.
                </p>
              </div>
              <div className="text-sm text-gray-600">
                • {payoutPreviews.length} investors will receive payouts
                • {dividendPerToken.toFixed(4)} AED per token
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerPayout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Confirm Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TriggerDividends;