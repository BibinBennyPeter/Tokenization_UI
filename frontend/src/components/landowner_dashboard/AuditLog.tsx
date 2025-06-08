import React, { useState } from 'react';

type LogEntry = {
  id: number;
  date: string;
  type: 'Upload' | 'Edit' | 'Submission' | 'Tokenization' | 'Payout' | 'Exit Request';
  description: string;
};

const mockLogs: LogEntry[] = [
  { id: 1, date: '2025-06-08', type: 'Upload', description: 'Uploaded Title Deed for "Palm Hills Estate"' },
  { id: 2, date: '2025-06-07', type: 'Tokenization', description: 'Issued 5000 tokens for "Green Valley Farm"' },
  { id: 3, date: '2025-06-06', type: 'Edit', description: 'Edited market value of "Sunset Farm"' },
  { id: 4, date: '2025-06-05', type: 'Payout', description: 'Payout of AED 15,000 processed' },
  { id: 5, date: '2025-06-04', type: 'Exit Request', description: 'Submitted exit request for "Palm Hills Estate"' },
  { id: 6, date: '2025-06-03', type: 'Submission', description: 'Submitted KYC documents' },
];

const AuditLog: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredLogs = mockLogs.filter((log) => {
    return (
      (typeFilter ? log.type === typeFilter : true) &&
      (dateFilter ? log.date === dateFilter : true)
    );
  });

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Audit Log</h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full text-gray-900 bg-white"
          >
            <option value="">All</option>
            <option value="Upload">Upload</option>
            <option value="Edit">Edit</option>
            <option value="Submission">Submission</option>
            <option value="Tokenization">Tokenization</option>
            <option value="Payout">Payout</option>
            <option value="Exit Request">Exit Request</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full text-gray-900 bg-white"
          />
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">User Activity Log</h2>
        {filteredLogs.length === 0 ? (
          <p className="text-gray-500">No records found for the selected filters.</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="px-4 py-2">{log.date}</td>
                  <td className="px-4 py-2">{log.type}</td>
                  <td className="px-4 py-2">{log.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AuditLog;
