import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { CaseForm } from '../components/Forms/CaseForm';
import { useCaseData } from '../hooks/useCaseData';
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

export const CaseViewPage: React.FC = () => {
  const { cases, allCases, filters, setFilters, updateCase, deleteCase } = useCaseData();
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [editingCase, setEditingCase] = useState<CaseData | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleView = (case_: CaseData) => {
    setSelectedCase(case_);
  };

  const handleEdit = (case_: CaseData) => {
    setEditingCase(case_);
  };

  const handleUpdate = (updatedData: any) => {
    if (editingCase) {
      updateCase(editingCase.id, updatedData);
      setEditingCase(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this case?')) {
      deleteCase(id);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const filteredCases = cases.filter(case_ =>
    !searchTerm || Object.values(case_).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const uniqueValues = (key: keyof CaseData) => {
    return [...new Set(allCases.map(case_ => case_[key]))].filter(Boolean);
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
                value={filters.district || ''}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">All Districts</option>
                {uniqueValues('district').map(district => (
                  <option key={district} value={String(district)}>{String(district)}</option>
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
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.district}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Accused_Gender}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Accused_Age}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Eye}
                        onClick={() => handleView(case_)}
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Edit}
                        onClick={() => handleEdit(case_)}
                      />
                      <Button
                        size="sm"
                        variant="danger"
                        icon={Trash2}
                        onClick={() => handleDelete(case_.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No cases found</p>
            </div>
          )}
        </div>
      </Card>

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
                <p className="text-gray-900 dark:text-white">{selectedCase.district}</p>
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
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingCase}
        onClose={() => setEditingCase(null)}
        title="Edit Case"
        size="xl"
      >
        {editingCase && (
          <CaseForm
            initialData={editingCase}
            onSubmit={handleUpdate}
            onCancel={() => setEditingCase(null)}
            submitLabel="Update Case"
          />
        )}
      </Modal>
    </div>
  );
};