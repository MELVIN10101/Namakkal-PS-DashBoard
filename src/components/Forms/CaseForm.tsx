import React, { useState } from 'react';
import type { CaseData } from '../../types';
import { Button } from '../UI/Button';
import { Save, X } from 'lucide-react';

interface CaseFormProps {
  initialData?: Partial<CaseData>;
  onSubmit: (data: Omit<CaseData, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const CRIME_TYPES = [
  'Theft', 'Assault', 'Fraud', 'Robbery', 'Vandalism', 
  'Drug Possession', 'Domestic Violence', 'Burglary', 'Murder', 'Kidnapping'
];

const YEARS = Array.from({ length: 6 }, (_, i) => 2020 + i);
const GENDERS: CaseData['Accused_Gender'][] = ['Male', 'Female', 'Others'];

export const CaseForm: React.FC<CaseFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  submitLabel = 'Save Case'
}) => {
  const [formData, setFormData] = useState({
    district: initialData?.district || '',
    Police_Station: initialData?.Police_Station || '',
    CR_NO: initialData?.CR_NO || '',
    Section_of_law: initialData?.Section_of_law || '',
    Crime_type: initialData?.Crime_type || '',
    Year: initialData?.Year || new Date().getFullYear(),
    Accused_Name: initialData?.Accused_Name || '',
    Accused_Nick_Name: initialData?.Accused_Nick_Name || '',
    Accused_Gender: initialData?.Accused_Gender || 'Male' as const,
    Guardian: initialData?.Guardian || '',
    Accused_Age: initialData?.Accused_Age || 18,
    Accused_Address: initialData?.Accused_Address || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Year' || name === 'Accused_Age' ? parseInt(value) : value,
    }));
  };

  return (
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
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} icon={X}>
            Cancel
          </Button>
        )}
        <Button type="submit" icon={Save}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};