import React, { useState, useRef } from 'react';
import { Shield, Upload, Eye, CheckCircle, XCircle, Clock, AlertTriangle, FileText, CreditCard, Camera, Download, Trash2 } from 'lucide-react';

const KYCVerification: React.FC = () => {
  const [kycStatus, setKycStatus] = useState<'not-started' | 'pending' | 'under-review' | 'approved' | 'rejected'>('under-review');
  const [selectedIdProof, setSelectedIdProof] = useState('aadhar');
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({});
  const [documentStatuses, setDocumentStatuses] = useState<{[key: string]: 'not-uploaded' | 'uploaded' | 'pending' | 'approved' | 'rejected'}>({
    'id-proof': 'uploaded',
    'id-proof-back': 'uploaded',
    'pan': 'uploaded',
    'photo': 'pending',
    'bank': 'not-uploaded'
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    upiId: ''
  });

  const fileInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({});

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'not-started': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', icon: Clock, text: 'Not Started' },
      'pending': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: Clock, text: 'Pending' },
      'under-review': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', icon: Eye, text: 'Under Review' },
      'approved': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: CheckCircle, text: 'Approved' },
      'rejected': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: XCircle, text: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-2" />
        {config.text}
      </span>
    );
  };

  const idProofOptions = [
    { value: 'aadhar', label: 'Aadhar Card', description: 'Upload front and back sides' },
    { value: 'driving-license', label: 'Driving License', description: 'Upload front and back sides' },
    { value: 'voters-id', label: 'Voter ID Card', description: 'Upload front and back sides' }
  ];

  const getFileTypeRestrictions = (docType: string) => {
    if (docType === 'photo') {
      return {
        accept: '.jpg,.jpeg,.png',
        types: 'JPEG, JPG, PNG'
      };
    }
    return {
      accept: '.pdf,.jpg,.jpeg,.png',
      types: 'PDF, JPEG, JPG, PNG'
    };
  };

  const handleFileUpload = (docId: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [docId]: file }));
    setDocumentStatuses(prev => ({ ...prev, [docId]: 'pending' }));
    
    // Simulate upload process
    setTimeout(() => {
      setDocumentStatuses(prev => ({ ...prev, [docId]: 'uploaded' }));
    }, 2000);
  };

  const handleFileSelect = (docId: string) => {
    const input = fileInputRefs.current[docId];
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(docId, file);
    }
  };

  const handleFileRemove = (docId: string) => {
    setUploadedFiles(prev => ({ ...prev, [docId]: null }));
    setDocumentStatuses(prev => ({ ...prev, [docId]: 'not-uploaded' }));
    if (fileInputRefs.current[docId]) {
      fileInputRefs.current[docId]!.value = '';
    }
  };

  const handleVideoVerification = () => {
    alert('Video verification would launch here - integrating with camera API');
  };

  const handleDownloadFile = (docId: string) => {
    const file = uploadedFiles[docId];
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleViewFile = (docId: string) => {
    const file = uploadedFiles[docId];
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, '_blank');
    }
  };

  const documents = [
    { 
      id: 'id-proof', 
      name: `${idProofOptions.find(opt => opt.value === selectedIdProof)?.label} (Front)`, 
      status: documentStatuses['id-proof'], 
      required: true,
      type: 'document'
    },
    { 
      id: 'id-proof-back', 
      name: `${idProofOptions.find(opt => opt.value === selectedIdProof)?.label} (Back)`, 
      status: documentStatuses['id-proof-back'], 
      required: true,
      type: 'document'
    },
    { id: 'pan', name: 'PAN Card', status: documentStatuses['pan'], required: true, type: 'document' },
    { id: 'photo', name: 'Passport Photo', status: documentStatuses['photo'], required: true, type: 'photo' },
    { id: 'bank', name: 'Bank Statement', status: documentStatuses['bank'], required: false, type: 'document' }
  ];

  const handleSaveBankDetails = () => {
    if (bankDetails.accountNumber && bankDetails.ifscCode && bankDetails.bankName) {
      alert('Bank details saved successfully!');
    } else {
      alert('Please fill in all required bank details.');
    }
  };

  return (
    <div className="space-y-8">
      {/* KYC Status Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>KYC Verification Status</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Complete your verification to access all features</p>
          </div>
          {getStatusBadge(kycStatus)}
        </div>

        {kycStatus === 'under-review' && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Verification in Progress</p>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Your documents are being reviewed. This process typically takes 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {kycStatus === 'rejected' && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900 dark:text-red-300">Verification Rejected</p>
                <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                  Document quality issues detected. Please re-upload clear images of your documents.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Required Documents</span>
          </h3>

          {/* ID Proof Selection */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select ID Proof Type</label>
              <select
                value={selectedIdProof}
                onChange={(e) => setSelectedIdProof(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {idProofOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {idProofOptions.find(opt => opt.value === selectedIdProof)?.description}
              </p>
            </div>
          </div>

          {documents.map((doc) => {
            const restrictions = getFileTypeRestrictions(doc.type);
            return (
              <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      doc.status === 'uploaded' || doc.status === 'approved' ? 'bg-green-500' : 
                      doc.status === 'pending' ? 'bg-yellow-500' : 
                      doc.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300'
                    }`} />
                    <span className="font-medium text-gray-900 dark:text-white">{doc.name}</span>
                    {doc.required && (
                      <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">Required</span>
                    )}
                  </div>
                  {(doc.status === 'uploaded' || doc.status === 'approved') && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {doc.status === 'pending' && (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                  {doc.status === 'rejected' && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>

                <input
                  ref={(el) => fileInputRefs.current[doc.id] = el}
                  type="file"
                  accept={restrictions.accept}
                  onChange={(e) => handleFileChange(doc.id, e)}
                  className="hidden"
                />

                {doc.status === 'not-uploaded' ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-700/50">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Supported formats: {restrictions.types}</p>
                    <button 
                      onClick={() => handleFileSelect(doc.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {uploadedFiles[doc.id]?.name || `${doc.name.replace(/[()]/g, '_').toLowerCase().replace(/\s+/g, '_')}_scan.pdf`}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewFile(doc.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
                        title="View file"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDownloadFile(doc.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleFileSelect(doc.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-1"
                        title="Replace file"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleFileRemove(doc.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Bank Account Details</span>
          </h3>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Required for dividend payouts and investment withdrawals
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Number *</label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">IFSC Code *</label>
                <input
                  type="text"
                  value={bankDetails.ifscCode}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter IFSC code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bank Name *</label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">UPI ID (Optional)</label>
                <input
                  type="text"
                  value={bankDetails.upiId}
                  onChange={(e) => setBankDetails(prev => ({ ...prev, upiId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="username@bankname"
                />
              </div>
            </div>
          </div>

          {/* Video Verification */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Video Verification</span>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Complete a quick liveness check to verify your identity
            </p>
            <button 
              onClick={handleVideoVerification}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Start Video Verification
            </button>
          </div>
        </div>
      </div>

      {/* KYC History */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Verification History</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Documents uploaded for review</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">March 15, 2024 at 2:30 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Initial KYC application submitted</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">March 14, 2024 at 10:15 AM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSaveBankDetails}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Save Bank Details
        </button>
      </div>
    </div>
  );
};

export default KYCVerification;