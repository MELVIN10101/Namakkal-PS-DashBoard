import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { useAuth } from '../hooks/useAuth';
import { LogIn, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess = () => {} }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      // Simple login process
      const loginSuccess = await login(username, password);
      
      if (loginSuccess) {
        // console.log("Login successful, redirecting...");
        onLoginSuccess();
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
    //   console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Namakkal PS Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Login to access the crime management system</p>
        </div>

        <Card className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 mr-2 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                placeholder="Enter password"
              />
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoggingIn}
                className="w-full"
                icon={LogIn}
              >
                {isLoggingIn ? 'Loging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center opacity-75">
            <div className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-2"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Police Department</p>
            <div className="w-10 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
