import React, { useEffect, useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { User as UserIcon, UserPlus, Loader2, Search, RefreshCcw } from 'lucide-react';
import { User, PageProps } from '../types';
import authService from '../services/auth';
import { useAuth } from '../hooks/useAuth';

const UserListPage: React.FC<PageProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user: currentUser } = useAuth();
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.getallusers();
      console.log('Users API response:', response);

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
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Username
                  </th>

                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>           <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
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
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.user_role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                        {user.user_role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserListPage;
