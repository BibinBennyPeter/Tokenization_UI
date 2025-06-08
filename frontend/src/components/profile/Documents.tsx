import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, Shield, DollarSign } from 'lucide-react';

const Documents: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('uploaded');

  const uploadedDocuments = [
    { id: 1, name: 'Aadhar Card - Front', type: 'Identity', uploadDate: '2024-03-15', size: '2.4 MB', status: 'verified' },
    { id: 2, name: 'Aadhar Card - Back', type: 'Identity', uploadDate: '2024-03-15', size: '2.1 MB', status: 'verified' },
    { id: 3, name: 'PAN Card', type: 'Identity', uploadDate: '2024-03-15', size: '1.8 MB', status: 'verified' },
    { id: 4, name: 'Passport Photo', type: 'Identity', uploadDate: '2024-03-15', size: '1.2 MB', status: 'pending' },
    { id: 5, name: 'Bank Statement', type: 'Financial', uploadDate: '2024-03-14', size: '5.2 MB', status: 'verified' }
  ];

  const agreements = [
    { id: 1, name: 'Platform Terms & Conditions', signedDate: '2024-03-10', version: 'v2.1', status: 'active' },
    { id: 2, name: 'Investment Agreement - Mumbai Property', signedDate: '2024-03-12', version: 'v1.0', status: 'active' },
    { id: 3, name: 'Privacy Policy Agreement', signedDate: '2024-03-10', version: 'v1.8', status: 'active' },
    { id: 4, name: 'Risk Disclosure Statement', signedDate: '2024-03-12', version: 'v1.2', status: 'active' }
  ];

  const taxDocuments = [
    { id: 1, name: 'TDS Certificate - FY 2023-24', period: '2023-24', issueDate: '2024-04-15', amount: '₹12,500' },
    { id: 2, name: 'Investment Summary - FY 2023-24', period: '2023-24', issueDate: '2024-04-15', amount: '₹2,50,000' },
    { id: 3, name: 'Dividend Statement - Q4 2023', period: 'Q4 2023', issueDate: '2024-01-15', amount: '₹8,750' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'verified': { color: 'bg-green-100 text-green-800', text: 'Verified' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      'rejected': { color: 'bg-red-100 text-red-800', text: 'Rejected' },
      'active': { color: 'bg-blue-100 text-blue-800', text: 'Active' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const categories = [
    { id: 'uploaded', label: 'Uploaded Documents', icon: FileText },
    { id: 'agreements', label: 'Agreements', icon: Shield },
    { id: 'tax', label: 'Tax Documents', icon: DollarSign }
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'uploaded':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {uploadedDocuments.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>Uploaded {doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(doc.status)}
                      <div className="flex space-x-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'agreements':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {agreements.map((agreement) => (
                <div key={agreement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{agreement.name}</h4>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>Version {agreement.version}</span>
                          <span>•</span>
                          <span>Signed {agreement.signedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(agreement.status)}
                      <div className="flex space-x-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tax':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Tax Year 2023-24</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Your tax documents for the current financial year will be auto-generated after March 31st.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {taxDocuments.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>Period: {doc.period}</span>
                          <span>•</span>
                          <span>Amount: {doc.amount}</span>
                          <span>•</span>
                          <span>Issued {doc.issueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
          <p className="text-gray-600 mt-1">Manage your uploaded documents, agreements, and tax certificates</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Download All
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default Documents;