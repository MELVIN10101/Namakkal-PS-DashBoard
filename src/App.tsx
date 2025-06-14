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
import { AccessDenied } from './components/UI/AccessDenied';
import { AuthProvider, useAuth } from './hooks/useAuth';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [redirecting, setRedirecting] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Check if user has access to a specific page
  const hasPageAccess = (page: string): boolean => {
    // If no user, return false (should not happen - authentication guard protects this)
    if (!user) return false;
    
    // Admin has access to all pages
    if (user.user_role === 'admin') return true;
    
    // All users have access to Home page
    if (page === 'home') return true;
    
    // Check specific page permissions
    switch (page) {
      case 'case-entry': return user.case_entry === "1";
      case 'case-view': return user.case_view === "1";
      case 'analytics': return user.analytics === "1";
      case 'chat': return user.chat === "1";
      // Admin only pages
      case 'register':
      case 'user-list':
        return false; // Regular users don't have access
      default: return false;
    }
  };
  
  // Permission-based page navigation
  const navigateTo = (page: string) => {
    if (hasPageAccess(page)) {
      setCurrentPage(page);
    } else {
      console.warn('Access denied to page:', page);
      // Stay on current page or redirect to home
      if (!hasPageAccess(currentPage)) {
        setCurrentPage('home');
      }
    }
  };
    // Handle successful authentication and verify page permissions
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // When the user logs in or refreshes, verify they can access current page
      if (!hasPageAccess(currentPage)) {
        setCurrentPage('home');
      }
    }
  }, [isAuthenticated, isLoading, user]);
  
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
    const pageProps = { onNavigate: navigateTo };
      // Check if user has access to current page
    if (!hasPageAccess(currentPage) && currentPage !== 'home') {
      return <AccessDenied 
        onBackHome={() => navigateTo('home')} 
        pageTitle={currentPage.replace('-', ' ')}
      />;
    }
    
    switch (currentPage) {
      case 'home':
        return <HomePage {...pageProps} />;
      case 'case-entry':
        return <CaseEntryPage {...pageProps} />;
      case 'case-view':
        return <CaseViewPage {...pageProps} />;
      case 'analytics':
        return <AnalyticsPage {...pageProps} />;
      case 'chat':
        return <ChatPage {...pageProps} />;
      case 'register':
        return <RegisterPage {...pageProps} />;
      case 'user-list':
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
    <Layout currentPage={currentPage} onPageChange={navigateTo}>
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