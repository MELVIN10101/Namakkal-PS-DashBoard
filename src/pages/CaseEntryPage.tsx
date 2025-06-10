import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { CaseForm } from '../components/Forms/CaseForm';
import { useCaseData } from '../hooks/useCaseData';
import { Search, Plus, CheckCircle } from 'lucide-react';
// import { Button } from '../components/UI/Button';

export const CaseEntryPage: React.FC = () => {
  const { addCase, allCases } = useCaseData();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (caseData: any) => {
    addCase(caseData);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };



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
      </div>      <div className="flex justify-center">
        {/* Form Section */}
        <div className="w-full max-w-4xl">
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