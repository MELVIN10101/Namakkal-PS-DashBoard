import React, { useEffect, useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Modal } from '../components/UI/Modal';
import { ToggleSwitch } from '../components/UI/ToggleSwitch';
import { User as UserIcon, UserPlus, Loader2, Search, RefreshCcw, Edit, Trash2, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { User, PageProps } from '../types';
import authService from '../services/auth';
import { useAuth } from '../hooks/useAuth';

const UserListPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user: currentUser } = useAuth();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState<User | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string>('');
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string>('');
  const [deleteSuccess, setDeleteSuccess] = useState<string>('');
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.getallusers();
      // console.log('Users API response:', response);

      // Make sure the response is an array before setting it
      if (Array.isArray(response)) {
        setUsers(response);
      } else if (response && typeof response === 'object') {
        // If the response is an object with data property or similar structure
        const userData = response.users || response.data || response.results || [];
        setUsers(Array.isArray(userData) ? userData : []);
      } else {
        // Fallback to empty array if response format is unexpected
        setUsers([]);
        console.error('Unexpected response format for users:', response);
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  // Ensure users is always an array before filtering
  const safeUsers = Array.isArray(users) ? users : [];

  const filteredUsers = searchTerm.trim() === ''
    ? safeUsers
    : safeUsers.filter(user =>
      (user.user_name && user.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||

      (user.user_role && user.user_role.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  const handleRefresh = () => {
    fetchUsers();
  };
  
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditFormData(user);
    setEditError('');
    setEditSuccess(false);
  };
  
  const handleEditFormChange = (field: keyof User, value: string) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [field]: value,
      });
    }
  };
  const [editPassword, setEditPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleUpdateUser = async () => {
    if (!editFormData || !editingUser || !editingUser.id) return;
    
    // Validate password if provided
    if (editPassword && editPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    
    setEditLoading(true);
    setEditError('');
    setPasswordError(null);
    
    try {
      // Create update object
      const updateData: any = {
        id: editingUser.id,
        user_name: editFormData.user_name,
        user_role: editFormData.user_role,
        case_entry: editFormData.case_entry,
        case_view: editFormData.case_view,
        analytics: editFormData.analytics,
        chat: editFormData.chat,
        updated_by: currentUser?.user_name|| '' // Add the current user as the updater
      };
      
      // Only include password if it was provided
      if (editPassword) {
        updateData.password = editPassword;
      }
      
      await authService.upadteuser(updateData);
      
      // Update the user in the local state (without password)
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? { ...user, ...editFormData } : user
      ));
      
      setEditSuccess(true);
      setEditPassword(''); // Clear password field
      setTimeout(() => {
        setEditingUser(null);
        setEditFormData(null);
        setEditSuccess(false);
      }, 1500);
      
    } catch (err: any) {
      console.error('Error updating user:', err);
      setEditError('Failed to update user. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setDeleteLoading(id);
      setDeleteError('');
      
      try {
        await authService.deleteuser(id);
        
        // Remove from local state
        setUsers(prev => prev.filter(user => user.id !== id));
        
        // Show success message
        setDeleteSuccess(`User with ID ${id} deleted successfully!`);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess('');
        }, 3000);
        
      } catch (err: any) {
        console.error('Error deleting user:', err);
        setDeleteError(`Failed to delete user with ID ${id}. Please try again.`);
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          setDeleteError('');
        }, 5000);
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage user accounts</p>
        </div>        <div className="mt-4 sm:mt-0 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCcw}
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>          <Button
            variant="primary"
            size="sm"
            icon={UserPlus}
            onClick={() => onNavigate && onNavigate('register')}
          >
            New User
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email or role..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-300">Loading users...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500 dark:text-red-400">
            <p>{error}</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {searchTerm ? 'No users match your search criteria.' : 'No users found in the system.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Access
                  </th>                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead><tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user, index) => (
                  <tr key={user.id || index} className={currentUser?.id === user.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.user_name || 'Unknown'} {currentUser?.id === user.id && '(You)'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {user.id || index}
                          </div>
                        </div>
                      </div>
                    </td>                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.user_role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                        {user.user_role || 'user'}
                      </span>
                    </td>                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.case_entry === "1" && (
                          <span className="px-1 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded">
                            Case Entry
                          </span>
                        )}
                        {user.case_view === "1" && (
                          <span className="px-1 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                            Case View
                          </span>
                        )}
                        {user.analytics === "1" && (
                          <span className="px-1 py-0.5 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded">
                            Analytics
                          </span>
                        )}
                        {user.chat === "1" && (
                          <span className="px-1 py-0.5 text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded">
                            Chat
                          </span>
                        )}
                        {user.case_entry === "0" && 
                          user.case_view === "0" && 
                          user.analytics === "0" && 
                          user.chat === "0" && (
                          <span className="px-1 py-0.5 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded">
                            No Access
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          icon={Edit}
                          onClick={() => handleEdit(user)}
                          disabled={currentUser?.id === user.id}
                        />
                        <Button
                          size="sm"
                          variant="danger"
                          icon={Trash2}
                          onClick={() => handleDelete(user.id || '')}
                          disabled={deleteLoading === user.id || currentUser?.id === user.id || !user.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}      </Card>
      
      {/* Success Messages */}
      {deleteSuccess && (
        <Card className="mt-4">
          <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300">{deleteSuccess}</span>
          </div>
        </Card>
      )}
      
      {/* Error Messages */}
      {deleteError && (
        <Card className="mt-4">
          <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300">{deleteError}</span>
          </div>
        </Card>
      )}
      
      {/* Edit Modal */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => {
          setEditingUser(null);
          setEditFormData(null);
          setEditError('');
          setEditSuccess(false);
        }}
        title="Edit User"
        size="lg"
      >
        {editingUser && editFormData && (
          <div className="space-y-6">
            {/* Success Message */}
            {editSuccess && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300">User updated successfully!</span>
              </div>
            )}

            {/* Error Message */}
            {editError && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300">{editError}</span>
              </div>
            )}            {/* Edit Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={editFormData.user_name || ''}
                  onChange={(e) => handleEditFormChange('user_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  User Role
                </label>
                <select
                  value={editFormData.user_role}
                  onChange={(e) => handleEditFormChange('user_role', e.target.value as 'admin' | 'user')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password (Leave blank to keep current)
                </label>
                <input
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  placeholder="Enter new password or leave blank"
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordError}</p>
                )}
              </div>
            </div>
              {/* Permissions Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">User Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ToggleSwitch
                  id="editCaseEntry"
                  checked={editFormData.case_entry === "1"}
                  onChange={(checked) => handleEditFormChange('case_entry', checked ? "1" : "0")}
                  label="Case Entry Access"
                />
                
                <ToggleSwitch
                  id="editCaseView"
                  checked={editFormData.case_view === "1"}
                  onChange={(checked) => handleEditFormChange('case_view', checked ? "1" : "0")}
                  label="Case View Access"
                />
                
                <ToggleSwitch
                  id="editAnalytics"
                  checked={editFormData.analytics === "1"}
                  onChange={(checked) => handleEditFormChange('analytics', checked ? "1" : "0")}
                  label="Analytics Access"
                />
                
                <ToggleSwitch
                  id="editChat"
                  checked={editFormData.chat === "1"}
                  onChange={(checked) => handleEditFormChange('chat', checked ? "1" : "0")}
                  label="Chat Access"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingUser(null);
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
                onClick={handleUpdateUser}
                disabled={editLoading}
              >
                {editLoading ? 'Updating...' : 'Update User'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserListPage;
