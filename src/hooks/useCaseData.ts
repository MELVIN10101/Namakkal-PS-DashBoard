import { useState, useEffect } from 'react';
import type { CaseData, FilterOptions } from '../types';
// import { generateMockData } from '../data/mockData'; // Comment out or remove mock data import
import caseApi from '../services/caseApi'; // Import the API service

export const useCaseData = () => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await caseApi.getAllcase();
        // Ensure the response is an array, default to empty array if not
        const dataToSet = Array.isArray(response) ? response : (response?.data && Array.isArray(response.data)) ? response.data : [];
        setCases(dataToSet);
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError('Failed to fetch case data. Please try again later.');
        setCases([]); // Set cases to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const addCase = async (caseData: Omit<CaseData, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      const newCase = await caseApi.insertCase(caseData as any); // Type assertion might be needed based on API response
      setCases(prev => [newCase, ...prev]);
      setLoading(false);
      return newCase;
    } catch (err) {
      console.error("Error adding case:", err);
      setError('Failed to add case.');
      setLoading(false);
      throw err; // Re-throw to allow component to handle
    }
  };

  const updateCase = async (id: string, updates: Partial<CaseData>) => {
    try {
      setLoading(true);
      const updatedCase = await caseApi.updateCase(id, updates as any); // Type assertion might be needed
      setCases(prev => prev.map(c => 
        c.id === id ? { ...c, ...updatedCase, updatedAt: new Date() } : c
      ));
      setLoading(false);
      return updatedCase;
    } catch (err) {
      console.error("Error updating case:", err);
      setError('Failed to update case.');
      setLoading(false);
      throw err;
    }
  };

  const deleteCase = async (id: string) => {
    try {
      setLoading(true);
      await caseApi.deleteCase(id);
      setCases(prev => prev.filter(c => c.id !== id));
      setLoading(false);
    } catch (err) {
      console.error("Error deleting case:", err);
      setError('Failed to delete case.');
      setLoading(false);
      throw err;
    }
  };

  const filteredCases = cases.filter(caseItem => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      // Ensure caseItem has the key and it's not null/undefined before calling toLowerCase
      const caseValue = caseItem[key as keyof CaseData];
      if (caseValue === null || typeof caseValue === 'undefined') {
        return !value; // If caseValue is null/undefined, it matches if the filter value is also empty
      }
      return String(caseValue).toLowerCase().includes(String(value).toLowerCase());
    });
  });

  return {
    cases: filteredCases,
    allCases: cases, // This now represents all fetched cases before client-side filtering
    loading,
    error, // Expose error state
    filters,
    setFilters,
    addCase,
    updateCase,
    deleteCase,
  };
};