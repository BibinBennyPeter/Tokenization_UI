import React, { useState } from 'react';

type Withdrawal = {
  amount: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Failed';
  referenceId: string;
};

const mockWithdrawals: Withdrawal[] = [
  {
    amount: 15000,
    date: '2025-06-05',
    status: 'Completed',
    referenceId: 'WD123456',
  },
  {
    amount: 7500,
    date: '2025-05-25',
    status: 'Pending',
    referenceId: 'WD123457',
  },
];

const PayoutsWithdrawals: React.FC = () => {
  const [requestedAmount, setRequestedAmount] = useState('');

  const handlePayoutRequest = () => {
    if (!requestedAmount) {
      alert('Please enter an amount');
      return;
    }
    alert(`Payout of AED ${requestedAmount} requested to linked bank account.`);
    setRequestedAmount('');
  };

  const totalEarnings = mockWithdrawals.reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payouts / Withdrawals</h1>

      {/* Total Earnings */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Earnings from Tokenized Sales</h2>
        <p className="text-2xl text-green-600 font-bold">AED {totalEarnings.toLocaleString()}</p>
      </div>

      {/* Payout Request */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Request Payout</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <input
            type="number"
            placeholder="Enter amount (AED)"
            value={requestedAmount}
            onChange={(e) => setRequestedAmount(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full sm:w-64 text-gray-900"
          />
          <button
            onClick={handlePayoutRequest}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Request Payout
          </button>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Withdrawal History</h2>
        <table className="w-full text-sm text-left text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="px-4 py-2">Amount (AED)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Reference ID</th>
            </tr>
          </thead>
          <tbody>
            {mockWithdrawals.map((w, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{w.amount}</td>
                <td className="px-4 py-2">{w.date}</td>
                <td className={`px-4 py-2 font-medium ${w.status === 'Completed' ? 'text-green-600' : w.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {w.status}
                </td>
                <td className="px-4 py-2">{w.referenceId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayoutsWithdrawals;
