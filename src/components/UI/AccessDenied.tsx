import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface AccessDeniedProps {
  onBackHome: () => void;
  pageTitle?: string;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ 
  onBackHome,
  pageTitle = 'this page'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 flex items-center justify-center rounded-full mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
        You don't have permission to access {pageTitle}. Please contact your administrator
        if you believe you should have access.
      </p>
      <Button variant="primary" onClick={onBackHome}>
        Back to Home
      </Button>
    </div>
  );
};
