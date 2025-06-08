import React, { useState } from 'react';
import { Eye, Check, X, Filter, Calendar, MapPin, FileText, User } from 'lucide-react';

// Types
interface Property {
  id: string;
  propertyName: string;
  ownerName: string;
  ownerEmail: string;
  submissionDate: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  address: string;
  propertyType: string;
  size: string;
  documents: {
    titleDeed: string;
    legalDocs: string;
  };
  rejectionReason?: string;
}

// Page Layout Component
const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  </div>
);

// Status Badge Component
const StatusBadge: React.FC<{ status: Property['status'] }> = ({ status }) => {
  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

// Preview Modal Component
const PreviewModal: React.FC<{ 
  property: Property | null; 
  isOpen: boolean; 
  onClose: () => void 
}> = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Property Preview: {property.propertyName}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Property Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">Address:</span> {property.address}</p>
                <p><span className="font-medium">Type:</span> {property.propertyType}</p>
                <p><span className="font-medium">Size:</span> {property.size}</p>
                <p><span className="font-medium">Owner:</span> {property.ownerName}</p>
                <p><span className="font-medium">Email:</span> {property.ownerEmail}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Location Preview
              </h3>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Google Maps Integration</p>
                  <p className="text-sm">{property.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Document Previews
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Title Deed</h4>
                <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <FileText className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-sm">PDF Preview</p>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Legal Documents</h4>
                <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <FileText className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-sm">PDF Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Rejection Modal Component
const RejectionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Reject Property</h2>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rejection Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a reason for rejection..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>
        <div className="px-6 py-4 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason.trim()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reject Property
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock Data
const mockProperties: Property[] = [
  {
    id: '1',
    propertyName: 'Sunset Villa Estate',
    ownerName: 'John Doe',
    ownerEmail: 'john.doe@email.com',
    submissionDate: '2024-06-01',
    status: 'Pending',
    address: '123 Sunset Boulevard, Beverly Hills, CA 90210',
    propertyType: 'Residential Villa',
    size: '5,200 sq ft',
    documents: {
      titleDeed: 'title_deed_001.pdf',
      legalDocs: 'legal_docs_001.pdf'
    }
  },
  {
    id: '2',
    propertyName: 'Downtown Office Complex',
    ownerName: 'Sarah Johnson',
    ownerEmail: 'sarah.johnson@business.com',
    submissionDate: '2024-05-28',
    status: 'Under Review',
    address: '456 Main Street, Downtown, NY 10001',
    propertyType: 'Commercial Office',
    size: '12,000 sq ft',
    documents: {
      titleDeed: 'title_deed_002.pdf',
      legalDocs: 'legal_docs_002.pdf'
    }
  },
  {
    id: '3',
    propertyName: 'Green Meadows Farm',
    ownerName: 'Michael Chen',
    ownerEmail: 'michael.chen@farm.com',
    submissionDate: '2024-05-25',
    status: 'Approved',
    address: '789 Country Road, Green Valley, TX 75001',
    propertyType: 'Agricultural Land',
    size: '50 acres',
    documents: {
      titleDeed: 'title_deed_003.pdf',
      legalDocs: 'legal_docs_003.pdf'
    }
  },
  {
    id: '4',
    propertyName: 'Oceanview Apartments',
    ownerName: 'Emily Rodriguez',
    ownerEmail: 'emily.rodriguez@realty.com',
    submissionDate: '2024-05-20',
    status: 'Rejected',
    address: '321 Ocean Drive, Miami Beach, FL 33139',
    propertyType: 'Residential Complex',
    size: '8,500 sq ft',
    documents: {
      titleDeed: 'title_deed_004.pdf',
      legalDocs: 'legal_docs_004.pdf'
    },
    rejectionReason: 'Incomplete documentation - missing building permits'
  }
];

// Property Verification Page
const PropertyVerification: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [rejectingPropertyId, setRejectingPropertyId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredProperties = statusFilter === 'All' 
    ? properties 
    : properties.filter(p => p.status === statusFilter);

  const handlePreview = (property: Property) => {
    setSelectedProperty(property);
    setIsPreviewOpen(true);
  };

  const handleApprove = (propertyId: string) => {
    setProperties(prev => prev.map(p => 
      p.id === propertyId ? { ...p, status: 'Approved' as const } : p
    ));
    console.log('Property approved:', propertyId);
  };

  const handleReject = (propertyId: string) => {
    setRejectingPropertyId(propertyId);
    setIsRejectionModalOpen(true);
  };

  const confirmReject = (reason: string) => {
    if (rejectingPropertyId) {
      setProperties(prev => prev.map(p => 
        p.id === rejectingPropertyId 
          ? { ...p, status: 'Rejected' as const, rejectionReason: reason } 
          : p
      ));
      console.log('Property rejected:', rejectingPropertyId, 'Reason:', reason);
      setRejectingPropertyId(null);
    }
  };

  const handleStatusUpdate = (propertyId: string) => {
    setProperties(prev => prev.map(p => 
      p.id === propertyId && p.status === 'Pending' 
        ? { ...p, status: 'Under Review' as const } 
        : p
    ));
  };

  return (
    <PageLayout title="Property Verification Queue">
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <span className="text-sm text-gray-500">
                ({filteredProperties.length} properties)
              </span>
            </div>
            
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {property.propertyName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.propertyType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {property.ownerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {property.ownerEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        {new Date(property.submissionDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={property.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePreview(property)}
                          className="text-blue-600 hover:text-blue-900 flex items-center px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </button>
                        {property.status !== 'Approved' && property.status !== 'Rejected' && (
                          <>
                            <button
                              onClick={() => {
                                handleStatusUpdate(property.id);
                                handleApprove(property.id);
                              }}
                              className="text-green-600 hover:text-green-900 flex items-center px-2 py-1 rounded hover:bg-green-50 transition-colors"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(property.id)}
                              className="text-red-600 hover:text-red-900 flex items-center px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

       
      </div>

      {/* Modals */}
      <PreviewModal
        property={selectedProperty}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      
      <RejectionModal
        isOpen={isRejectionModalOpen}
        onClose={() => setIsRejectionModalOpen(false)}
        onConfirm={confirmReject}
      />
    </PageLayout>
  );
};

export default PropertyVerification;