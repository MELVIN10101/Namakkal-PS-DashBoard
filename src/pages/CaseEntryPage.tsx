import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { CaseForm } from '../components/Forms/CaseForm';
import { useCaseData } from '../hooks/useCaseData';
import { Search, Plus, CheckCircle } from 'lucide-react';
import { Button } from '../components/UI/Button';

export const CaseEntryPage: React.FC = () => {
  const { addCase, allCases } = useCaseData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (caseData: any) => {
    addCase(caseData);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const filteredCases = allCases.filter(case_ =>
    Object.values(case_).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).slice(0, 10); // Show only first 10 results

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Case Entry</h1>
        {showSuccessMessage && (
          <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <span>Case added successfully!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search Section */}
        <div className="lg:col-span-1">
          <Card title="Search Cases" subtitle="Search existing cases">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {searchTerm && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredCases.length > 0 ? (
                    filteredCases.map((case_) => (
                      <div
                        key={case_.id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {case_.Accused_Name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {case_.Crime_type} • {case_.Year}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          CR: {case_.CR_NO}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                      No cases found
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card title="Add New Case" subtitle="Enter case details">
            <CaseForm 
              onSubmit={handleSubmit}
              submitLabel="Add Case"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};