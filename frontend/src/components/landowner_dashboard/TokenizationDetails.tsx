import React from 'react';

type PropertyTokenInfo = {
  id: number;
  name: string;
  totalTokens: number;
  tokenPrice: number;
  availableTokens: number;
  ownershipPercent: number;
  activityLog: string[];
  tokenHistoryLink: string;
};

const mockProperties: PropertyTokenInfo[] = [
  {
    id: 1,
    name: 'Palm Hills Estate',
    totalTokens: 10000,
    tokenPrice: 25,
    availableTokens: 2500,
    ownershipPercent: 40,
    activityLog: [
      '2000 tokens sold on 01-Jun-2025',
      '500 tokens listed on secondary market',
      'Payout issued on 15-May-2025'
    ],
    tokenHistoryLink: 'https://blockchain.explorer/token/1',
  },
  {
    id: 2,
    name: 'Green Valley Farm',
    totalTokens: 8000,
    tokenPrice: 30,
    availableTokens: 3000,
    ownershipPercent: 55,
    activityLog: [
      '5000 tokens sold on 05-Jun-2025',
      'Ownership updated on 03-Jun-2025'
    ],
    tokenHistoryLink: 'https://blockchain.explorer/token/2',
  }
];

const TokenizationDetails: React.FC = () => {
  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tokenization Details</h1>

      {mockProperties.map((property) => (
        <div key={property.id} className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{property.name}</h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-medium text-gray-900">Total Tokens Issued:</span> {property.totalTokens}</p>
            <p><span className="font-medium text-gray-900">Token Price:</span> AED {property.tokenPrice}/token</p>
            <p><span className="font-medium text-gray-900">Available Tokens:</span> {property.availableTokens}</p>
            <p><span className="font-medium text-gray-900">Fractional Ownership:</span> {property.ownershipPercent}%</p>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-800 mb-2">Investment Activity Log</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {property.activityLog.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <a
              href={property.tokenHistoryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Token History On-Chain
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenizationDetails;
