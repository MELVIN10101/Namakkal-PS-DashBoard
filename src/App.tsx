import { useState, useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage';
import { CaseEntryPage } from './pages/CaseEntryPage';
import { CaseViewPage } from './pages/CaseViewPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ChatPage } from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserListPage from './pages/UserListPage';
import { AuthProvider, useAuth } from './hooks/useAuth';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [redirecting, setRedirecting] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  
  // Handle successful authentication
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setCurrentPage('home');
    }
  }, [isAuthenticated, isLoading]);
  const handleLoginSuccess = () => {
    console.log('Login success callback triggered');
    // Simple redirect - show loading state briefly then go to home
    setRedirecting(true);
    setCurrentPage('home');
    
    // Reset redirecting state after navigation
    setTimeout(() => {
      setRedirecting(false);
    }, 300);
  };  const renderPage = () => {
    // Create props with navigation function
    const pageProps = { onNavigate: setCurrentPage };
    
    switch (currentPage) {
      case 'home':
        return <HomePage {...pageProps} />;      case 'case-entry':
        return <CaseEntryPage {...pageProps} />;
      case 'case-view':
        return <CaseViewPage {...pageProps} />;
      case 'analytics':
        return <AnalyticsPage {...pageProps} />;
      case 'chat':
        return <ChatPage {...pageProps} />;
      case 'register':
        return <RegisterPage {...pageProps} />;      case 'user-list':
        return <UserListPage {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };
  // Show loading spinner while checking authentication or redirecting
  if (isLoading || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {redirecting ? 'Redirecting to dashboard...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }// Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Show main app if authenticated
  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;