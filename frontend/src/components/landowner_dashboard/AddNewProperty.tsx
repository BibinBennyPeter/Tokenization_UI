import React, { useState } from 'react';

const AddNewProperty: React.FC = () => {
  const [formData, setFormData] = useState({
    propertyName: '',
    location: '',
    area: '',
    landType: '',
    marketValue: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted property data:', formData);
    alert('Submitted to Admin for verification!');
  };

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        {/* Property Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Property Name</label>
            <input
              name="propertyName"
              type="text"
              value={formData.propertyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Location (GPS + Address)</label>
            <textarea
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Area (in sq. meters)</label>
            <input
              name="area"
              type="number"
              value={formData.area}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Land Type</label>
            <input
              name="landType"
              type="text"
              value={formData.landType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Market Value (AED)</label>
            <input
              name="marketValue"
              type="number"
              value={formData.marketValue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 text-gray-900 bg-white"
              required
            />
          </div>
        </div>

        {/* Upload Legal Documents */}
        <div>
          <label className="block font-semibold text-gray-900 mb-2">Upload Legal Documents</label>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700">Title Deed</label>
              <input type="file" className="w-full text-gray-900 bg-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Encumbrance Certificate</label>
              <input type="file" className="w-full text-gray-900 bg-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Government Approvals</label>
              <input type="file" className="w-full text-gray-900 bg-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Tax Receipts / Utility Bills</label>
              <input type="file" className="w-full text-gray-900 bg-white" />
            </div>
          </div>
        </div>

        {/* Ownership Proof */}
        <div>
          <label className="block font-semibold text-gray-900 mb-1">Upload Ownership Proof</label>
          <input type="file" className="w-full text-gray-900 bg-white" />
        </div>

        {/* Optional Media Upload */}
        <div>
          <label className="block font-semibold text-gray-900 mb-1">Upload Media (Optional)</label>
          <input type="file" accept="image/*,video/*" multiple className="w-full text-gray-900 bg-white" />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit to Admin for Verification
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProperty;
