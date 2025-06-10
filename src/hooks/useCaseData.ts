import { useState, useEffect } from 'react';
import type { CaseData, FilterOptions } from '../types';
import { generateMockData } from '../data/mockData';

export const useCaseData = () => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCases(generateMockData(100));
      setLoading(false);
    }, 1000);
  }, []);

  const addCase = (caseData: Omit<CaseData, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCase: CaseData = {
      ...caseData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCases(prev => [newCase, ...prev]);
    return newCase;
  };

  const updateCase = (id: string, updates: Partial<CaseData>) => {
    setCases(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
    ));
  };

  const deleteCase = (id: string) => {
    setCases(prev => prev.filter(c => c.id !== id));
  };

  const filteredCases = cases.filter(caseItem => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const caseValue = caseItem[key as keyof CaseData];
      return String(caseValue).toLowerCase().includes(String(value).toLowerCase());
    });
  });

  return {
    cases: filteredCases,
    allCases: cases,
    loading,
    filters,
    setFilters,
    addCase,
    updateCase,
    deleteCase,
  };
};