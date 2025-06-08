import React, { useState, } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface InvestmentData {
  property: string;
  investors: number;
  tokenHistory: number[];
  totalRaised: number;
  dates: string[];
}

const mockData: InvestmentData[] = [
  {
    property: 'Green Acres',
    investors: 12,
    tokenHistory: [1000, 3000, 5000, 7000, 9000],
    totalRaised: 9000,
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },
  {
    property: 'Sunset Villas',
    investors: 8,
    tokenHistory: [2000, 3500, 4700, 5000, 8000],
    totalRaised: 8000,
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },
];

const InvestmentInsights: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string>('Green Acres');
  const [filterMonth, setFilterMonth] = useState<string>('All');
  const [filterAmount, setFilterAmount] = useState<number | null>(null);

  const propertyData = mockData.find((d) => d.property === selectedProperty);

  const chartData = {
    labels: propertyData?.dates,
    datasets: [
      {
        label: 'Tokens Purchased ($)',
        data: propertyData?.tokenHistory,
        fill: false,
        borderColor: '#2563eb',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 flex-1">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">📊 Investment Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Property</label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {mockData.map((item) => (
              <option key={item.property} value={item.property}>
                {item.property}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Month</label>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>All</option>
            {propertyData?.dates.map((month, index) => (
              <option key={index}>{month}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Min Investment ($)</label>
          <input
            type="number"
            value={filterAmount ?? ''}
            onChange={(e) => setFilterAmount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. 1000"
          />
        </div>
      </div>

      {propertyData && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Investors</h2>
              <p className="text-2xl font-bold text-blue-600">{propertyData.investors}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Raised</h2>
              <p className="text-2xl font-bold text-green-600">${propertyData.totalRaised}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Tokens Sold</h2>
              <p className="text-2xl font-bold text-purple-600">
                {propertyData.tokenHistory.reduce((a, b) => a + b, 0)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Investment Over Time</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default InvestmentInsights;
