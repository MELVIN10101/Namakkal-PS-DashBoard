import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { exportToPDF, exportToExcel } from '../utils/export';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  FileText,
  Filter,
  Search,
  X
} from 'lucide-react';
import type { CaseData } from '../types';
import caseApi from '../services/caseApi';

export const CaseViewPage: React.FC = () => {
  const [allCases, setAllCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [editingCase, setEditingCase] = useState<CaseData | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');  const [filters, setFilters] = useState<Record<string, string | undefined>>({});

  // Fetch cases from API
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const response = await caseApi.getAllcase();
        console.log('Fetched cases:', response);
        
        // Handle different response formats
        const casesData = response.data || response || [];
        setAllCases(Array.isArray(casesData) ? casesData : []);
        setError('');
      } catch (error) {
        console.error('Error fetching cases:', error);
        setError('Failed to fetch cases. Please try again.');
        setAllCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleView = (case_: CaseData) => {
    setSelectedCase(case_);
  };

  const handleEdit = (case_: CaseData) => {
    setEditingCase(case_);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this case?')) {
      try {
        // For now, just remove from local state
        // In future, implement API call for delete
        setAllCases(prev => prev.filter(case_ => case_.id !== id));
        console.log('Case deleted:', id);
      } catch (error) {
        console.error('Error deleting case:', error);
      }
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: Record<string, string | undefined>) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  // Filter cases based on search term and filters
  const filteredCases = allCases.filter((case_: CaseData) => {
    // Search filter
    const matchesSearch = !searchTerm || Object.values(case_).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Other filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const caseValue = case_[key as keyof CaseData];
      return String(caseValue).toLowerCase().includes(String(value).toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  const uniqueValues = (key: keyof CaseData) => {
    return [...new Set(allCases.map((case_: CaseData) => case_[key]))].filter(Boolean);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Case View</h1>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            icon={Filter}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          <Button
            variant="secondary"
            icon={FileText}
            onClick={() => exportToPDF(filteredCases)}
          >
            Export PDF
          </Button>
          <Button
            variant="secondary"
            icon={Download}
            onClick={() => exportToExcel(filteredCases)}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Loading cases...</p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card>
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400">{error}</p>
          </div>
        </Card>
      )}

      {/* Content - only show when not loading */}
      {!loading && (
        <>
          {/* Search Bar */}
          <Card>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </Card>

      {/* Filters */}
      {showFilters && (
        <Card title="Filters">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                District
              </label>
              <select
                value={filters.District || ''}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">All Districts</option>
                {uniqueValues('district').map(district => (
                  <option key={District} value={String(district)}>{String(district)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Crime Type
              </label>
              <select
                value={filters.Crime_type || ''}
                onChange={(e) => handleFilterChange('Crime_type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">All Crime Types</option>
                {uniqueValues('Crime_type').map(type => (
                  <option key={type} value={String(type)}>{String(type)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <select
                value={filters.Year || ''}
                onChange={(e) => handleFilterChange('Year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">All Years</option>
                {uniqueValues('Year').map(year => (
                  <option key={year} value={String(year)}>{String(year)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <select
                value={filters.Accused_Gender || ''}
                onChange={(e) => handleFilterChange('Accused_Gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">All Genders</option>
                {uniqueValues('Accused_Gender').map(gender => (
                  <option key={gender} value={String(gender)}>{String(gender)}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button variant="secondary" onClick={clearFilters} icon={X} className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Cases Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">CR No</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Accused Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Crime Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Year</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">District</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Gender</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Age</th>
                <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((case_, index) => (
                <tr key={case_.id} className={`border-b border-gray-100 dark:border-gray-800 ${index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''}`}>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{case_.CR_NO}</td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{case_.Accused_Name}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Crime_type}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Year}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.District}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Accused_Gender}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Accused_Age}</td>
                  <td className="py-3 px-4">                    <div className="flex justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Eye}
                        onClick={() => handleView(case_)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Edit}
                        onClick={() => handleEdit(case_)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        icon={Trash2}
                        onClick={() => handleDelete(case_.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>          {filteredCases.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No cases found</p>
            </div>
          )}
        </div>
      </Card>
        </>
      )}

      {/* View Modal */}
      <Modal
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        title="Case Details"
        size="lg"
      >
        {selectedCase && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">District</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.District}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Police Station</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Police_Station}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">CR Number</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.CR_NO}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Section of Law</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Section_of_law}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Crime Type</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Crime_type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Year</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Year}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Accused Name</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Accused_Name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Nick Name</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Accused_Nick_Name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Accused_Gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Age</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Accused_Age}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Guardian</label>
                <p className="text-gray-900 dark:text-white">{selectedCase.Guardian}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Address</label>
              <p className="text-gray-900 dark:text-white">{selectedCase.Accused_Address}</p>
            </div>
          </div>
        )}
      </Modal>      {/* Edit Modal */}
      <Modal
        isOpen={!!editingCase}
        onClose={() => setEditingCase(null)}
        title="Edit Case"
        size="xl"
      >
        {editingCase && (
          <div className="p-4">
            <p className="text-gray-600 dark:text-gray-400">
              Edit functionality is not available. Please use the Case Entry page to add new cases.
            </p>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setEditingCase(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};