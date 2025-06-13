import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { CheckCircle, AlertCircle, Save, X } from 'lucide-react';
import { Button } from '../components/UI/Button';
import caseApi from '../services/caseApi';
import { PageProps } from '../types';

const CRIME_TYPES = [
  'Theft', 'Assault', 'Fraud', 'Robbery', 'Vandalism', 
  'Drug Possession', 'Domestic Violence', 'Burglary', 'Murder', 'Kidnapping'
];

const YEARS = Array.from({ length: 6 }, (_, i) => 2000 + i);
const GENDERS = ['Male', 'Female', 'Others'];

export const CaseEntryPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    district: '',
    Police_Station: '',
    CR_NO: '',
    Section_of_law: '',
    Crime_type: '',
    Year: new Date().getFullYear(),
    Accused_Name: '',
    Accused_Nick_Name: '',
    Accused_Gender: 'Male',
    Guardian: '',
    Accused_Age: '',
    Accused_Address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Year' || name === 'Accused_Age' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowErrorMessage(false);
    setErrorMessage('');

    try {
      // Send data to backend API
      const response = await caseApi.insertCase(formData);
      console.log('Case created successfully:', response);
      
      // Reset form
      setFormData({
        district: '',
        Police_Station: '',
        CR_NO: '',
        Section_of_law: '',
        Crime_type: '',
        Year: new Date().getFullYear(),
        Accused_Name: '',
        Accused_Nick_Name: '',
        Accused_Gender: 'Male',
        Guardian: '',
        Accused_Age: '',
        Accused_Address: '',
      });
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
    } catch (error) {
      console.error('Error creating case:', error);
      setErrorMessage('Failed to create case. Please try again.');
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 5000);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Case Entry</h1>
        <div className="flex space-x-3">
          {showSuccessMessage && (
            <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span>Case added successfully!</span>
            </div>
          )}
          {showErrorMessage && (
            <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>      
      <div className="flex justify-center">
        {/* Form Section */}
        <div className="w-full max-w-4xl">
          <Card title="Add New Case" subtitle="Enter case details">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Police Station
                  </label>
                  <input
                    type="text"
                    name="Police_Station"
                    value={formData.Police_Station}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    CR Number
                  </label>
                  <input
                    type="text"
                    name="CR_NO"
                    value={formData.CR_NO}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section of Law
                  </label>
                  <input
                    type="text"
                    name="Section_of_law"
                    value={formData.Section_of_law}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Crime Type
                  </label>
                  <select
                    name="Crime_type"
                    value={formData.Crime_type}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Crime Type</option>
                    {CRIME_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year
                  </label>
                  <select
                    name="Year"
                    value={formData.Year}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {YEARS.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Accused Name
                  </label>
                  <input
                    type="text"
                    name="Accused_Name"
                    value={formData.Accused_Name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nick Name
                  </label>
                  <input
                    type="text"
                    name="Accused_Nick_Name"
                    value={formData.Accused_Nick_Name}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    name="Accused_Gender"
                    value={formData.Accused_Gender}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {GENDERS.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Guardian
                  </label>
                  <input
                    type="text"
                    name="Guardian"
                    value={formData.Guardian}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="Accused_Age"
                    value={formData.Accused_Age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  name="Accused_Address"
                  value={formData.Accused_Address}
                  onChange={handleChange}
                  rows={3}
                  required
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="submit" icon={Save} disabled={loading}>
                  {loading ? "Adding Case..." : "Add Case"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};