import React, { useState } from 'react';

type ExitRequest = {
  id: string;
  property: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Denied';
  scheduledDate?: string;
  amount?: number;
};

const mockRequests: ExitRequest[] = [
  {
    id: 'ER001',
    property: 'Palm Hills Estate',
    reason: 'Need liquidity for other investments',
    status: 'Pending',
  },
  {
    id: 'ER002',
    property: 'Green Valley Farm',
    reason: 'Property reached target return',
    status: 'Approved',
    scheduledDate: '2025-06-12',
    amount: 12000,
  },
];

const ExitRequests: React.FC = () => {
  const [reason, setReason] = useState('');
  const [property, setProperty] = useState('');

  const handleSubmit = () => {
    if (!reason || !property) {
      alert('Please select a property and enter a reason.');
      return;
    }

    alert(`Exit request for "${property}" submitted.`);
    setReason('');
    setProperty('');
  };

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Exit Requests</h1>

      {/* Request Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Raise Token Buyback or Resale Request</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Select Property</label>
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
            >
              <option value="">-- Select --</option>
              <option value="Palm Hills Estate">Palm Hills Estate</option>
              <option value="Green Valley Farm">Green Valley Farm</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Reason for Exit</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="E.g. Need funds, personal reason"
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Exit Request
        </button>
      </div>

      {/* Status Table */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Track Exit Request Status</h2>
        <table className="w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="px-4 py-2">Request ID</th>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Scheduled Date</th>
              <th className="px-4 py-2">Amount (AED)</th>
            </tr>
          </thead>
          <tbody>
            {mockRequests.map((req) => (
              <tr key={req.id} className="border-t">
                <td className="px-4 py-2">{req.id}</td>
                <td className="px-4 py-2">{req.property}</td>
                <td className="px-4 py-2">{req.reason}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    req.status === 'Approved'
                      ? 'text-green-600'
                      : req.status === 'Pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {req.status}
                </td>
                <td className="px-4 py-2">{req.scheduledDate || '—'}</td>
                <td className="px-4 py-2">{req.amount ? `AED ${req.amount}` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Secondary Market Visibility */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Secondary Market Visibility</h2>
        <p className="text-gray-700 text-sm">
          If secondary market is enabled, you can view listed tokens and trading activity in your portfolio section.
          Contact support for more information on resale options.
        </p>
      </div>
    </div>
  );
};

export default ExitRequests;