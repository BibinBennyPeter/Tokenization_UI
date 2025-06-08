import React from 'react';

const KYCReview: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800">KYC Review Center</h1>
    <div className="overflow-x-auto bg-white shadow rounded-md">
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">User ID</th>
            <th className="px-6 py-3">Documents</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Third-Party Check</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <td className="px-6 py-4">USR12345</td>
            <td className="px-6 py-4">Aadhaar, PAN</td>
            <td className="px-6 py-4">Pending</td>
            <td className="px-6 py-4">Pass (Signzy)</td>
            <td className="px-6 py-4">
              <button className="text-green-600 hover:underline mr-2">Approve</button>
              <button className="text-red-600 hover:underline mr-2">Reject</button>
              <button className="text-yellow-600 hover:underline">Flag</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default KYCReview;