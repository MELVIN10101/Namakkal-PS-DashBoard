import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { exportToPDF, exportToExcel } from '../utils/export';
import { PageProps } from '../types';
import {
  Eye,
  Edit,
  Trash2,
  Download,
  FileText,
  Filter,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import type { CaseData } from '../types';
import caseApi from '../services/caseApi';

export const CaseViewPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [allCases, setAllCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [editingCase, setEditingCase] = useState<CaseData | null>(null);
  const [editFormData, setEditFormData] = useState<CaseData | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string>('');
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string>('');
  const [deleteSuccess, setDeleteSuccess] = useState<string>('');  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); const [filters, setFilters] = useState<Record<string, string | undefined>>({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Fetch cases from API
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const response = await caseApi.getAllcase();
        // console.log('Fetched cases:', response);

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
  };  const handleEdit = (case_: CaseData) => {
    setEditingCase(case_);
    setEditFormData(case_);
    setEditError('');
    setEditSuccess(false);
  };  const handleEditFormChange = (field: keyof CaseData, value: string | number) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [field]: (field === 'Year' || field === 'Accused_Age') ? 
          (typeof value === 'string' ? parseInt(value) || 0 : value) : 
          value
      });
    }
  };
  const handleUpdateCase = async () => {
    if (!editFormData || !editingCase) return;

    setEditLoading(true);
    setEditError('');
    
    try {
      await caseApi.updateCase(editingCase.id, {
        district: editFormData.District,
        Police_Station: editFormData.Police_Station,
        CR_NO: editFormData.CR_NO,
        Section_of_law: editFormData.Section_of_law,
        Crime_type: editFormData.Crime_type,
        Year: editFormData.Year,
        Accused_Name: editFormData.Accused_Name,
        Accused_Nick_Name: editFormData.Accused_Nick_Name,
        Accused_Gender: editFormData.Accused_Gender,
        Guardian: editFormData.Guardian,
        Accused_Age: typeof editFormData.Accused_Age === 'number' ? editFormData.Accused_Age.toString() : editFormData.Accused_Age,
        Accused_Address: editFormData.Accused_Address
      });

      // Update the case in the local state
      setAllCases(prev => prev.map(case_ => 
        case_.id === editingCase.id ? { ...case_, ...editFormData } : case_
      ));

      setEditSuccess(true);
      setTimeout(() => {
        setEditingCase(null);
        setEditFormData(null);
        setEditSuccess(false);
      }, 1500);

    } catch (error) {
      console.error('Error updating case:', error);
      setEditError('Failed to update case. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      setDeleteLoading(id);
      setDeleteError('');
      
      try {
        // Call the delete API
        await caseApi.deleteCase(id);
        
        // Remove from local state
        setAllCases(prev => prev.filter(case_ => case_.id !== id));
        
        // Show success message
        setDeleteSuccess(`Case with ID ${id} deleted successfully!`);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess('');
        }, 3000);
        
        console.log('Case deleted successfully:', id);
      } catch (error) {
        console.error('Error deleting case:', error);
        setDeleteError(`Failed to delete case with ID ${id}. Please try again.`);
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          setDeleteError('');
        }, 5000);
      } finally {
        setDeleteLoading(null);
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
    setCurrentPage(1); // Reset to first page when clearing filters
  };
  // Filter cases based on search term and filters
  const filteredCases = allCases.filter((case_: CaseData) => {
    // Search filter - only search in specific relevant fields, excluding ID
    const searchFields = [
      'Accused_Name',
      'Accused_Nick_Name', 
      'Crime_type',
      'district',
      'Police_Station',
      'Section_of_law',
      'Guardian',
      'Accused_Address',
      'CR_NO'
    ];
    
    const matchesSearch = !searchTerm || searchFields.some(field => {
      const value = case_[field as keyof CaseData];
      return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Other filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const caseValue = case_[key as keyof CaseData];
      return String(caseValue).toLowerCase().includes(String(value).toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          </Button>          <Button
            variant="secondary"
            icon={Download}
            onClick={() => {
              try {
                const success = exportToExcel(filteredCases);
                if (success) {
                  // Could add a toast notification here if the app has that functionality
                  console.log('Excel exported successfully');
                }
              } catch (error) {
                console.error('Failed to export Excel:', error);
                // Could show an error message to the user here
                alert('Failed to export to Excel. Please try again.');
              }
            }}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* Delete Success Message */}
      {deleteSuccess && (
        <Card>
          <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300">{deleteSuccess}</span>
          </div>
        </Card>
      )}

      {/* Delete Error Message */}
      {deleteError && (
        <Card>
          <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300">{deleteError}</span>
          </div>
        </Card>
      )}

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
                    <option value="">All Districts</option>                {uniqueValues('district').map(district => (
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
                </div>            <div>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Police Station
                  </label>
                  <select
                    value={filters.Police_Station || ''}
                    onChange={(e) => handleFilterChange('Police_Station', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="">All Police Stations</option>
                    {uniqueValues('Police_Station').map(station => (
                      <option key={station} value={String(station)}>{String(station)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Section of Law
                  </label>
                  <select
                    value={filters.Section_of_law || ''}
                    onChange={(e) => handleFilterChange('Section_of_law', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="">All Sections</option>
                    {uniqueValues('Section_of_law').map(section => (
                      <option key={section} value={String(section)}>{String(section)}</option>
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
                <thead>              <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">CR No</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Accused Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Crime Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Year</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">District</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Police Station</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Section of Law</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Gender</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Age</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
                </thead>                <tbody>
                  {paginatedCases.map((case_, index) => (<tr key={case_.id} className={`border-b border-gray-100 dark:border-gray-800 ${index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/50' : ''}`}>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{case_.CR_NO}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{case_.Accused_Name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Crime_type}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Year}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.District}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Police_Station}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Section_of_law}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Accused_Gender}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{case_.Accused_Age}</td>                    <td className="py-3 px-4">
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
                      />                      <Button
                        size="sm"
                        variant="danger"
                        icon={Trash2}
                        onClick={() => handleDelete(case_.id)}
                        disabled={deleteLoading === case_.id}
                      />
                    </div>
                    </td>
                  </tr>
                  ))}
                </tbody>              </table>
              
              {/* Pagination Info and Controls */}
              {filteredCases.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredCases.length)} of {filteredCases.length} results
                  </div>
                  
                  {totalPages > 1 && (
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={ChevronLeft}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            size="sm"
                            variant={currentPage === page ? "primary" : "secondary"}
                            onClick={() => handlePageChange(page)}
                            className="min-w-[2rem]"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={ChevronRight}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </div>
                  )}
                </div>
              )}

              {filteredCases.length === 0 && !loading && (
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
        onClose={() => {
          setEditingCase(null);
          setEditFormData(null);
          setEditError('');
          setEditSuccess(false);
        }}
        title="Edit Case"
        size="xl"
      >
        {editingCase && editFormData && (
          <div className="space-y-6">
            {/* Success Message */}
            {editSuccess && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">Case updated successfully!</span>
              </div>
            )}

            {/* Error Message */}
            {editError && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300">{editError}</span>
              </div>
            )}

            {/* Edit Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  District
                </label>
                <input
                  type="text"
                  value={editFormData.District || ''}
                  onChange={(e) => handleEditFormChange('District', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Police Station
                </label>
                <input
                  type="text"
                  value={editFormData.Police_Station || ''}
                  onChange={(e) => handleEditFormChange('Police_Station', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  CR Number
                </label>
                <input
                  type="text"
                  value={editFormData.CR_NO || ''}
                  onChange={(e) => handleEditFormChange('CR_NO', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Section of Law
                </label>
                <input
                  type="text"
                  value={editFormData.Section_of_law || ''}
                  onChange={(e) => handleEditFormChange('Section_of_law', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Crime Type
                </label>
                <select
                  value={editFormData.Crime_type || ''}
                  onChange={(e) => handleEditFormChange('Crime_type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Crime Type</option>
                  <option value="Theft">Theft</option>
                  <option value="Assault">Assault</option>
                  <option value="Fraud">Fraud</option>
                  <option value="Robbery">Robbery</option>
                  <option value="Vandalism">Vandalism</option>
                  <option value="Drug Possession">Drug Possession</option>
                  <option value="Domestic Violence">Domestic Violence</option>
                  <option value="Burglary">Burglary</option>
                  <option value="Murder">Murder</option>
                  <option value="Kidnapping">Kidnapping</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={editFormData.Year || ''}
                  onChange={(e) => handleEditFormChange('Year', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Accused Name
                </label>
                <input
                  type="text"
                  value={editFormData.Accused_Name || ''}
                  onChange={(e) => handleEditFormChange('Accused_Name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nick Name
                </label>
                <input
                  type="text"
                  value={editFormData.Accused_Nick_Name || ''}
                  onChange={(e) => handleEditFormChange('Accused_Nick_Name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  value={editFormData.Accused_Gender || ''}
                  onChange={(e) => handleEditFormChange('Accused_Gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={editFormData.Accused_Age || ''}
                  onChange={(e) => handleEditFormChange('Accused_Age', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Guardian
                </label>
                <input
                  type="text"
                  value={editFormData.Guardian || ''}
                  onChange={(e) => handleEditFormChange('Guardian', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <textarea
                rows={3}
                value={editFormData.Accused_Address || ''}
                onChange={(e) => handleEditFormChange('Accused_Address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingCase(null);
                  setEditFormData(null);
                  setEditError('');
                  setEditSuccess(false);
                }}
                disabled={editLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={Save}
                onClick={handleUpdateCase}
                disabled={editLoading}
              >
                {editLoading ? 'Updating...' : 'Update Case'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};