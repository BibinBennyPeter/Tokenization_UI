import React from 'react';

interface Property {
  id: string;
  name: string;
  location: string;
  status: string;
  tokenCount: number;
  ownershipRetained: number;
  fundsRaised: number;
  adminComments?: string;
  investmentProgress: number; // in %
}

const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Palm Grove Estate',
    location: 'Dubai, UAE',
    status: 'Verified',
    tokenCount: 1000,
    ownershipRetained: 40,
    fundsRaised: 600000,
    adminComments: '',
    investmentProgress: 60,
  },
  {
    id: '2',
    name: 'Skyview Farms',
    location: 'Sharjah, UAE',
    status: 'Under Review',
    tokenCount: 0,
    ownershipRetained: 100,
    fundsRaised: 0,
    adminComments: 'Missing utility bill document.',
    investmentProgress: 0,
  },
];

const MyPropertiesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Properties</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white shadow rounded-2xl p-6 border border-gray-100"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
              <p className="text-sm text-gray-500">{property.location}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${
                  property.status === 'Verified'
                    ? 'bg-green-100 text-green-700'
                    : property.status === 'Under Review'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {property.status}
              </span>
            </div>

            <div className="text-sm space-y-1">
              <p><strong>Token Count:</strong> {property.tokenCount}</p>
              <p><strong>% Ownership Retained:</strong> {property.ownershipRetained}%</p>
              <p><strong>Funds Raised:</strong> AED {property.fundsRaised.toLocaleString()}</p>

              {property.adminComments && (
                <p className="text-red-600">
                  <strong>Admin Comments:</strong> {property.adminComments}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Progress
              </label>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${property.investmentProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {property.investmentProgress}% funded
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPropertiesPage;
