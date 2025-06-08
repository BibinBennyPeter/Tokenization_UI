import React from 'react';

const OverviewPage: React.FC = () => {
  return (
    // <div className="p-6 w-full bg-gray-50 min-h-screen ">
    <div className="p-6 w-full bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-600 text-sm">Total Properties Listed</h2>
          <p className="text-2xl font-semibold text-blue-700">12</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-600 text-sm">Total Tokenized Value (AED)</h2>
          <p className="text-2xl font-semibold text-green-600">1,500,000</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-600 text-sm">Total Investments Raised</h2>
          <p className="text-2xl font-semibold text-purple-600">1,200,000</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-600 text-sm">Pending Approvals</h2>
          <p className="text-2xl font-semibold text-red-500">3</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-600 text-sm">Exit Requests Status</h2>
          <p className="text-2xl font-semibold text-orange-500">2 Pending</p>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity Log</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li>✅ Property "Green Acres" approved by Admin</li>
          <li>💸 1000 tokens sold for "Palm Hills Estate"</li>
          <li>🏦 Payout of AED 25,000 processed to your bank</li>
          <li>📤 New property "Sunset Farm" submitted for review</li>
          <li>📝 KYC verified successfully</li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewPage;
