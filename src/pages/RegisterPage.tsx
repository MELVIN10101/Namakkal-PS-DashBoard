import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { ToggleSwitch } from '../components/UI/ToggleSwitch';
import { UserPlus, AlertCircle, Check } from 'lucide-react';
import authService from '../services/auth';
import { PageProps } from '../types';

const RegisterPage: React.FC<PageProps> = ({ onNavigate }) => {  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user'); 
   const [caseEntry, setCaseEntry] = useState("0");
  const [caseView, setCaseView] = useState("0");
  const [analytics, setAnalytics] = useState("0");
  const [chat, setChat] = useState("0");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Simple validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsRegistering(true);    try {      await authService.register({
        user_name: username,
        password: password,
        user_role: role,
        case_entry: caseEntry,
        case_view: caseView,
        analytics: analytics,
        chat: chat
      });
      // Registration successful      setSuccess('User registered successfully');
      // Reset form
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setRole('user');
      setCaseEntry("0");
      setCaseView("0");
      setAnalytics("0");
      setChat("0");
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to register user. Please try again.';
      setError(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="p-6">      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Register New User</h1>
          <p className="text-gray-500 dark:text-gray-400">Create a new user account</p>
        </div>
        <div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate && onNavigate('user-list')}
          >
            Back to Users
          </Button>
        </div>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex">
                <Check className="w-5 h-5 text-green-600 dark:text-green-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username *
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                placeholder="Enter username"
              />
            </div>

            

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password *
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                placeholder="Enter password (min. 6 characters)"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                placeholder="Confirm password"
              />
            </div>            <div className="space-y-1">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                User Role *
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>          {/* Access Permissions */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">User Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ToggleSwitch
                  id="caseEntry"
                  checked={caseEntry === "1"}
                  onChange={(checked) => setCaseEntry(checked ? "1" : "0")}
                  label="Case Entry Access"
                />
                
                <ToggleSwitch
                  id="caseView"
                  checked={caseView === "1"}
                  onChange={(checked) => setCaseView(checked ? "1" : "0")}
                  label="Case View Access"
                />
                
                <ToggleSwitch
                  id="analytics"
                  checked={analytics === "1"}
                  onChange={(checked) => setAnalytics(checked ? "1" : "0")}
                  label="Analytics Access"
                />
                
                <ToggleSwitch
                  id="chat"
                  checked={chat === "1"}
                  onChange={(checked) => setChat(checked ? "1" : "0")}
                  label="Chat Access"
                />
              </div>
            </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={UserPlus}
              disabled={isRegistering}
              className="w-full sm:w-auto"
            >
              {isRegistering ? 'Registering...' : 'Register User'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
